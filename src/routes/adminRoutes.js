var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        'title': 'War and Peace',
        'genre': 'Historical Fiction',
        'author': 'Lev Nikolayevich Tolstoy',
        'bookId': 656,
        'read': false
		},
    {
        'title': 'Les Miserables',
        'genre': 'Historical Fiction',
        'author': 'Victor Hugo',
        'bookId': 24280,
        'read': false
		},
    {
        'title': 'The Time Machine',
        'genre': 'Science Fiction',
        'author': 'H. G. Wells',
        'bookId': 2493,
        'read': false
		},
    {
        'title': 'Book 2',
        'genre': 'Science Fiction',
        'author': 'The Author',
        'bookId': 33507,
        'read': false
		},
    {
        'title': 'Book 3',
        'genre': 'Novel',
        'author': 'The Author 2',
        'bookId': 27779,
        'read': true
		}
	];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {

            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    });
            });
            /*res.send('inserting books');*/
        });

    return adminRouter;
};

module.exports = router;
