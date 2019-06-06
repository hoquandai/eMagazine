var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections')
var morgan = require('morgan');
var app = express();
var categoryModel = require('./models/category.model')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

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
app.use('/user_detail', require('./routes/info/user_detail.route'));

/// ADMIN
app.use('/admin/cate_management', require('./routes/admin/categories.route'));
app.use('/admin/detail_management', require('./routes/admin/detail.route'));
app.use('/admin/post_management', require('./routes/admin/posts.route'));
app.use('/admin/tag_management', require('./routes/admin/tag.route'));
app.use('/admin//user_management', require('./routes/admin/users.route'));
app.use('/admin/writer_post', require('./routes/writer/post.route'));
app.use('/admin/writer_posted', require('./routes/writer/posted.route'));

/// EDITOR
app.use('/editor', require('./routes/editor/index.route'));
app.use('/editor_post', require('./routes/editor/post.route'));

/// WRITER
app.use('/writer/post', require('./routes/writer/post.route'));
app.use('/writer/posted', require('./routes/writer/posted.route'));
app.use('/writer/upload', require('./routes/writer/upload.route'));
/// POST
app.use('/post', require('./routes/post.route'));

app.listen(3002, () => {
    console.log('server is running at http://localhost:3002');
})