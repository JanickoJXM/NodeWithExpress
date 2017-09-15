var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({
    explicityArray: false
});


var goodreadsService = function () {
    var getBookById = function (id, cb) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=RD77c3JjmAgToCtMaE9vFQ'
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                //console.log(str);
                parser.parseString(str, function (err, result) {
                    //console.log(result.GoodreadsResponse.book[0]);
                    console.log(result.GoodreadsResponse.book[0].title);
                    console.log(result.GoodreadsResponse.book[0].description);
                    console.log(result.GoodreadsResponse.book[0].image_url);

                    cb(null, result.GoodreadsResponse.book[0]);
                });
            });


        };

        http.request(options, callback).end();

    };
    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;
