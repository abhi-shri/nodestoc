const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//pk_022f3843ebbe465fb1a2d2c5ce819fad


app.use(bodyParser.urlencoded({
    extended: false
}));



function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_022f3843ebbe465fb1a2d2c5ce819fad', {json: true}, (err, res, body) =>{
        if(err) {
            return console.log(err);
        }
        if(res.statusCode === 200){
            // console.log(body);
            finishedAPI(body);
        };
    });
};





app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    });
});

app.get('/', function (req, res) {
    res.render('about', {
    });
});


app.post('/', function (req, res) {
    call_api(function(doneAPI){
        // posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});


app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on ' + PORT));
