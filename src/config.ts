const cpath = require('path');
const fs = require('fs');

module.exports = async (action:string, key: string, value: string) => {
  if(action === 'set') {
    if(key === 'simple') {
      fs.readFile(cpath.resolve(__dirname, '../cg.json'), 'utf8', (err: any, data: string) => {
        if (err) throw err;
        const config = JSON.parse(data);
        config.simple = value === 'true';
        fs.writeFile(cpath.resolve(__dirname, '../cg.json'), JSON.stringify(config), 'utf8', (err: Error) => {
          if (err) throw err;
          console.log('config success!');
        });
      });
    }
  }else if(action === 'get') {
    fs.readFile(cpath.resolve(__dirname, '../cg.json'), 'utf8', (err: any, data: string) => {
      if (err) throw err;
      const config = JSON.parse(data);
      console.log(`${key}: ${config[key]}`)
    });
  }
}