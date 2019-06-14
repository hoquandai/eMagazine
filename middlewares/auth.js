module.exports = (req, res, next) => {
    //console.log("USER: " + req.session.user);
    if(!req.session.user) {
        res.redirect('/account/login')
    } else {
        console.log("HELLO");
        next();
    }
    //res.end('...');
}