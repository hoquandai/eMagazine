var express = require('express');
var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections')
var morgan = require('morgan');
var app = express();
var categoryModel = require('./models/category.model')
var postModel = require('./models/post.model')
var dateFormat = require('dateformat')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
        section: hbs_sections(),
        format: val => {
            return dateFormat(val, "dddd, mmmm dS, yyyy");
        }
    }
}));

app.set('view engine', 'hbs');
app.use(require('./middlewares/locals.categories.mdw'));

app.use(express.static('public'));
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);

app.use(require('./middlewares/auth-locals-mdw'));

app.get('/', (req, res, next) => {
    var cn = [];
    var catenames = categoryModel.catenames();
    catenames.then(rows => {
        var i = 0;
        rows.forEach(row => {
            cn[i] = row.cn;
            i++
        });
        //console.log(cn);

        var posts = postModel.loadForHome();
        posts.then(rows => {
            var entity = {};
            var top3 = {};
            var view10 = {};
            var new10 = {};

            top3['name'] = 'top3';
            top3['posts'] = rows[0];

            view10['name'] = 'view10';
            view10['posts'] = rows[1];
            
            new10['name'] = 'date10';
            new10['posts'] = rows[2];

            entity['top3'] = top3;
            entity['view10'] = view10;
            entity['new10'] = new10;

            //console.log(entity['top3'].posts);
            res.render('home', entity);
        }).catch(next)
    }).catch(next);
});

/// READER
app.use('/home', require('./routes/home.route'));
app.use('/news', require('./routes/reader/news.route'));
app.use('/top', require('./routes/reader/top.route'));
app.use('/subscriber', require('./routes/subscriber/index.route'));
app.use('/reader/category', require('./routes/reader/category.route'));
app.use('/reader/tag', require('./routes/reader/tag.route'));
app.use('/reader/search', require('./routes/reader/search.route'));

/// INFO
app.use('/about', require('./routes/info/about.route'));
app.use('/privacy', require('./routes/info/privacy.route'));
app.use('/contact', require('./routes/info/contact.route'));
app.use('/account', require('./routes/info/account.route'));
app.use('/user_detail', require('./routes/info/user_detail.route'));
app.use('/account/profile', require('./routes/info/user_detail.route'));
app.use('/resetpw', require('./routes/info/resetpw.route'));
app.use('/success', require('./routes/info/success.route'));

/// ADMIN
app.use('/admin/categories', require('./routes/admin/categories.route'));
app.use('/admin/details', require('./routes/admin/detail.route'));
app.use('/admin/posts', require('./routes/admin/posts.route'));
app.use('/admin/tags', require('./routes/admin/tag.route'));
app.use('/admin/users', require('./routes/admin/users.route'));
app.use('/admin/edit', require('./routes/admin/edit.route'));
app.use('/admin/update', require('./routes/admin/update.route'));
app.use('/admin/add', require('./routes/admin/add.route'));
app.use('/admin/upload', require('./routes/admin/upload.route'));

/// EDITOR
app.use('/editor', require('./routes/editor/index.route'));
app.use('/editor/post', require('./routes/editor/post.route'));
app.use('/editor/edit', require('./routes/editor/edit.route'));

/// WRITER
app.use('/writer/post', require('./routes/writer/post.route'));
app.use('/writer/posted', require('./routes/writer/posted.route'));
app.use('/writer/upload', require('./routes/writer/upload.route'));
app.use('/writer/edit', require('./routes/writer/edit.route'))
/// POST
app.use('/post', require('./routes/post.route'));

// searching
app.post('/', (req, res, next) => {
    var searchString = req.body.search;
    console.log(searchString);
    var posts = postModel.getPostsBySearchString(searchString);
    posts.then(rows => {
        res.render('reader/search', { posts: rows, search: searchString });
    }).catch(next)
});

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