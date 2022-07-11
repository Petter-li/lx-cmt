const Inquirer = require('inquirer');
const config = require('./config');
const { types, messages, simple } = config;
interface resultsObject {
  type?: string;
  scope?: string;
  subject?: string;
}
module.exports = async () => {
  const results:resultsObject = {};
  const { type } = await Inquirer.prompt({
    name: 'type',
    type: 'list',
    message: messages.type,
    choices: types
  });
  results.type = type;
  if(!simple) {
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
  });
  results.subject = subject;
}