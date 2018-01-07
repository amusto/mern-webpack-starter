// server.js
const express   = require('express'),
    path            = require('path'),
    http            = require('http'),
    //fs              = require('fs'),
    config          = require('config'),
    //passport        = require('passport'),
    bodyParser      = require('body-parser');
    //flash           = require('connect-flash'),
    //morgan          = require('morgan'),
    //cookieParser    = require('cookie-parser'),
    //session         = require('express-session');

const app = express();

// db configuration
require('./config/database.js');
//require('./config/passport')(passport); // pass passport for configuration

//app.use(cookieParser()); // read cookies (needed for auth)

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session settings
/*app.use(session({
    secret: config.get('server.session_secret'),
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session*/

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

// Require API routes
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || config.get('server.port'), () => console.log(`Example app listening on port ${process.env.PORT || config.get('server.port')}`));
