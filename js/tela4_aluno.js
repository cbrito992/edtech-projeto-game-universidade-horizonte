let indiceDialogoAluno2 = 0;
let maquinaAluno2;

function typeWriterAluno2(textoHtml, elemento) {
    clearInterval(maquinaAluno2);
    elemento.innerHTML = "";
    if (deveExibirTextoInstantaneamente()) {
        elemento.innerHTML = textoHtml;
        return;
    }
    let i = 0;

    maquinaAluno2 = setInterval(() => {
        if (i >= textoHtml.length) {
            clearInterval(maquinaAluno2);
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

function ocultarPaineisAluno2() {
    document.getElementById('painel-video-aluno2').classList.add('escondido');
    document.getElementById('painel-escolhas-aluno2').classList.add('escondido');
}

function carregarDialogoAluno2() {
    const linha = bancoDeDialogos.trilhaAluno2[indiceDialogoAluno2];
    if (!linha) return;

    const caixa = document.getElementById('caixa-dialogo-aluno2');
    const nome = document.getElementById('nome-falante-aluno2');
    const texto = document.getElementById('texto-narrativa-aluno2');
    const btnAvancar = document.getElementById('btn-avancar-aluno2');
    const npcPlayer = document.getElementById('npc-player-aluno2');
    const npcLivia = document.getElementById('npc-livia-aluno2');

    ocultarPaineisAluno2();
    npcPlayer.classList.add('escondido');
    npcLivia.classList.add('escondido');

    if (linha.tipo === 'video') {
        caixa.classList.add('escondido');
        document.getElementById('painel-video-aluno2').classList.remove('escondido');
        document.getElementById('iframe-video-aluno2').src = linha.url;
        somBiblioteca.pause();
        return;
    }

    if (linha.tipo === 'link') {
        caixa.classList.remove('escondido');
        nome.classList.remove('escondido');
        nome.innerText = 'SISTEMA';
        btnAvancar.classList.remove('escondido');
        const aviso = `O artigo foi aberto em uma nova aba do navegador.<br><br><a href="${linha.url}" target="_blank" rel="noopener noreferrer" style="color:#ff0081;text-decoration:underline;">Clique aqui se a nova aba não abriu.</a>`;
        typeWriterAluno2(aviso, texto);
        window.open(linha.url, '_blank', 'noopener,noreferrer');
        return;
    }

    if (linha.tipo === 'escolha-final') {
        caixa.classList.add('escondido');
        document.getElementById('painel-escolhas-aluno2').classList.remove('escondido');
        return;
    }

    caixa.classList.remove('escondido');
    btnAvancar.classList.remove('escondido');
    const nomeFormatado = (linha.nome || '').replace(/{nome}/g, jogador.nome || 'Visitante');
    const textoFormatado = (linha.texto || '').replace(/{nome}/g, jogador.nome || 'Visitante');

    if (nomeFormatado) {
        nome.classList.remove('escondido');
        nome.innerText = nomeFormatado;
        npcPlayer.classList.remove('escondido');
        npcLivia.classList.remove('escondido');
    } else {
        nome.classList.add('escondido');
    }

    typeWriterAluno2(textoFormatado, texto);
}

function irParaConselho() {
    calcularFinalLiberado();
    ocultarPaineisAluno2();
    const tela4 = document.getElementById('tela4-aluno');
    const tela5 = document.getElementById('tela5-conselho');

    tela4.classList.add('fade-out');
    setTimeout(() => {
        somBiblioteca.pause();
        somBiblioteca.currentTime = 0;
        somConselho.currentTime = 0;
        tela4.classList.remove('cena-ativa', 'fade-in', 'fade-out');
        tela4.classList.add('escondido');
        tela5.classList.remove('escondido');
        tela5.classList.add('cena-ativa', 'fade-in');
        document.getElementById('npc-player-conselho').src = `assets/images/player_${jogador.genero}.png`;
        document.dispatchEvent(new Event('iniciarTelaConselho'));
    }, 1000);
}

document.getElementById('btn-avancar-aluno2').addEventListener('click', () => {
    tocarSom(somTela);
    indiceDialogoAluno2++;
    carregarDialogoAluno2();
});

document.getElementById('btn-fechar-video-aluno2').addEventListener('click', () => {
    tocarSom(somMenu);
    document.getElementById('iframe-video-aluno2').src = '';
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));
    indiceDialogoAluno2++;
    carregarDialogoAluno2();
});

document.querySelectorAll('.btn-escolha-final').forEach(botao => {
    botao.addEventListener('click', e => {
        tocarSom(somMenu);
        registrarTendenciaFinal('interacaoAluno2', e.currentTarget.getAttribute('data-final'));
        irParaConselho();
    });
});

document.addEventListener('iniciarTelaAluno2', () => {
    indiceDialogoAluno2 = 0;
    somBiblioteca.loop = true;
    aplicarVolumeGlobal();
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));
    carregarDialogoAluno2();
});

document.addEventListener('reiniciarTelaAluno2', () => {
    const escolhaAnterior = jogador.escolhas.interacaoAluno2;
    if (escolhaAnterior && jogador.pontuacaoFinais[escolhaAnterior] > 0) {
        jogador.pontuacaoFinais[escolhaAnterior]--;
    }
    delete jogador.escolhas.interacaoAluno2;
    jogador.finalLiberado = '';
    indiceDialogoAluno2 = 0;
    document.getElementById('iframe-video-aluno2').src = '';
    document.getElementById('caixa-dialogo-aluno2').classList.remove('escondido');
    ocultarPaineisAluno2();
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));
    carregarDialogoAluno2();
});
