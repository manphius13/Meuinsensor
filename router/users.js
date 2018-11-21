var express = require('express');
var router = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('2012');

router.get('/', function (req, res){
    global.conn.request().query`select nome, email from usuario`
})