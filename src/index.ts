const { Command } = require('commander');
const { vs } = require('./constants');
const path = require('path');
const program = new Command();
program.version(vs).parse(process.argv);

interface ACTIONSMAP {
  [propName: string | symbol]: {
    alias: string;
    description: string;
    examples: string[];
  }
}
const mapActions: ACTIONSMAP = {
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'git-cmt config set <k><v>',
      'git-cmt config get <k>',
    ],
  },
  'help': {
    alias: 'h',
    description: 'command not found',
    examples: [
      'git-cmt help'
    ],
  },
};

const helpText = () => {
  console.log('###-----------命令示例--------------###');
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(item => {
      console.log(item);
    })
  });
  console.log('###-----------示例结束--------------###');
}

const args = process.argv.slice(2);

if (args.length > 0) {
  const keys: any[] = [];
  const realKeys: any[] = [];
  Reflect.ownKeys(mapActions).forEach(key => {
    realKeys.push(key);
    keys.push(key);
    if(mapActions[key]?.alias) {
      keys.push(mapActions[key].alias);
    }
  });
  if(!keys.includes(args[0])) {
    console.log('command not found');
    helpText();
    process.exit(1);
  }

  // 循环创建命令
  realKeys.forEach((action) => {
    program
      .command(action) // 配置命令的名字
      .alias(mapActions[action].alias) // 命令的别名
      .description(mapActions[action].description) // 命令对应的描述
      .action(() => {
        console.log(action);
        // 访问不到对应的命令 就打印找不到命令
        if (action === 'help') {
          helpText();
        } else {
          //git-cmt config xxx //获取参数数组 [node环境, git-cmt所在目录, create, xxx]
          require(path.resolve(__dirname, action))(...process.argv.slice(3));
        }
      });
  });
}else {
  require('./commit')();
}
