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
const somConselho = new Audio('assets/sounds/sound_sala_do_conselho.mp3');

bgmTela1.loop = true;
let somLigado = true;
let volumeGlobal = 0.5;
const preferenciasAcessibilidade = {
    textoMaior: false,
    altoContraste: false,
    reduzirMovimento: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    textoInstantaneo: false
};

function aplicarVolumeGlobal() {
    somMenu.volume = volumeGlobal;
    somTela.volume = volumeGlobal;
    bgmTela1.volume = volumeGlobal * 0.4;
    somBiblioteca.volume = volumeGlobal * 0.6;
    somConselho.volume = volumeGlobal * 0.6;

    document.querySelectorAll('.volume-global').forEach(controle => controle.value = Math.round(volumeGlobal * 100));
    document.querySelectorAll('output[id^="valor-volume"]').forEach(saida => atualizarSaidaVolume(saida));
}

function atualizarSaidaVolume(saida) {
    saida.value = `${Math.round(volumeGlobal * 100)}%`;
    saida.textContent = `${Math.round(volumeGlobal * 100)}%`;
}

function atualizarTextoSom() {
    const texto = somLigado && volumeGlobal > 0 ? "Som: Ligado" : "Som: Desligado";
    const btnConfigMenu = document.getElementById('btn-config');
    const btnConfigSanduiche = document.getElementById('btn-toggle-som-jogo');
    if (btnConfigMenu) btnConfigMenu.innerText = texto;
    if (btnConfigSanduiche) btnConfigSanduiche.innerText = texto;
}

function deveExibirTextoInstantaneamente() {
    return preferenciasAcessibilidade.textoInstantaneo || preferenciasAcessibilidade.reduzirMovimento;
}

function retomarMusicaAtiva() {
    if (document.getElementById('tela1').classList.contains('cena-ativa') ||
        document.getElementById('tela2').classList.contains('cena-ativa')) {
        bgmTela1.play().catch(e => console.log(e));
    } else if (document.getElementById('tela5-conselho') && document.getElementById('tela5-conselho').classList.contains('cena-ativa')) {
        somConselho.play().catch(e => console.log(e));
    } else if ((document.getElementById('tela3-aluno') && document.getElementById('tela3-aluno').classList.contains('cena-ativa')) ||
               (document.getElementById('tela4-aluno') && document.getElementById('tela4-aluno').classList.contains('cena-ativa'))) {
        somBiblioteca.play().catch(e => console.log(e));
    }
}

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
    if (!somLigado && volumeGlobal === 0) {
        volumeGlobal = 0.5;
        aplicarVolumeGlobal();
    }
    somLigado = !somLigado;
    atualizarTextoSom();

    // Controla a música de fundo dependendo da tela ativa
    if (!somLigado) {
        bgmTela1.pause();
        somBiblioteca.pause();
        somConselho.pause();
    } else {
        retomarMusicaAtiva();
    }
}

// INICIALIZAÇÃO DE EVENTOS
document.addEventListener('DOMContentLoaded', () => {

    aplicarVolumeGlobal();
    aplicarPreferenciasAcessibilidade();

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
    const btnSanduiche = document.getElementById('btn-sanduiche');

    document.getElementById('btn-sanduiche').addEventListener('click', () => {
        tocarSom(somTela);
        painelOpcoes.classList.toggle('escondido');
        btnSanduiche.setAttribute('aria-expanded', String(!painelOpcoes.classList.contains('escondido')));
    });

    document.getElementById('btn-toggle-som-jogo').addEventListener('click', () => {
        tocarSom(somMenu);
        toggleSomGlobal();
    });

    document.querySelectorAll('.volume-global').forEach(controle => {
        controle.addEventListener('input', e => {
            const estavaMudo = !somLigado;
            volumeGlobal = Number(e.currentTarget.value) / 100;
            somLigado = volumeGlobal > 0;
            aplicarVolumeGlobal();
            atualizarTextoSom();
            if (!somLigado) {
                bgmTela1.pause();
                somBiblioteca.pause();
                somConselho.pause();
            } else if (estavaMudo) {
                retomarMusicaAtiva();
            }
        });
    });

    configurarAcessibilidade();

    document.getElementById('btn-voltar-menu').addEventListener('click', () => {
        tocarSom(somMenu);
        location.reload();
    });

    document.getElementById('btn-reiniciar-fase').addEventListener('click', () => {
        tocarSom(somMenu);
        document.getElementById('painel-opcoes').classList.add('escondido');

        // Verifica qual cena está rodando e dispara o evento correto
        if (document.getElementById('tela1').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTela1'));
        } else if (document.getElementById('tela2').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTela2'));
        } else if (document.getElementById('tela3-aluno') && document.getElementById('tela3-aluno').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTelaAluno'));
        } else if (document.getElementById('tela4-aluno') && document.getElementById('tela4-aluno').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTelaAluno2'));
        } else if (document.getElementById('tela5-conselho') && document.getElementById('tela5-conselho').classList.contains('cena-ativa')) {
            document.dispatchEvent(new Event('reiniciarTelaConselho'));
        }
    });
});

function configurarAcessibilidade() {
    const modal = document.getElementById('modal-acessibilidade');
    const abrir = () => {
        tocarSom(somMenu);
        modal.classList.remove('escondido');
        document.getElementById('btn-texto-maior').focus();
    };
    const fechar = () => {
        tocarSom(somMenu);
        modal.classList.add('escondido');
    };

    document.getElementById('btn-acessibilidade-menu').addEventListener('click', abrir);
    document.getElementById('btn-acessibilidade-jogo').addEventListener('click', abrir);
    document.getElementById('btn-fechar-acessibilidade').addEventListener('click', fechar);

    const controles = {
        'btn-texto-maior': ['textoMaior', 'Texto ampliado'],
        'btn-alto-contraste': ['altoContraste', 'Alto contraste'],
        'btn-reduzir-movimento': ['reduzirMovimento', 'Reduzir movimento'],
        'btn-texto-instantaneo': ['textoInstantaneo', 'Texto instantâneo']
    };

    Object.entries(controles).forEach(([id, [chave, rotulo]]) => {
        document.getElementById(id).addEventListener('click', e => {
            preferenciasAcessibilidade[chave] = !preferenciasAcessibilidade[chave];
            aplicarPreferenciasAcessibilidade();
            e.currentTarget.focus();
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        document.getElementById('modal-instrucoes').classList.add('escondido');
        modal.classList.add('escondido');
        painelOpcoes.classList.add('escondido');
        document.getElementById('btn-sanduiche').setAttribute('aria-expanded', 'false');
    });
}

function aplicarPreferenciasAcessibilidade() {
    document.body.classList.toggle('texto-maior', preferenciasAcessibilidade.textoMaior);
    document.body.classList.toggle('alto-contraste', preferenciasAcessibilidade.altoContraste);
    document.body.classList.toggle('reduzir-movimento', preferenciasAcessibilidade.reduzirMovimento);

    const controles = {
        'btn-texto-maior': ['textoMaior', 'Texto ampliado'],
        'btn-alto-contraste': ['altoContraste', 'Alto contraste'],
        'btn-reduzir-movimento': ['reduzirMovimento', 'Reduzir movimento'],
        'btn-texto-instantaneo': ['textoInstantaneo', 'Texto instantâneo']
    };

    Object.entries(controles).forEach(([id, [chave, rotulo]]) => {
        const botao = document.getElementById(id);
        if (!botao) return;
        const ativo = preferenciasAcessibilidade[chave];
        botao.setAttribute('aria-pressed', String(ativo));
        botao.innerText = `${rotulo}: ${ativo ? 'sim' : 'não'}`;
    });
}
