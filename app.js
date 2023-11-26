
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let tentativas = 1;
let numeroAleatorio = gerarNumeroAleatorio();

let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do número secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute);
    if (chute <= 0 || chute > 10) {
        exibirTextoNaTela('h1', 'Inválido');
        exibirTextoNaTela('p', 'Digite um número entre 1 e 10.');
    } else if (numeroAleatorio == chute) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palvaraTentativas = tentativas > 1? 'tentativas': 'tenatativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palvaraTentativas}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('barra').setAttribute('disabled', true);
        document.getElementById('chute').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < numeroAleatorio) {
        exibirTextoNaTela('h1', 'Errouu!');
        exibirTextoNaTela('p', 'O número secreto é maior.');
    } else {
        exibirTextoNaTela('h1', 'Errouu!');
        exibirTextoNaTela('p', 'O número secreto é menor.');
    }
    tentativas++;
    limparTela();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosDaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeNumerosDaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparTela() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparTela();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('barra').removeAttribute('disabled');
    document.getElementById('chute').removeAttribute('disabled');
}