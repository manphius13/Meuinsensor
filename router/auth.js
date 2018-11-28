const LocalStrategy = require('passport-local').Strategy;
var express = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('2012');

// configuramos o passport aqui

module.exports = function (passport){

    passport.serializeUser(function (user, done){
        done(null, user.idUsuario);
    });
// -----------------------------------------------------------------------------------------
    passport.deserializeUser(function (id,done){
        global.conn.request().query`select * from usuario where idUsuario = ${id}`

        .then(user =>{
            done(null, user);
        }).catch(err => {
            console.log(err);
        })
    });
// --------------------------------------------------------------------------------------------------------------------------------
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username,password,done) =>{

        global.conn.request().query`select top (1) idUsuario, senha  from usuario where email = ${username} order by idUsuario desc`
        .then(usuario => {

            // verifica se retornou algum usuario
            if(usuario.recordset.length == 0)
                return done(null,false)

            let user = usuario.recordset[0];

            // descriptografa a senha
            let senhaDescript = cryptr.decrypt(user.senha);

            // comparando as senhas
            if (senhaDescript != password)
                return done(null,false)
            
            // caso nao entrar nos ifs anteriores retorna o usuario
            return done(null, user)
        }).catch(err =>{
            console.log(err);
        })
    }));
}