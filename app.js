var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections')
var morgan = require('morgan');
var app = express();
var categoryModel = require('./models/category.model')
var cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('sleepydog'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
        section: hbs_sections()
    }
}));

app.set('view engine', 'hbs');
app.use(require('./middlewares/locals.categories.mdw'));

app.use(express.static('public'));
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);

app.use(require('./middlewares/auth-locals-mdw'));

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
app.use('/home', require('./routes/home.route'));
app.use('/news', require('./routes/reader/news.route'));
app.use('/top', require('./routes/reader/top.route'));
app.use('/subscriber', require('./routes/subscriber/index.route'));
app.use('/reader/category', require('./routes/reader/category.route'));

/// INFO
app.use('/about', require('./routes/info/about.route'));
app.use('/privacy', require('./routes/info/privacy.route'));
app.use('/contact', require('./routes/info/contact.route'));
app.use('/account', require('./routes/info/account.route'));
app.use('/user_detail', require('./routes/info/user_detail.route'));
app.use('/account/profile', require('./routes/info/user_detail.route'));


/// ADMIN
app.use('/admin/categories', require('./routes/admin/categories.route'));
app.use('/admin/details', require('./routes/admin/detail.route'));
app.use('/admin/posts', require('./routes/admin/posts.route'));
app.use('/admin/tags', require('./routes/admin/tag.route'));
app.use('/admin/users', require('./routes/admin/users.route'));

/// EDITOR
app.use('/editor', require('./routes/editor/index.route'));
app.use('/editor/post', require('./routes/editor/post.route'));

/// WRITER
app.use('/writer/post', require('./routes/writer/post.route'));
app.use('/writer/posted', require('./routes/writer/posted.route'));
app.use('/writer/upload', require('./routes/writer/upload.route'));
/// POST
app.use('/post', require('./routes/post.route'));

// ERROR
app.use((req, res, next) => {
    res.render('404', { 
        layout: false 
    });
})

app.use((error, req, res, next) => {
    res.render('error', {
        layout: false,
        message: error.message,
        error
    });
})
app.listen(3002, () => {
    console.log('server is running at http://localhost:3002');
})