var express = require('express');
var router = express.Router();
var moment = require('moment');
moment.locale('pt-BR', {
    longDateFormat: {
        L: 'YYYY-MM-DD',
        LTS: 'HH:mm:ss',
    }
});



module.exports = router;