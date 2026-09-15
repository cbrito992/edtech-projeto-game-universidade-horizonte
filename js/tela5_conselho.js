let indiceConselhoAluno = 0;
let maquinaConselho;
let roteiroConselhoAtual = [];

const finaisAluno = {
    A: {
        titulo: "HORIZONTE EXPANDIDO",
        texto: "A universidade decide ampliar o Programa Horizonte IA para oferecer apoio personalizado e acesso contínuo à aprendizagem. A expansão vem acompanhada de tutoria humana, alternativas equivalentes e avaliação periódica, porque autonomia só é inclusiva quando ninguém é deixado sozinho ou para trás."
    },
    B: {
        titulo: "PRESENÇA QUE ORIENTA",
        texto: "A universidade mantém a Inteligência Artificial em atividades delimitadas e supervisionadas. A mediação docente, o vínculo e o julgamento pedagógico permanecem no centro, enquanto a comunidade constrói formação e critérios para avançar com segurança — sem transformar cuidado em medo da mudança."
    },
    C: {
        titulo: "INOVAÇÃO RESPONSÁVEL",
        texto: "A universidade transforma o uso da Inteligência Artificial em prática de investigação. Estudantes declaram como utilizaram as ferramentas, verificam fontes e preservam sua contribuição intelectual; professores orientam processos e a instituição revisa continuamente impactos, desigualdades e riscos."
    }
};

function typeWriterConselho(textoHtml, elemento) {
    clearInterval(maquinaConselho);
    elemento.innerHTML = "";
    if (deveExibirTextoInstantaneamente()) {
        elemento.innerHTML = textoHtml;
        return;
    }
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
    const linha = roteiroConselhoAtual[indiceConselhoAluno];
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
        indiceConselhoAluno === roteiroConselhoAtual.length - 1 ? 'Conhecer o futuro' : 'Avançar';
}

function montarRoteiroConselho() {
    const primeiroPosicionamento = jogador.escolhas.interacaoAluno1;
    const segundoPosicionamento = jogador.escolhas.interacaoAluno2;
    const escolhasMudaram = primeiroPosicionamento !== segundoPosicionamento;
    const reflexaoHistorico = escolhasMudaram
        ? { nome: "REITORA HELENA", texto: "Seu posicionamento mudou durante a investigação. Isso não é incoerência: revisar uma ideia diante de novos argumentos também faz parte de uma decisão responsável." }
        : { nome: "REITORA HELENA", texto: "Suas duas decisões apontaram para a mesma prioridade. Agora precisamos examinar também os limites e as responsabilidades que acompanham essa direção." };

    return [
        ...bancoDeDialogos.conselhoAluno.abertura,
        reflexaoHistorico,
        ...bancoDeDialogos.conselhoAluno[jogador.finalLiberado],
        ...bancoDeDialogos.conselhoAluno.encerramento
    ];
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
    roteiroConselhoAtual = montarRoteiroConselho();
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    document.getElementById('painel-final-aluno').classList.add('escondido');
    bgmTela1.pause();
    somConselho.loop = true;
    somConselho.currentTime = 0;
    aplicarVolumeGlobal();
    if (somLigado) somConselho.play().catch(e => console.log(e));
    carregarDialogoConselho();
});

document.addEventListener('reiniciarTelaConselho', () => {
    indiceConselhoAluno = 0;
    roteiroConselhoAtual = montarRoteiroConselho();
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    document.getElementById('painel-final-aluno').classList.add('escondido');
    somConselho.currentTime = 0;
    if (somLigado) somConselho.play().catch(e => console.log(e));
    carregarDialogoConselho();
});
