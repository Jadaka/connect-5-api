require('babel-register');
require('babel-polyfill');
var fs = require('fs');
var path = require('path');

/**
 *
 *  Schema Utilities:
 *  @param force {string} forcefully drops any existing tables and recreate the schema.
 *
 *  run this as a command line utility:
 *    node ./schema.js
 *    node ./schema.js force
 *
 */
try {
  var pathToDb = path.resolve('src/db.js');
  fs.accessSync(pathToDb, fs.F_OK);
} catch (e) {
  console.error('An error occured. error = ', e);
  console.error('Are you running this script from outside the project root?');
  process.exit();
}

/**
 * 
 *  Require sequelize instance and model definitions
 * 
 *  The ordering of the model definitions can be customized by re-ordering
 *  the export statements within src/models/index.js
 * 
 */
var sequelize = require('../src/db').default;
require('../src/models/');

var force = process.argv[2] === 'force';

if (force) {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Dropped tables and recreated tables from src/models/');
      process.exit();
    });
} else if (!force && process.argv.length === 2) {
  sequelize
    .sync()
    .then(() => {
       console.log("Created tables from src/models/");
       process.exit();
    });
} else {
  console.error('invalid number of arguments in schema.js. Exiting!');
  process.exit();
}
