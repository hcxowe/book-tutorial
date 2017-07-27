var express = require('express');
var exphbs  = require('express-handlebars');
var fortune = require('./libs/fortune');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.engine('handlebars', exphbs.create({ defaultLayout: 'main' }).engine);
app.set('view engine', 'handlebars');

//app.set('views', __dirname + '/views');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() });
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port'));
});