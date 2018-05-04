//import modules 
var express = require ('express');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');
var path = require ('path');
var cors = require ('cors');
var passport = require ('passport');

const exphbs = require('express-handlebars');

const nodemailer = require('nodemailer');

var app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const route = require ('./routes/route');

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//MongoDB Connection
mongoose.connect('mongodb://localhost:27017/FinalDatabase');

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb');
});
mongoose.connection.on('error', (err) => {
    if(err){
        console.log('Error:' + err);
    }
});
const port = 3000; 

app.use(cors());
//app.use(express.bodyparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', (req, res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('Server started at port:' + port);
});
module.exports = app;