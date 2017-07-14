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
        mensagem: mensagem
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

module.exports.carregaFormularioNovoTermo = function(req, res) {
    res.render('termo', {
        titulo: 'Novo termo'
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
            mensagem: mensagem
        });
    });
}

module.exports.salvaNovoTermo = function(req, res) {
    var caminho = '/api/termos';
    var termo = req.body;
    termo.multimidia = JSON.parse(termo.multimidia);
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'POST',
        json: {
            termo: termo
        }
    };
    request(
        opcoesRequisicao,
        function(erro, resposta, body) {
            var mensagem = 'Termo salvo com sucesso!',
                sucesso = true;
            console.log('Status: ' + resposta.statusCode);
            if (resposta.statusCode === 500 || erro) {
                mensagem = 'Ocorreu um erro ao tentar salvar o termo';
                sucesso = false;
            }
            res.render('termo', {
                titulo: 'Novo termo',
                mensagem: mensagem,
                sucesso: sucesso
            });
        }
    );
};

module.exports.removeTermo = function(req, res) {
    var id = req.params.id;
    var caminho = '/api/termos/' + id;
    var opcoesRequisicao = {
        url: opcoesApi.servidor + caminho,
        method: 'DELETE',
        json: {}
    };
    request(
        opcoesRequisicao,
        function(erro, resposta, body) {
            var mensagem = 'Termo removido com sucesso!',
                sucesso = true;
            console.log('Status: ' + resposta.statusCode);
            if (resposta.statusCode === 500 || erro) {
                mensagem = 'Ocorreu um erro ao tentar remover o termo';
                sucesso = false;
            }
            res.redirect('/');
        }
    );
};