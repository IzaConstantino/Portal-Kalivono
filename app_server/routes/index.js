var express = require('express');
var router = express.Router();
var ctrlTermos = require('../controllers/termo');

/* GET home page. */
router.get('/', ctrlTermos.inicia);
router.get('/termo/busca/:id', ctrlTermos.carregaTermo);
router.get('/termos/busca/:' + encodeURIComponent('categoria'), ctrlTermos.buscaPorCategoria);
router.get('/termos/filtro/:' + encodeURIComponent('termoSolicitado'), ctrlTermos.buscaTermoPortugues);
module.exports = router;