const { Command } = require('commander');
const { vs } = require('./constants');
const program = new Command();
program.version(vs).parse(process.argv);


require('./create')();