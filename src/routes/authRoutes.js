var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');


var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            var user = req.body;
            console.log('/signUp1 ' + user);
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });


        });
    authRouter.route('/signIn')
        .post(
            passport.authenticate('local', { //google etc
                failureRedirect: '/'
            }),
            function (req, res) {
                res.redirect('/auth/profile');
            });
    authRouter.route('/profile')
        //none of the authRouter routes are available without authentication
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            //console.log(req.user);
            res.json(req.user);
        });
    return authRouter;

};

module.exports = router;
