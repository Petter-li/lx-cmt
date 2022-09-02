const Inquirer = require('inquirer');
const shell = require('shelljs');
const filesys = require('fs');
const cmtpath = require('path');
interface resultsObject {
  type?: string;
  scope?: string;
  subject?: string;
  body?: string;
  footer?: string;
}
module.exports = async () => {
  filesys.readFile(cmtpath.resolve(__dirname, '../cg.json'), 'utf8', async (err: any, data: string) => {
    if (err) throw err;
    const config = JSON.parse(data);
    const { types, messages, simple } = config;
    const results: resultsObject = {};
    const { type } = await Inquirer.prompt({
      name: 'type',
      type: 'list',
      message: messages.type,
      choices: types
    });
    results.type = type;
    if (!simple) {
      const { scope } = await Inquirer.prompt({
        name: 'scope',
        type: 'input',
        message: messages.scope,
      });
      results.scope = scope;
    }

    const { subject } = await Inquirer.prompt({
      name: 'subject',
      type: 'input',
      message: messages.subject,
      validate: function (val: string) {
        if (val) {
          return true;
        }
        return '请输入简短描述'
      }
    });
    results.subject = subject;

    if (!simple) {
      const { body } = await Inquirer.prompt({
        name: 'body',
        type: 'input',
        message: messages.body,
      });
      results.body = body;

      const { footer } = await Inquirer.prompt({
        name: 'footer',
        type: 'input',
        message: messages.footer,
      });
      results.footer = footer;
    }

    let str = `${results.type}${results.scope ? `(${results.scope})` : ''}：${results.subject}`;
    if (results.body) {
      str += `\n\n${results.body}`;
    }
    if (results.footer) {
      str += `\n\n${results.footer}`;
    }
    console.log('###--------------------------------------------------------###');
    console.log(str);
    console.log('###--------------------------------------------------------###');


    const { confirmCommit } = await Inquirer.prompt({
      name: 'confirmCommit',
      type: 'confirm',
      message: messages.confirmCommit,
    });


    if (confirmCommit) {
      if (shell.exec(`git commit -m ${str}`).code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
      }
    } else {
      return;
    }
  });

}