let indiceDialogo = 0;
let maquinaIntervalo;

function typeWriter(textoHtml, elemento) {
    clearInterval(maquinaIntervalo);
    elemento.innerHTML = "";
    if (deveExibirTextoInstantaneamente()) {
        elemento.innerHTML = textoHtml;
        return;
    }
    let i = 0;

    maquinaIntervalo = setInterval(() => {
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
            clearInterval(maquinaIntervalo);
        }
    }, 30);
}

function carregarDialogo() {
    if (typeof bancoDeDialogos === 'undefined') {
        console.error("Erro Crítico: roteiro.js não encontrado.");
        return;
    }

    let linha = bancoDeDialogos.tela1[indiceDialogo];
    const elNome = document.getElementById('nome-falante');
    const elTexto = document.getElementById('texto-narrativa');
    const elBotao = document.getElementById('btn-avancar');
    const telaConfig = document.getElementById('tela1');

    // Controle do Nome
    if (linha.nome === "") {
        elNome.classList.add('escondido');
    } else {
        elNome.classList.remove('escondido');
        elNome.innerText = linha.nome;
    }

    // Controle Visual dos NPCs
    document.getElementById('npc-livia').classList.toggle('escondido', !linha.livia);
    document.getElementById('npc-augusto').classList.toggle('escondido', !linha.augusto);

    // Controle Dinâmico de Background
    if (linha.nome === "NOTIFICAÇÃO") {
        telaConfig.style.backgroundImage = "url('assets/images/background_tela_apresentacao.png')";
    } else if (linha.bg) {
        telaConfig.style.backgroundImage = linha.bg;
    } else {
        telaConfig.style.backgroundImage = "url('assets/images/background_tela_apresentacao.png')";
    }

    // Controle Dinâmico do Botão
    if (linha.btnTexto) {
        elBotao.innerText = linha.btnTexto;
    } else {
        elBotao.innerText = "Avançar";
    }

    typeWriter(linha.texto, elTexto);
}

// Gatilhos vindos do engine.js
document.addEventListener('iniciarTela1', () => {
    indiceDialogo = 0;
    carregarDialogo();
});

document.addEventListener('reiniciarTela1', () => {
    indiceDialogo = 0;
    carregarDialogo();
});

// Ação do Botão Avançar
document.getElementById('btn-avancar').addEventListener('click', () => {
    tocarSom(somTela);
    indiceDialogo++;

    if (indiceDialogo < bancoDeDialogos.tela1.length) {
        carregarDialogo();
    } else {
        // TRANSIÇÃO SUAVE (TELA 1 -> TELA 2)
        const tela1 = document.getElementById('tela1');
        tela1.classList.add('fade-out');

        setTimeout(() => {
            tela1.classList.remove('cena-ativa', 'fade-out');
            tela1.classList.add('escondido');
            tela1.style.display = ''; // Limpa o display para evitar conflitos

            // Ativa a Tela 2
            const tela2 = document.getElementById('tela2');
            tela2.classList.remove('escondido');
            tela2.classList.add('cena-ativa', 'fade-in');

            document.dispatchEvent(new Event('iniciarTela2'));
        }, 1000); // 1 segundo de esmaecimento cruzado
    }
});
