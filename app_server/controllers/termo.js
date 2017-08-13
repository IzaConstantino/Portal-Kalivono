var request = require('request');

var opcoesApi = {
    servidor: "http://localhost:3000"
};

var renderizaPaginaInicial = function(req, res, termos) {
    var mensagem;
    if (!(termos instanceof Array)) {
        mensagem = "Erro ao tentar recuperar os termos";
        resposta = [];
    } else if (!termos.length) {
        mensagem = "Nenhum termo cadastrado";
    } else {
        mensagem = termos.length + ' termos cadastrados';
    }

    res.render('index', {
        termosCarousel: termos,
        mensagem: mensagem,
        menu: true
    });
};

var carregaPaginaInicial = function(req, res) {
    var caminho = '/api/termos';
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'GET',
        json: {}
    };
    request(
        opcoesRequisicao,
        function(erro, resposta, termos) {
            renderizaPaginaInicial(req, res, termos);
        }
    );
};

module.exports.inicia = function(req, res) {
    carregaPaginaInicial(req, res);
};

module.exports.carregaTermo = function(req, res) {
    var caminho = '/api/termos/' + req.params.id;
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'GET',
        json: {}
    }
    request(opcoesRequisicao, function(erro, resposta, termo) {
        var mensagem;
        if (!termo) {
            mensagem = "Termo não encontrado";
            resposta = [];
        } else {
            mensagem = termo.emTerena + ' encontrado';
        }
        res.render('termo', {
            termo: termo,
            menu: false
        });
    });
};

module.exports.buscaPorCategoria = function(req, res) {
    var caminho = '/api/termos/categoria/' + encodeURI(req.params.categoria);
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'GET',
        json: {}
    }
    request(opcoesRequisicao, function(erro, resposta, termos) {
        var mensagem;
        if (!(termos instanceof Array)) {
            mensagem = "Erro ao tentar recuperar os termos";
            resposta = [];
        } else if (!termos.length) {
            mensagem = "Nenhum termo cadastrado";
        } else {
            mensagem = termos.length + ' termos cadastrados';
        }

        res.render('index', {
            termos: termos,
            mensagem: mensagem,
            menu: true
        });
    });
}
module.exports.buscaTermoPortugues = function(req, res) {
    console.log(req.params)
    var caminho = '/api/termos/termoSolicitado/' + encodeURI(req.params.termoSolicitado);
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'GET',
        json: {}
    }
    request(opcoesRequisicao, function(erro, resposta, termos) {
        var mensagem;
        if (!(termos instanceof Array)) {
            mensagem = "Erro ao tentar recuperar os termos";
            resposta = [];
        } else if (!termos.length) {
            mensagem = "Nenhum termo cadastrado";
        } else {
            mensagem = termos.length + ' termos cadastrados';
        }

        res.render('index', {
            termos: termos,
            mensagem: mensagem,
            menu: true
        });
    });
}

// var callback = function(par1, par2, callback) {
//     callback(par1 + par2)
// }

// callback(1, 4, function(resultado) {
//     console.log(resultado * 9)
// })
// console.log('teste')

// var callbackSync = function(par1, par2) {
//     return par1 + par2
// }
// var resultado = callbackSync(1, 4)
// console.log(resultado * 9)