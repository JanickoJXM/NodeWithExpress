var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            //go to DB, check credentials
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.findOne({
                        username: username
                    },
                    function (error, results) {
                        if (results.password === password) {
                            var user = results;
                            done(null, user);
                        } else {
                            //done('Bad Password', null);
                            done(null, false, {
                                message: 'Bad Password'
                            });
                        }

                    });
            });
            /* var user = {
             username: username,
password: password
};
done(null, user);*/
        }));
};
