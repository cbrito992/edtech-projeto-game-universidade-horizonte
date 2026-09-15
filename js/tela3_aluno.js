let indiceDialogoAluno = 0;
let maquinaAluno;

function typeWriterAluno(textoHtml, elemento) {
    clearInterval(maquinaAluno);
    elemento.innerHTML = "";
    if (deveExibirTextoInstantaneamente()) {
        elemento.innerHTML = textoHtml;
        return;
    }
    let i = 0;

    maquinaAluno = setInterval(() => {
        if (i < textoHtml.length) {
            if (textoHtml.charAt(i) === '<') {
                let tagFim = textoHtml.indexOf('>', i);
                elemento.innerHTML += textoHtml.substring(i, tagFim + 1);
                i = tagFim + 1;
            } else {
                elemento.innerHTML += textoHtml.charAt(i);
                i++;
            }
        } else {
            clearInterval(maquinaAluno);
        }
    }, 30);
}

function carregarDialogoAluno() {
    let linha = bancoDeDialogos.trilhaAluno[indiceDialogoAluno];
    const telaConfig = document.getElementById('tela3-aluno');
    const caixaDialogo = document.getElementById('caixa-dialogo-aluno');
    const painelEscolhas = document.getElementById('painel-escolhas-aluno');
    const painelVideo = document.getElementById('painel-video');
    const elNome = document.getElementById('nome-falante-aluno');
    const elTexto = document.getElementById('texto-narrativa-aluno');
    const npcPlayer = document.getElementById('npc-player-aluno');
    const npcLivia = document.getElementById('npc-livia-aluno');
    const btnAvancar = document.getElementById('btn-avancar-aluno');

    if (!linha) return;

    if (linha.tipo === "resposta-escolha1") {
        linha = bancoDeDialogos.respostasAluno1[jogador.escolhas.interacaoAluno1];
    }

    // Remove os NPCs por padrão para telas de input/sistemas
    npcPlayer.classList.add('escondido');
    npcLivia.classList.add('escondido');

    // A última fala também avança para a segunda interação.
    btnAvancar.classList.remove('escondido');
    btnAvancar.innerText = linha.btnTexto || "Avançar";

    if (linha.tipo === "escolha") {
        caixaDialogo.classList.add('escondido');
        painelEscolhas.classList.remove('escondido');
        return;
    }

    if (linha.tipo === "video") {
        caixaDialogo.classList.add('escondido');
        painelVideo.classList.remove('escondido');
        document.getElementById('iframe-video').src = linha.url;
        somBiblioteca.pause();
        return;
    }

    if (linha.tipo === "link") {
        caixaDialogo.classList.remove('escondido');
        painelEscolhas.classList.add('escondido');
        painelVideo.classList.add('escondido');

        elNome.classList.remove('escondido');
        elNome.innerText = "SISTEMA";

        let textoArtigo = `O artigo foi aberto em uma nova aba do navegador.<br><br><a href="${linha.url}" target="_blank" style="color:#ff0081; text-decoration:underline;">Clique aqui caso o bloqueador de pop-ups tenha impedido a abertura.</a>`;
        typeWriterAluno(textoArtigo, elTexto);

        // Abre o link diretamente
        window.open(linha.url, '_blank');
        return;
    }

    caixaDialogo.classList.remove('escondido');
    painelEscolhas.classList.add('escondido');
    painelVideo.classList.add('escondido');

    if (linha.bg) telaConfig.style.backgroundImage = linha.bg;

    // Substitui {nome} tanto no Falante quanto no Texto
    let nomeFormatado = "";
    if (linha.nome) {
        nomeFormatado = String(linha.nome).replace(/{nome}/g, jogador.nome || "Visitante");
    }

    if (nomeFormatado === "") {
        elNome.classList.add('escondido');
    } else {
        elNome.classList.remove('escondido');
        elNome.innerText = nomeFormatado;

        // Mostra os NPCs apenas se houver interação humana
        if (nomeFormatado !== "SISTEMA") {
            npcPlayer.classList.remove('escondido');
            npcLivia.classList.remove('escondido');
        }
    }

    let textoSeguro = linha.texto || "";
    textoSeguro = textoSeguro.replace(/{nome}/g, jogador.nome || "Visitante");
    typeWriterAluno(textoSeguro, elTexto);
}

document.querySelectorAll('.btn-escolha').forEach(botao => {
    botao.addEventListener('click', (e) => {
        tocarSom(somMenu);
        jogador.escolhas.perguntaLivia1 = e.currentTarget.getAttribute('data-opcao');
        registrarTendenciaFinal('interacaoAluno1', e.currentTarget.getAttribute('data-final'));
        document.getElementById('painel-escolhas-aluno').classList.add('escondido');
        indiceDialogoAluno++;
        carregarDialogoAluno();
    });
});

document.getElementById('btn-fechar-video').addEventListener('click', () => {
    tocarSom(somMenu);
    document.getElementById('painel-video').classList.add('escondido');
    document.getElementById('iframe-video').src = "";

    if (somLigado) somBiblioteca.play().catch(e => console.log(e));

    indiceDialogoAluno++;
    if (indiceDialogoAluno < bancoDeDialogos.trilhaAluno.length) {
        carregarDialogoAluno();
    }
});

document.addEventListener('iniciarTelaAluno', () => {
    indiceDialogoAluno = 0;
    somBiblioteca.loop = true;
    aplicarVolumeGlobal();
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));

    document.getElementById('npc-player-aluno').classList.add('escondido');
    document.getElementById('npc-livia-aluno').classList.add('escondido');

    carregarDialogoAluno();
});

document.addEventListener('reiniciarTelaAluno', () => {
    indiceDialogoAluno = 0;
    jogador.escolhas.perguntaLivia1 = "";
    const escolhaAnterior = jogador.escolhas.interacaoAluno1;
    if (escolhaAnterior && jogador.pontuacaoFinais[escolhaAnterior] > 0) {
        jogador.pontuacaoFinais[escolhaAnterior]--;
    }
    delete jogador.escolhas.interacaoAluno1;
    delete jogador.escolhas.interacaoAluno2;
    jogador.pontuacaoFinais = { A: 0, B: 0, C: 0 };
    jogador.finalLiberado = "";
    jogador.ultimaEscolhaFinal = "";

    document.getElementById('painel-escolhas-aluno').classList.add('escondido');
    document.getElementById('painel-video').classList.add('escondido');
    document.getElementById('caixa-dialogo-aluno').classList.remove('escondido');
    document.getElementById('iframe-video').src = "";

    document.getElementById('npc-player-aluno').classList.add('escondido');
    document.getElementById('npc-livia-aluno').classList.add('escondido');

    somBiblioteca.currentTime = 0;
    if (somLigado) somBiblioteca.play().catch(e => console.log(e));

    carregarDialogoAluno();
});

document.getElementById('btn-avancar-aluno').addEventListener('click', () => {
    tocarSom(somTela);
    indiceDialogoAluno++;

    if (indiceDialogoAluno < bancoDeDialogos.trilhaAluno.length) {
        carregarDialogoAluno();
    } else {
        const tela3 = document.getElementById('tela3-aluno');
        const tela4 = document.getElementById('tela4-aluno');

        tela3.classList.add('fade-out');
        setTimeout(() => {
            tela3.classList.remove('cena-ativa', 'fade-in', 'fade-out');
            tela3.classList.add('escondido');
            tela4.classList.remove('escondido');
            tela4.classList.add('cena-ativa', 'fade-in');
            document.getElementById('npc-player-aluno2').src = `assets/images/player_${jogador.genero}.png`;
            document.dispatchEvent(new Event('iniciarTelaAluno2'));
        }, 1000);
    }
});
