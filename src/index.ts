const { Command } = require('commander');
const { vs } = require('./constants');
const path = require('path');
const program = new Command();

interface ACTIONSMAP {
  [propName: string | symbol]: {
    alias: string;
    description: string;
    examples: string[];
  }
}
const mapActions: ACTIONSMAP = {
  'config': {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'git-cmt config set simple false',
      'git-cmt config get simple',
    ],
  },
  'example': {
    alias: 'ex',
    description: 'show all example',
    examples: [
      'git-cmt example'
    ],
  },
  'pushc': {
    alias: 'phc',
    description: 'push to current branch',
    examples: [
      'git-pushc'
    ],
  },
  'pullc': {
    alias: 'plc',
    description: 'pull from current branch',
    examples: [
      'git-pullc'
    ],
  },
  'checkout': {
    alias: 'co',
    description: 'checkout branch by name',
    examples: [
      'git-checkout master'
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
  // const keys: any[] = [];
  const realKeys: any[] = [];
  Reflect.ownKeys(mapActions).forEach(key => {
    realKeys.push(key);
    /* keys.push(key);
    if (mapActions[key]?.alias) {
      keys.push(mapActions[key].alias);
    } */
  });

  /* if (!keys.includes(args[0])) {
    console.log('command not found');
    helpText();
    process.exit(1);
  } */

  // 循环创建命令
  realKeys.forEach((action) => {
    program
      .command(action) // 配置命令的名字
      .alias(mapActions[action].alias) // 命令的别名
      // .option(`${action}`, mapActions[action].description)
      .description(mapActions[action].description) // 命令对应的描述
      .action(() => {
        // 访问不到对应的命令 就打印找不到命令
        if (action === 'example') {
          helpText();
        } else if (action === 'checkout') {
          require(path.resolve(__dirname, action))(process.argv[3]);
        } else if (action === 'pushc') {
          require(path.resolve(__dirname, action))();
        } else if (action === 'pullc') {
          require(path.resolve(__dirname, action))();
        } else {
          //git-cmt config xxx //获取参数数组 [node环境, git-cmt所在目录, config, xxx]
          require(path.resolve(__dirname, action))(...process.argv.slice(3));
        }
      });
  }); 
  program.version(vs).parse(process.argv);
} else {
  require('./commit')();
}


