var express = require('express');
var router = express.Router();
var ctrlTermos = require('../controllers/termo');

/* GET home page. */
router.get('/', ctrlTermos.inicia);
router.get('/termo/novo', ctrlTermos.carregaFormularioNovoTermo);
router.post('/termo/novo', ctrlTermos.salvaNovoTermo);
router.get('/termo/:id', ctrlTermos.removeTermo);
router.get('/termo/busca/:' + encodeURIComponent('categoria'), ctrlTermos.buscaPorCategoria);

module.exports = router;