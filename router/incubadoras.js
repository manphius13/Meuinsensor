var express = require('express');
var router = express.Router();


//--------------------------------------------------------------------------------

// Exibe uma lista de Incubadoras
router.get('/', ensureLoggedIn('/login?fail=true'), function (req, res) {
  //entra na conexão global e tem o comando sql
  global.conn.request().query`select * from incubadora`
    .then(result => {
      // renderiza view mandando o array com os registros do banco
      res.render('incubadoras/index', { incubadoras: result.recordset });
    }).catch(err => {
      console.dir(err);
    })
});
//-----------------------------------------------------------------------------------


//Aqui é GET pois exibe o formulário de cadastro de incubadoras para o cliente
router.get('/create', function (req, res) {

  res.render('incubadoras/create');
});

//-----------------------------------------------------------------------------------

//Aqui é POST pois Recebe o formulário de cadastro para ser salvo no banco
router.post('/create', function (req, res) {

  let codigo = req.body.desc;
  console.log("oiiiki");
  let status = 0;

  //entra na conexão global e tem o comando sql
  global.conn.request().query`insert into incubadora values(${codigo},${status})`
    .then(resultado => {
      res.redirect('/incubadoras');
    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })
});

router.get('/details/:id', function (req, res, next) {

  let id = req.params.id;

  global.conn.request().query`select * from incubadora where IdIncubadora = ${id}`

    .then(resultado => {

      res.render('incubadoras/details', { incubadora: resultado.recordset[0] });
      console.log(resultado.recordset[0])

    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })


});

//GET obtem medicao da incubadora

router.get('/medicao/:id', (req, res, next) => {

  let id = req.params.id;

  global.conn.request().query(`select Max(idMedicao), temperatura, umidade from medicao where fkIncubadora = ${id} group by idMedicao, temperatura, umidade`)

    .then(resultado => {

      res.json(resultado.recordset[0]);

    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })

});

// faz o botao deletar incubadora funcionar e deletar uma incubudora 
router.get('/delete/:id', (req, res) => {

  let id = req.params.id;

  global.conn.request().query`delete from incubadora where idIncubadora = ${id}`

    .then(resultado => {

      res.redirect('/incubadoras/');


    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })

})

router.post('/edit/:id', function (req,res,next){

  global.conn.request().query`update incubadora set descIncubadora = ${desc} where idIncubadora = ${idIncubadora}`
    .then(() => {
      global.conn.request().query`select descIncubadora from incubadora where idIncubadora = ${idIncubadora}`
        .then((resultado) => {
          res.json(resultado.recordset[0]);
        }).catch(err => {
          console.loq(err);
        })
    }).catch(err =>{
      console.log(err);
    })
})

//-----------------------------------------------------------------------------------------------------

module.exports = router;



