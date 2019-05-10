var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3002, () => {
    console.log('server is running at http://localhost:3002');
})