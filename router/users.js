var express = require('express');
var router = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('2012');


// exibe lista de usuario
router.get('/', function (req, res) {
    global.conn.request().query`select nome, email from usuario`
        .then((result) => {
            res.render('usuario/index', { usuarios: result.recordset });

        })
        .catch((err) => {
            console.log(err);
        })
})

// ir para a view de cadastro
router.get('/create', function (req, res) {
    res.render('usuarios/create');
})

// cadastra o usuario no banco

router.post('/create', function (req, res, next) {

    let email = req.body.email;

    global.conn.request().query`select * from usuario where email = ${email}`
        .then(resultado => {
            let resposta = { msg: 2 };

            if (resultado.recordset.length > 0)
                res.json(resposta);
            else
                next();
        }).catch(err => {
            console.log(err);
        })
}, (req, res) =>{

    let nome = req.body.nome;

    // criptografa a senha

    let senha = cryptr.encrypt(req.body.senha);

    let email = req.body.email;

    global.conn.request().query`insert into usuario values(${nome},${senha},${email})`
    .then(() => {
        res.json({msg: 1 });
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;