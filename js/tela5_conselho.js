let indiceConselhoAluno = 0;
let maquinaConselho;

const finaisAluno = {
    A: {
        titulo: "FINAL A — UNIVERSIDADE AUTOMATIZADA",
        texto: "A Universidade Horizonte amplia a integração da Inteligência Artificial, priorizando acesso, personalização e autonomia. A tecnologia assume um papel central na experiência de aprendizagem."
    },
    B: {
        titulo: "FINAL B — UNIVERSIDADE PROTEGIDA",
        texto: "A Universidade Horizonte estabelece limites mais rigorosos para a Inteligência Artificial, preservando a mediação humana e priorizando a segurança do processo educativo."
    },
    C: {
        titulo: "FINAL C — UNIVERSIDADE INVESTIGATIVA",
        texto: "A Universidade Horizonte adota a Inteligência Artificial com transparência, verificação e responsabilidade. A comunidade aprende a investigar tanto as possibilidades quanto os riscos da tecnologia."
    }
};

function typeWriterConselho(textoHtml, elemento) {
    clearInterval(maquinaConselho);
    elemento.innerHTML = "";
    let i = 0;

    maquinaConselho = setInterval(() => {
        if (i >= textoHtml.length) {
            clearInterval(maquinaConselho);
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

function ocultarAvataresConselho() {
    document.querySelectorAll('.npc-conselho').forEach(avatar => avatar.classList.add('escondido'));
}

function mostrarAvatarConselho(nome) {
    ocultarAvataresConselho();
    if (nome === 'REITORA HELENA') document.getElementById('npc-helena-conselho').classList.remove('escondido');
    if (nome === 'LÍVIA') document.getElementById('npc-livia-conselho').classList.remove('escondido');
    if (nome === 'PROFESSOR AUGUSTO') document.getElementById('npc-augusto-conselho').classList.remove('escondido');
    if (nome === (jogador.nome || 'Visitante')) document.getElementById('npc-player-conselho').classList.remove('escondido');
}

function carregarDialogoConselho() {
    const linha = bancoDeDialogos.conselhoAluno[indiceConselhoAluno];
    if (!linha) {
        revelarFinalAluno();
        return;
    }

    const nomeFormatado = (linha.nome || '').replace(/{nome}/g, jogador.nome || 'Visitante');
    const textoFormatado = (linha.texto || '').replace(/{nome}/g, jogador.nome || 'Visitante');
    const nome = document.getElementById('nome-falante-conselho');

    if (nomeFormatado) {
        nome.classList.remove('escondido');
        nome.innerText = nomeFormatado;
    } else {
        nome.classList.add('escondido');
    }

    mostrarAvatarConselho(nomeFormatado);
    typeWriterConselho(textoFormatado, document.getElementById('texto-narrativa-conselho'));
    document.getElementById('btn-avancar-conselho').innerText =
        indiceConselhoAluno === bancoDeDialogos.conselhoAluno.length - 1 ? 'Revelar resultado' : 'Avançar';
}

function revelarFinalAluno() {
    const conteudo = finaisAluno[jogador.finalLiberado];
    clearInterval(maquinaConselho);
    ocultarAvataresConselho();
    document.getElementById('caixa-dialogo-conselho').classList.add('escondido');
    document.getElementById('titulo-final-aluno').innerText = conteudo.titulo;
    document.getElementById('texto-final-aluno').innerText = conteudo.texto;
    document.getElementById('painel-final-aluno').classList.remove('escondido');
}

document.getElementById('btn-avancar-conselho').addEventListener('click', () => {
    tocarSom(somTela);
    indiceConselhoAluno++;
    carregarDialogoConselho();
});

document.getElementById('btn-recomecar-aluno').addEventListener('click', () => location.reload());

document.addEventListener('iniciarTelaConselho', () => {
    indiceConselhoAluno = 0;
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    document.getElementById('painel-final-aluno').classList.add('escondido');
    bgmTela1.currentTime = 0;
    bgmTela1.volume = 0.2;
    if (somLigado) bgmTela1.play().catch(e => console.log(e));
    carregarDialogoConselho();
});

document.addEventListener('reiniciarTelaConselho', () => {
    indiceConselhoAluno = 0;
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    document.getElementById('painel-final-aluno').classList.add('escondido');
    bgmTela1.currentTime = 0;
    if (somLigado) bgmTela1.play().catch(e => console.log(e));
    carregarDialogoConselho();
});
