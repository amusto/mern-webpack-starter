// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var configAuth = require('./auth');

var User       = require('./models/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-register', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            console.log(req.body);
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                console.log(email);
                User.findOne({ 'local.username' :  username }, function(err, user) {
                    if (err) {
                        console.log('Error:', err);
                        return done(err);
                    }

                    if (user) {
                        console.log('User:', user);
                        return done(null, false, {
                            status: 'failure',
                            message: 'Username exists!'
                        });
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();
                        console.log(newUser);

                        // set the user's local credentials
                        newUser.local.username    = username;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                /*User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        console.log(err);
                        return done(err);
                    }

                    // check to see if theres already a user with that email
                    if (user) {
                        console.log('User:', user);
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        console.log('LN: 60');
                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });*/

            });

        }));

    // Login Authentication
    passport.use('local-authenticate', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log(req.body);
            // asynchronous
            // User.findOne wont fire unless data is sent back

            /* process.nextTick(function() {
                console.log(email);
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err) {
                        console.log('Error:', err);
                        return done(err);
                    }

                    if (user) {
                        console.log('User:', user);
                        return done(null, false, {
                            status: 'failure',
                            message: 'Users email exists!'
                        });
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();
                        console.log(newUser);

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            }); */

        }));


    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {
                // try to find the user based on their google id

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err) {
                        console.log('Error thrown');
                        return done(err);
                    }

                    if (user) {
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            });
        }));

};
