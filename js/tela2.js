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
    if (emTelaMobileVertical()) {
        document.getElementById('npc-giovana').classList.add('escondido');
        document.getElementById('npc-player').classList.add('escondido');
    }
});

// ETAPA 1: Validação de Nome e Gênero
const inNome = document.getElementById('input-nome');
const selGenero = document.getElementById('select-genero');
const btnConfDados = document.getElementById('btn-confirmar-dados');
const selecaoAparencia = document.getElementById('selecao-aparencia');
const opcoesAvatar = [...document.querySelectorAll('.opcao-avatar')];
const statusAvatar = document.getElementById('status-avatar');
let avatarSelecionado = '';

function atualizarSelecaoAvatar() {
    const genero = selGenero.value;
    selecaoAparencia.classList.toggle('escondido', !genero);

    opcoesAvatar.forEach((botao, indice) => {
        const variacao = botao.dataset.avatar;
        const selecionado = variacao === avatarSelecionado;
        botao.setAttribute('aria-pressed', String(selecionado));
        botao.classList.toggle('selecionado', selecionado);
        botao.setAttribute('aria-label', `Aparência ${indice + 1}${selecionado ? ', selecionada' : ''}`);
    });

    statusAvatar.textContent = avatarSelecionado
        ? 'Aparência personalizada selecionada. Selecione-a novamente para voltar ao avatar padrão.'
        : 'Avatar padrão selecionado.';

    const imgPlayer = document.getElementById('npc-player');
    if (genero) {
        imgPlayer.src = caminhoAvatarJogador(genero, avatarSelecionado);
        imgPlayer.classList.toggle('escondido', emTelaMobileVertical());
    }
}

opcoesAvatar.forEach(botao => {
    botao.addEventListener('click', () => {
        tocarSom(somTela);
        avatarSelecionado = avatarSelecionado === botao.dataset.avatar ? '' : botao.dataset.avatar;
        atualizarSelecaoAvatar();
    });
});

function checarDados() {
    if (inNome.value.trim() !== "" && selGenero.value !== "") {
        btnConfDados.classList.remove('escondido');
    } else {
        btnConfDados.classList.add('escondido');
    }

    atualizarSelecaoAvatar();
}

inNome.addEventListener('input', checarDados);
selGenero.addEventListener('change', checarDados);

btnConfDados.addEventListener('click', (e) => {
    tocarSom(somMenu);
    jogador.nome = inNome.value.trim();
    jogador.genero = selGenero.value;
    jogador.avatar = avatarSelecionado;

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
    document.getElementById('npc-player').classList.add('escondido');
    document.getElementById('npc-giovana').classList.remove('escondido');

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

        mostrarTransicaoAto('Ato I', '', () => {
            document.dispatchEvent(new Event('iniciarJogoAtos'));
        });
    });
});

// Ação de Reiniciar (Menu Sanduíche)
document.addEventListener('reiniciarTela2', () => {
    jogador.nome = "";
    jogador.genero = "";
    jogador.avatar = "";
    jogador.classeID = "";
    jogador.classeTitulo = "";

    document.getElementById('input-nome').value = "";
    document.getElementById('select-genero').value = "";
    avatarSelecionado = '';
    atualizarSelecaoAvatar();
    document.getElementById('npc-player').classList.add('escondido');

    document.getElementById('painel-criacao').classList.add('escondido');
    document.getElementById('etapa-classe').classList.add('escondido');
    document.getElementById('etapa-dados').classList.remove('escondido');

    document.querySelectorAll('.card-classe').forEach(c => c.classList.remove('selecionado'));
    document.getElementById('btn-confirmar-classe').classList.add('escondido');

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
