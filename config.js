// Aqui fica a configuração com o banco de dados
var config = {
    user: 'matheus.oliveira',
    password: 'Manphius13',
    server: 'bdmatheus.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'MatheusBanco',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

module.exports = config;