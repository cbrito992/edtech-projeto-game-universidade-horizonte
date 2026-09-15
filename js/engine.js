// VARIÁVEIS GLOBAIS DE ESTADO
let jogador = {
    nome: "",
    genero: "",
    classeID: "",
    classeTitulo: "",
    escolhas: {}, // Memória permanente para os finais
    pontuacaoFinais: { A: 0, B: 0, C: 0 },
    finalLiberado: ""
};

function registrarTendenciaFinal(interacao, finalEscolhido) {
    const escolhaAnterior = jogador.escolhas[interacao];

    if (escolhaAnterior && jogador.pontuacaoFinais[escolhaAnterior] > 0) {
        jogador.pontuacaoFinais[escolhaAnterior]--;
    }

    jogador.escolhas[interacao] = finalEscolhido;
    jogador.pontuacaoFinais[finalEscolhido]++;
}

function calcularFinalLiberado() {
    const segundaEscolha = jogador.escolhas.interacaoAluno2;
    const maiorPontuacao = Math.max(...Object.values(jogador.pontuacaoFinais));
    const empatados = Object.keys(jogador.pontuacaoFinais)
        .filter(final => jogador.pontuacaoFinais[final] === maiorPontuacao);

    jogador.finalLiberado = empatados.length === 1 ? empatados[0] : segundaEscolha;
    return jogador.finalLiberado;
}

// VARIÁVEIS GLOBAIS DE ÁUDIO
const somMenu = new Audio('assets/sounds/digital-clique.mp3');
const somTela = new Audio('assets/sounds/clique2.mp3');
const bgmTela1 = new Audio('assets/sounds/sound intro_tela1.mp3');
const somBiblioteca = new Audio('assets/sounds/sound_biblioteca.mp3');

bgmTela1.loop = true;
bgmTela1.volume = 0.2;
let somLigado = true;

// FUNÇÕES AUXILIARES
function tocarSom(audio) {
    if (somLigado) {
        audio.currentTime = 0;
        audio.play().catch(erro => console.log("Erro som:", erro));
    }
}

const animarBotao = function(alvo) {
    alvo.classList.remove('animate');
    void alvo.offsetWidth;
    alvo.classList.add('animate');
    setTimeout(() => alvo.classList.remove('animate'), 700);
};

function toggleSomGlobal() {
    somLigado = !somLigado;

    // Atualiza o texto de ambos os botões simultaneamente
    const btnConfigMenu = document.getElementById('btn-config');
    const btnConfigSanduiche = document.getElementById('btn-toggle-som-jogo');
    if (btnConfigMenu) btnConfigMenu.innerText = somLigado ? "Som: Ligado" : "Som: Desligado";
    if (btnConfigSanduiche) btnConfigSanduiche.innerText = somLigado ? "Som: Ligado" : "Som: Desligado";

    // Controla a música de fundo dependendo da tela ativa
    if (!somLigado) {
        bgmTela1.pause();
        somBiblioteca.pause();
    } else {
        if (document.getElementById('tela1').classList.contains('cena-ativa') ||
            document.getElementById('tela2').classList.contains('cena-ativa')) {
            bgmTela1.play().catch(e => console.log(e));
        } else if ((document.getElementById('tela3-aluno') && document.getElementById('tela3-aluno').classList.contains('cena-ativa')) ||
                   (document.getElementById('tela4-aluno') && document.getElementById('tela4-aluno').classList.contains('cena-ativa'))) {
            somBiblioteca.play().catch(e => console.log(e));
        }
    }
}

// INICIALIZAÇÃO DE EVENTOS
document.addEventListener('DOMContentLoaded', () => {

    // 1. Botões do Menu Inicial (Instruções, Config)
    document.querySelectorAll('.btn-menu').forEach(botao => {
        botao.addEventListener('click', (e) => {
            if (botao.id !== 'btn-avancar' && botao.id !== 'btn-avancar-tela2' && botao.id !== 'btn-avancar-aluno') {
                animarBotao(botao);
            }

            if (botao.id === 'btn-instrucoes') {
                tocarSom(somMenu);
                document.getElementById('modal-instrucoes').classList.remove('escondido');
            }
            if (botao.id === 'btn-fechar-instrucoes') {
                tocarSom(somMenu);
                document.getElementById('modal-instrucoes').classList.add('escondido');
            }
            if (botao.id === 'btn-config') {
                tocarSom(somMenu);
                toggleSomGlobal();
            }
        });
    });

    // 2. Botão Jogar (Transição e Música)
    document.getElementById('btn-jogar').addEventListener('click', () => {
        tocarSom(somMenu);
        if (somLigado) bgmTela1.play().catch(e => console.log("Bloqueio de navegador", e));

        const telaMenu = document.getElementById('tela-menu');
        const tela1 = document.getElementById('tela1');
        const menuSanduiche = document.getElementById('menu-persistente');

        telaMenu.classList.add('fade-out');

        setTimeout(() => {
            telaMenu.classList.remove('cena-ativa');
            telaMenu.classList.add('escondido');

            tela1.classList.remove('escondido');
            tela1.classList.add('cena-ativa', 'fade-in');
            menuSanduiche.classList.remove('escondido'); // Menu liberado para o jogo todo

            document.dispatchEvent(new Event('iniciarTela1'));
        }, 1000);
    });

    // 3. Funções do Menu Sanduíche
    const painelOpcoes = document.getElementById('painel-opcoes');

    document.getElementById('btn-sanduiche').addEventListener('click', () => {
        tocarSom(somTela);
        painelOpcoes.classList.toggle('escondido');
    });

    document.getElementById('btn-toggle-som-jogo').addEventListener('click', () => {
        tocarSom(somMenu);
        toggleSomGlobal();
    });

    document.getElementById('btn-voltar-menu').addEventListener('click', () => {
        tocarSom(somMenu);
        location.reload();
    });

    document.getElementById('btn-reiniciar-fase').addEventListener('click', () => {
        tocarSom(somMenu);
        painelOpcoes.classList.add('escondido');

        // Verifica qual cena está rodando e dispara o evento correto
        if (document.getElementById('tela1').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTela1'));
        } else if (document.getElementById('tela2').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTela2'));
        } else if (document.getElementById('tela3-aluno') && document.getElementById('tela3-aluno').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTelaAluno'));
        } else if (document.getElementById('tela4-aluno') && document.getElementById('tela4-aluno').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTelaAluno2'));
        }
    });
});
