'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var db        = {};
var sequelize;

if (process.env.MYSQL_URL) {
  // e.g. mysql://user:pass@host:25060/dbname?ssl-mode=REQUIRED
  var dbUrl   = new URL(process.env.MYSQL_URL);
  var sslMode = (dbUrl.searchParams.get('ssl-mode') || '').toUpperCase();
  sequelize = new Sequelize(
    decodeURIComponent(dbUrl.pathname.slice(1)),
    decodeURIComponent(dbUrl.username),
    decodeURIComponent(dbUrl.password),
    {
      host: dbUrl.hostname,
      port: Number(dbUrl.port) || 3306,
      dialect: 'mysql',
      dialectOptions: sslMode && sslMode !== 'DISABLED'
        ? { ssl: { ca: fs.readFileSync(path.join(__dirname, '..', 'certs', 'ca.pem')) } }
        : {}
    }
  );
} else {
  var config = require(__dirname + '/../config/config.json')[env];
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect
    }
  );
}

  

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
