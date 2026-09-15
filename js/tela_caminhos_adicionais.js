let indiceCaminhoAdicional = 0;
let maquinaCaminhoAdicional;
let caminhoAtual;

function typeWriterCaminhoAdicional(textoHtml, elemento) {
    clearInterval(maquinaCaminhoAdicional);
    elemento.innerHTML = "";
    if (deveExibirTextoInstantaneamente()) {
        elemento.innerHTML = textoHtml;
        return;
    }

    let i = 0;
    maquinaCaminhoAdicional = setInterval(() => {
        if (i >= textoHtml.length) {
            clearInterval(maquinaCaminhoAdicional);
            return;
        }
        if (textoHtml.charAt(i) === '<') {
            const tagFim = textoHtml.indexOf('>', i);
            elemento.innerHTML += textoHtml.substring(i, tagFim + 1);
            i = tagFim + 1;
        } else {
            elemento.innerHTML += textoHtml.charAt(i++);
        }
    }, 30);
}

function ocultarPaineisAdicionais() {
    document.getElementById('painel-video-adicional').classList.add('escondido');
    document.getElementById('painel-escolhas-adicional').classList.add('escondido');
}

function exibirEscolhaAdicional(linha) {
    const painel = document.getElementById('painel-escolhas-adicional');
    const opcoes = document.getElementById('opcoes-escolha-adicional');
    document.getElementById('pergunta-escolha-adicional').innerText = linha.pergunta;
    opcoes.innerHTML = '';

    linha.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-escolha btn-escolha-adicional';
        botao.innerText = opcao.texto;
        botao.addEventListener('click', () => {
            tocarSom(somMenu);
            registrarTendenciaFinal(linha.interacao, opcao.final);
            painel.classList.add('escondido');
            indiceCaminhoAdicional++;
            carregarCaminhoAdicional();
        });
        opcoes.appendChild(botao);
    });

    painel.classList.remove('escondido');
    opcoes.querySelector('button')?.focus();
}

function carregarCaminhoAdicional() {
    let linha = caminhoAtual.dialogos[indiceCaminhoAdicional];
    if (!linha) {
        irParaConselhoAdicional();
        return;
    }

    const tela = document.getElementById('tela-caminho-adicional');
    const caixa = document.getElementById('caixa-dialogo-adicional');
    const nome = document.getElementById('nome-falante-adicional');
    const texto = document.getElementById('texto-narrativa-adicional');
    const avancar = document.getElementById('btn-avancar-adicional');
    const npc = document.getElementById('npc-companheiro');
    const player = document.getElementById('npc-player-adicional');

    ocultarPaineisAdicionais();
    npc.classList.add('escondido');
    player.classList.add('escondido');

    if (linha.tipo === 'resposta') {
        linha = caminhoAtual.respostas[linha.interacao][jogador.escolhas[linha.interacao]];
    }

    if (linha.tipo === 'escolha') {
        caixa.classList.add('escondido');
        exibirEscolhaAdicional(linha);
        return;
    }

    if (linha.tipo === 'video') {
        caixa.classList.add('escondido');
        document.getElementById('painel-video-adicional').classList.remove('escondido');
        document.getElementById('iframe-video-adicional').src = linha.url;
        somBiblioteca.pause();
        return;
    }

    if (linha.tipo === 'link') {
        caixa.classList.remove('escondido');
        nome.classList.remove('escondido');
        nome.innerText = 'ARQUIVO DE PESQUISA';
        avancar.innerText = 'Continuar análise';
        const aviso = `O material foi aberto em uma nova aba.<br><br><a href="${linha.url}" target="_blank" rel="noopener noreferrer" style="color:#36d9ff;text-decoration:underline;">Abrir o material novamente</a>`;
        typeWriterCaminhoAdicional(aviso, texto);
        window.open(linha.url, '_blank', 'noopener,noreferrer');
        return;
    }

    caixa.classList.remove('escondido');
    if (linha.bg) tela.style.backgroundImage = linha.bg;
    const nomeFormatado = (linha.nome || '').replace(/{nome}/g, jogador.nome || 'Visitante');
    const textoFormatado = (linha.texto || '').replace(/{nome}/g, jogador.nome || 'Visitante');

    avancar.innerText = linha.btnTexto || 'Avançar';
    if (nomeFormatado) {
        nome.classList.remove('escondido');
        nome.innerText = nomeFormatado;
        npc.classList.remove('escondido');
        player.classList.remove('escondido');
    } else {
        nome.classList.add('escondido');
    }
    typeWriterCaminhoAdicional(textoFormatado, texto);
}

function irParaConselhoAdicional() {
    calcularFinalLiberado();
    const telaAtual = document.getElementById('tela-caminho-adicional');
    const conselho = document.getElementById('tela5-conselho');
    telaAtual.classList.add('fade-out');

    setTimeout(() => {
        somBiblioteca.pause();
        somBiblioteca.currentTime = 0;
        somConselho.currentTime = 0;
        telaAtual.classList.remove('cena-ativa', 'fade-in', 'fade-out');
        telaAtual.classList.add('escondido');
        conselho.classList.remove('escondido');
        conselho.classList.add('cena-ativa', 'fade-in');
        document.getElementById('npc-player-conselho').src = `assets/images/player_${jogador.genero}.png`;
        document.dispatchEvent(new Event('iniciarTelaConselho'));
    }, preferenciasAcessibilidade.reduzirMovimento ? 0 : 1000);
}

document.getElementById('btn-avancar-adicional').addEventListener('click', () => {
    tocarSom(somTela);
    indiceCaminhoAdicional++;
    carregarCaminhoAdicional();
});

document.getElementById('btn-fechar-video-adicional').addEventListener('click', () => {
    tocarSom(somMenu);
    document.getElementById('iframe-video-adicional').src = '';
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));
    indiceCaminhoAdicional++;
    carregarCaminhoAdicional();
});

document.addEventListener('iniciarCaminhoAdicional', () => {
    caminhoAtual = caminhosAdicionais[jogador.classeID];
    indiceCaminhoAdicional = 0;
    const tela = document.getElementById('tela-caminho-adicional');
    tela.style.backgroundImage = caminhoAtual.inicio;
    const npc = document.getElementById('npc-companheiro');
    npc.src = caminhoAtual.npcImagem;
    npc.alt = caminhoAtual.npcNome;
    document.getElementById('npc-player-adicional').src = `assets/images/player_${jogador.genero}.png`;
    somBiblioteca.loop = true;
    aplicarVolumeGlobal();
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));
    carregarCaminhoAdicional();
});

document.addEventListener('reiniciarCaminhoAdicional', () => {
    Object.keys(jogador.escolhas)
        .filter(chave => chave.toLowerCase().includes(jogador.classeID))
        .forEach(chave => delete jogador.escolhas[chave]);
    jogador.pontuacaoFinais = { A: 0, B: 0, C: 0 };
    jogador.finalLiberado = '';
    jogador.ultimaEscolhaFinal = '';
    indiceCaminhoAdicional = 0;
    document.getElementById('iframe-video-adicional').src = '';
    document.getElementById('caixa-dialogo-adicional').classList.remove('escondido');
    document.getElementById('tela-caminho-adicional').style.backgroundImage = caminhoAtual.inicio;
    ocultarPaineisAdicionais();
    somBiblioteca.currentTime = 0;
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));
    carregarCaminhoAdicional();
});
