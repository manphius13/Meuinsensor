var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');

require('./router/auth')(passport);


//Aqui incializa o express e salva na variável app
const app = express();
app.use(cors());



//Define o ejs como view engine, e define a pasta VIEWS como a principal para html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Permite passar dados no corpo do fomulário html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//para definir a pasta public como statica
app.use(express.static("./public"))


// Faz o arquivo index na pasta routes ficar disponível
var sessionRouter = require('./router/session');
app.use('/',sessionRouter);

// Faz o arquivo incubadoras na pasta routes ficar disponível
var incubadorasRouter= require('./router/incubadoras');
app.use('/incubadoras', incubadorasRouter);

// rota de usuarios
var usersRouter = require('./router/users');
app.use('/users',usersRouter);

// rota das mediçoes
var medicaoRouter = require('./router/medicao');
app.use('/medicao', medicaoRouter);

var recemNasc = require('./router/recemNasc');
app.use('/recemNasc', recemNasc);

//Define que o servidor vai rodar no localhost:3000

app.use(session({
    secret: '123', //configura um seredo seu aqui
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000}
}));

app.use(function (req,res,next){
    next(createError(404));
});

app.use(function (err,req,res,next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;