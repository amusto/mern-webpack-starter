//TODO: Return ALL models from models directory
/*let Article = require('./models/article');
let Post = require('./models/post');
let User = require('./models/user');*/


// TODO Convert to use router then module.export
const express = require('express'),
    path = require('path');

    module.exports = function(app, passport) {

    app.get('/api/', (req, res) => {
        res.send('api works');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    console.log(req.isAuthenticated());
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log('is authenticated', req.isAuthenticated());
    res.redirect('/');
}
