
/*
 * GET home page.
 */
exports.setup = function(app){
    app.get('/', function(req, res){
        res.render('home', { title: 'Express' })
    });
    
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/login', function(req, res){
        res.render('login');
    });
}
