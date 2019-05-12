var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var app = express();
var categoryModel = require('./models/category.model')

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('home', {
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    })
});

/// READER
app.use('/news', require('./routes/reader/news.route'));
app.use('/chinhtri', require('./routes/reader/chinhtri.route'));
app.use('/top', require('./routes/reader/top.route'));
app.use('/giaoduc', require('./routes/reader/giaoduc.route'));
app.use('/xahoi', require('./routes/reader/xahoi.route'));
app.use('/phapluat', require('./routes/reader/phapluat.route'));
app.use('/nongsan', require('./routes/reader/kinhdoanh/nongsan.route'));
app.use('/haisan', require('./routes/reader/kinhdoanh/haisan.route'));
app.use('/subscriber', require('./routes/subscriber/index.route'));

/// INFO
app.use('/about', require('./routes/info/about.route'));
app.use('/privacy', require('./routes/info/privacy.route'));
app.use('/contact', require('./routes/info/contact.route'));
app.use('/login', require('./routes/info/login.route'));
app.use('/signup', require('./routes/info/signup.route'));

/// ADMIN
app.use('/cate_management', require('./routes/admin/categories.route'));
app.use('/detail_management', require('./routes/admin/detail.route'));
app.use('/post_management', require('./routes/admin/posts.route'));
app.use('/tag_management', require('./routes/admin/tag.route'));
app.use('/user_management', require('./routes/admin/users.route'));


app.listen(3002, () => {
    console.log('server is running at http://localhost:3002');
})