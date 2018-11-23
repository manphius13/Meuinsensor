var express = require('express');
var router = express.Router();

router.get('/', (req, res) =>{

    res.render('create',{id: id});

});

router.get('/create', (req, res) => {

    global.decodeURIComponent.request().query`select idIncubadora from Incubadora`
    .then((result) =>{
        res.render('recemNasc/create', {incubadoras : result.recordset})
    
    }).catch((err) =>{
        console.log(err);
    })
});

router.post('/create', (req,res) =>{
    global.conn.request().query`insert into recemNasc values()`
    .then((result) => {

    });
});


module.exports = router;