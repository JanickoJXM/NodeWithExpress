var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

//instance of express
var app = express();

var port = process.env.PORT || 5000;

var nav = [{
    Link: '/Books',
    Text: 'Book'
						}, {
    Link: '/Authors',
    Text: 'Author'
		}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
//finds body if it's json - parses is
app.use(bodyParser.json());
//finds body if it's url encoded - parses is
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport')(app);

app.set('views', './src/views');

//app.set('view engine', 'jade');

//var handlbars = require('express-handlebars');
//app.engine('.hbs', handlbars({extname: 'hbs'}));
//app.set('view engine', '.hbs');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);



app.get('/', function (req, res) {
    //res.send('Hello World from root');
    res.render('index', {
        title: 'hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
						}, {
            Link: '/Authors',
            Text: 'Authors'
		}]
    });
});

app.get('/books', function (req, res) {
    res.send('Hello books from books');
});


app.listen(port, function (err) {
    if (err) {
        console.log('Error' + err);
    }
    console.log('running on port ' + port);
});
