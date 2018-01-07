const config          = require('config');
const db_config = {
    host: config.get('db.host'),
    port: config.get('db.port'),
    database_name: config.get('db.database_name'),
    user: config.get('db.user'),
    password: config.get('db.password')
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let heroku_mongodb_url = `mongodb://${db_config.user}:${db_config.password}@${db_config.host}:${db_config.port}/${db_config.database_name}`;
let dbConnectString = heroku_mongodb_url;

mongoose.connect(dbConnectString, {
    useMongoClient: true
    /* other options */
});
