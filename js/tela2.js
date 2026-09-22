let maquinaTela2;

function typeWriterTela2(textoHtml, elemento) {
    clearInterval(maquinaTela2);
    elemento.innerHTML = "";
    if (deveExibirTextoInstantaneamente()) {
        elemento.innerHTML = textoHtml;
        return;
    }
    let i = 0;

    maquinaTela2 = setInterval(() => {
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
            clearInterval(maquinaTela2);
        }
    }, 30);
}

// ETAPA 0: Inicialização
document.addEventListener('iniciarTela2', () => {
    document.getElementById('npc-giovana').classList.remove('escondido');
    typeWriterTela2(bancoDeDialogos.tela2.fala1, document.getElementById('texto-narrativa-tela2'));
});

// Ação do Botão Avançar Inicial (Abre o painel)
document.getElementById('btn-avancar-tela2').addEventListener('click', (e) => {
    tocarSom(somTela);
    document.getElementById('caixa-dialogo-tela2').classList.add('escondido');
    document.getElementById('painel-criacao').classList.remove('escondido');
});

// ETAPA 1: Validação de Nome e Gênero
const inNome = document.getElementById('input-nome');
const selGenero = document.getElementById('select-genero');
const btnConfDados = document.getElementById('btn-confirmar-dados');

function checarDados() {
    if (inNome.value.trim() !== "" && selGenero.value !== "") {
        btnConfDados.classList.remove('escondido');
    } else {
        btnConfDados.classList.add('escondido');
    }

    if (selGenero.value !== "") {
        const imgPlayer = document.getElementById('npc-player');
        imgPlayer.src = `assets/images/player_${selGenero.value}.png`;
        imgPlayer.classList.remove('escondido');
    }
}

inNome.addEventListener('input', checarDados);
selGenero.addEventListener('change', checarDados);

btnConfDados.addEventListener('click', (e) => {
    tocarSom(somMenu);
    jogador.nome = inNome.value.trim();
    jogador.genero = selGenero.value;

    document.getElementById('etapa-dados').classList.add('escondido');
    document.getElementById('etapa-classe').classList.remove('escondido');
});

// ETAPA 2: Seleção de Classe
const cardsClasse = document.querySelectorAll('.card-classe');
const btnConfClasse = document.getElementById('btn-confirmar-classe');

cardsClasse.forEach(card => {
    card.addEventListener('click', () => {
        tocarSom(somTela);

        cardsClasse.forEach(c => c.classList.remove('selecionado'));
        card.classList.add('selecionado');

        jogador.classeID = card.getAttribute('data-id');
        jogador.classeTitulo = card.getAttribute('data-titulo');

        btnConfClasse.classList.remove('escondido');
    });
});

// ETAPA 3: Conclusão e Roteamento de Cena
btnConfClasse.addEventListener('click', (e) => {
    tocarSom(somMenu);

    document.getElementById('painel-criacao').classList.add('escondido');
    document.getElementById('caixa-dialogo-tela2').classList.remove('escondido');

    let textoFinal = bancoDeDialogos.tela2.fala2
        .replace('{nome}', jogador.nome)
        .replace('{classe}', jogador.classeTitulo);

    typeWriterTela2(textoFinal, document.getElementById('texto-narrativa-tela2'));

    let btnAvancar = document.getElementById('btn-avancar-tela2');
    btnAvancar.innerText = "Iniciar Jornada";

    let novoBtn = btnAvancar.cloneNode(true);
    btnAvancar.parentNode.replaceChild(novoBtn, btnAvancar);

    // Exibe o título do ato entre a escolha de função e o primeiro caminho.
    novoBtn.addEventListener('click', () => {
        tocarSom(somMenu);

        // Pausa a música de introdução
        if (typeof bgmTela1 !== 'undefined') {
            bgmTela1.pause();
            bgmTela1.currentTime = 0;
        }

        const tela2 = document.getElementById('tela2');
        tela2.classList.add('fade-out');

        setTimeout(() => {
            tela2.classList.remove('cena-ativa', 'fade-out');
            tela2.classList.add('escondido');
            const transicao = document.getElementById('tela-transicao-ato1');
            transicao.classList.remove('escondido');
            transicao.classList.add('cena-ativa', 'fade-in');
            document.getElementById('menu-persistente').classList.add('escondido');
            document.getElementById('btn-iniciar-ato1').focus();
        }, preferenciasAcessibilidade.reduzirMovimento ? 0 : 1000);
    });
});

document.getElementById('btn-iniciar-ato1').addEventListener('click', () => {
    tocarSom(somMenu);
    const transicao = document.getElementById('tela-transicao-ato1');
    transicao.classList.remove('cena-ativa', 'fade-in');
    transicao.classList.add('escondido');
    document.getElementById('menu-persistente').classList.remove('escondido');

    if (jogador.classeID === 'aluno') {
        const tela3 = document.getElementById('tela3-aluno');
        tela3.classList.remove('escondido');
        tela3.classList.add('cena-ativa', 'fade-in');
        document.getElementById('npc-player-aluno').src = `assets/images/player_${jogador.genero}.png`;
        document.dispatchEvent(new Event('iniciarTelaAluno'));
    } else if (jogador.classeID === 'professor' || jogador.classeID === 'estagiario') {
        const telaAdicional = document.getElementById('tela-caminho-adicional');
        telaAdicional.classList.remove('escondido');
        telaAdicional.classList.add('cena-ativa', 'fade-in');
        document.dispatchEvent(new Event('iniciarCaminhoAdicional'));
    }
});

// Ação de Reiniciar (Menu Sanduíche)
document.addEventListener('reiniciarTela2', () => {
    jogador.nome = "";
    jogador.genero = "";
    jogador.classeID = "";
    jogador.classeTitulo = "";

    document.getElementById('input-nome').value = "";
    document.getElementById('select-genero').value = "";
    document.getElementById('npc-player').classList.add('escondido');

    document.getElementById('painel-criacao').classList.add('escondido');
    document.getElementById('etapa-classe').classList.add('escondido');
    document.getElementById('etapa-dados').classList.remove('escondido');

    document.querySelectorAll('.card-classe').forEach(c => c.classList.remove('selecionado'));

    document.getElementById('caixa-dialogo-tela2').classList.remove('escondido');
    typeWriterTela2(bancoDeDialogos.tela2.fala1, document.getElementById('texto-narrativa-tela2'));

    let btnAvancar = document.getElementById('btn-avancar-tela2');
    let novoBtn = btnAvancar.cloneNode(true);
    novoBtn.innerText = "Avançar";
    btnAvancar.parentNode.replaceChild(novoBtn, btnAvancar);

    novoBtn.addEventListener('click', () => {
        tocarSom(somTela);
        document.getElementById('caixa-dialogo-tela2').classList.add('escondido');
        document.getElementById('painel-criacao').classList.remove('escondido');
    });
});
