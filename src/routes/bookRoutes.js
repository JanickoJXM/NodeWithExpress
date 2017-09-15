var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var router = function (nav) {

    /*var books = [
    		{
    			'title': 'War and Peace',
    			'genre': 'Historical Fiction',
    			'author': 'Lev Nikolayevich Tolstoy',
    			'read': false
    		},
    		{
    			'title': 'War and Peace',
    			'genre': 'Historical Fiction',
    			'author': 'Lev Nikolayevich Tolstoy'
    		},
    		{
    			'title': 'Book 2',
    			'genre': 'Science Fiction',
    			'author': 'The Author'
    		},
    		{
    			'title': 'Book 3',
    			'genre': 'Novel',
    			'author': 'The Author 2',
    			'read': true
    		}
    	];
    */
    var bookService = require('../services/goodreadsService')();
    var bookControler = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookControler.middleware);
    bookRouter.route('/')
        .get(bookControler.getIndex);

    bookRouter.route('/:id')
        .get(bookControler.getById);

    return bookRouter;

};

module.exports = router;
