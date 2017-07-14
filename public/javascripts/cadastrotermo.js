window.onload = function() {
    document.getElementById('mensagemErro').style.visibility = 'hidden';
}

var midias = [];

var adicionarMidia = function() {
    document.getElementById('mensagemErro').style.visibility = 'hidden';
    var midia = document.getElementById('midia').value;
    var midiaValida = false;
    var novaMidia, tipo;
    if (midia.toLowerCase().endsWith('png') ||
        midia.toLowerCase().endsWith('jpg') ||
        midia.toLowerCase().endsWith('jpeg')) {
        novaMidia = document.createElement('img');
        novaMidia.setAttribute('src', midia);
        novaMidia.setAttribute('style', 'width: 25%; height: 25%');
        tipo = 'imagem';
        midiaValida = true;
        midia = { tipo: 'imagem', url: midia };
    } else if (midia.toLowerCase().includes('youtube.com')) {
        var url = midia.replace('watch?v=', 'embed/');
        novaMidia = document.createElement('iframe');
        novaMidia.setAttribute('src', url);
        novaMidia.setAttribute('width', '25%');
        novaMidia.setAttribute('height', '25%');
        novaMidia.setAttribute('frameboarder', '0');
        novaMidia.setAttribute('allowfullscreen', '');
        midiaValida = true;
        tipo = 'video';
        midia = { tipo: 'video', url: midia };
    }

    if (midiaValida) {
        midias.push(midia);
        adicionaMidiaNaPagina(novaMidia, tipo);
        document.getElementById('multimidia').value = JSON.stringify(midias);
    } else {
        document.getElementById('mensagemErro').style.visibility = 'visible';
        document.getElementById('mensagemErro').innerHTML = 'URL inválida!';
    }
    document.getElementById('midia').value = '';
};

var adicionaMidiaNaPagina = function(midia, tipo) {
    var lista;
    if (tipo === 'imagem') {
        lista = document.getElementById('listaImagens');
    } else {
        lista = document.getElementById('listaVideos');
    }

    var linkRemocao = document.createElement('a');
    var tamanho = midias.length;
    var ultimaMidiaInserida = midias[tamanho - 1];
    linkRemocao.setAttribute('onclick', "removeMidia(" + tamanho + ", '" + ultimaMidiaInserida.url + "', '" + ultimaMidiaInserida.tipo + "')");
    var id = 'link' + midias.length;
    linkRemocao.setAttribute('id', id);
    linkRemocao.setAttribute('href', '#' + id);
    var span = document.createElement('span');
    span.setAttribute('class', 'glyphicon glyphicon-trash');
    linkRemocao.appendChild(span);

    id = 'midia' + midias.length;
    midia.setAttribute('id', id);

    var primeiro = lista.firstChild;
    if (primeiro) {
        lista.insertBefore(midia, primeiro);
        lista.insertBefore(linkRemocao, primeiro);
    } else {
        lista.appendChild(midia);
        lista.appendChild(linkRemocao);
    }

};

var removeMidia = function(indice, url, tipo) {
    midias = midias.filter(function(elemento) {
        return elemento.url != url;
    });

    var lista;
    if (tipo === 'imagem') {
        lista = document.getElementById('listaImagens');
    } else {
        lista = document.getElementById('listaVideos');
    }
    lista.removeChild(document.getElementById('link' + indice));
    lista.removeChild(document.getElementById('midia' + indice));
};