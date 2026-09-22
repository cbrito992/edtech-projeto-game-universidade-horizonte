let roteiroJornada;
let passosJornada = [];
let indiceJornada = 0;
let atoAtual = 1;
let maquinaJornada;
let maquinaConselhoAtos;
let linhasConselho = [];
let indiceConselhoAtos = 0;
let aposTransicao;
let transicaoEmAndamento = false;
const digitacoesAtivas = new Map();

function preencherNome(texto) {
    return String(texto || '').replace(/{nome}/g, jogador.nome || 'Visitante');
}

function escreverTexto(elemento, conteudo, atualizarMaquina) {
    const anterior = digitacoesAtivas.get(elemento);
    if (anterior) clearTimeout(anterior.temporizador);
    digitacoesAtivas.delete(elemento);
    atualizarMaquina(null);
    elemento.classList.remove('fala-em-fade');
    elemento.textContent = conteudo;
    if (deveExibirTextoInstantaneamente()) {
        return;
    }
    // Reinicia a animação também quando duas falas seguidas usam o mesmo elemento.
    void elemento.offsetWidth;
    elemento.classList.add('fala-em-fade');
    const temporizador = setTimeout(() => {
        digitacoesAtivas.delete(elemento);
        atualizarMaquina(null);
    }, 950);
    digitacoesAtivas.set(elemento, { conteudo, temporizador, atualizarMaquina });
    atualizarMaquina(temporizador);
}

function completarDigitacao(elemento) {
    const digitacao = digitacoesAtivas.get(elemento);
    if (!digitacao) return false;
    clearTimeout(digitacao.temporizador);
    elemento.textContent = digitacao.conteudo;
    elemento.classList.remove('fala-em-fade');
    digitacao.atualizarMaquina(null);
    digitacoesAtivas.delete(elemento);
    return true;
}

function escreverJornada(elemento, conteudo) {
    clearTimeout(maquinaJornada);
    escreverTexto(elemento, conteudo, temporizador => { maquinaJornada = temporizador; });
}

function escreverConselho(elemento, conteudo) {
    clearTimeout(maquinaConselhoAtos);
    escreverTexto(elemento, conteudo, temporizador => { maquinaConselhoAtos = temporizador; });
}

function mostrarTransicaoAto(titulo, subtitulo, callback) {
    if (transicaoEmAndamento) return;
    transicaoEmAndamento = true;
    const tela = document.getElementById('tela-transicao-ato1');
    const cortina = document.getElementById('cortina-transicao-ato');
    const subtituloEl = document.getElementById('texto-transicao-ato');
    const botao = document.getElementById('btn-iniciar-ato1');
    const movimentoReduzido = preferenciasAcessibilidade.reduzirMovimento;
    document.getElementById('titulo-ato1').textContent = titulo;
    subtituloEl.textContent = subtitulo;
    subtituloEl.classList.toggle('escondido', !subtitulo);
    botao.textContent = titulo === 'Ato I' ? 'Começar ato' : 'Continuar';
    botao.disabled = true;
    document.getElementById('menu-persistente').classList.add('escondido');
    aposTransicao = callback;

    // Escurece a cena atual antes de revelar o cartão do ato.
    cortina.classList.add('cortina-visivel');
    setTimeout(() => {
        document.querySelectorAll('.tela.cena-ativa').forEach(cena => {
            if (cena === tela) return;
            cena.classList.remove('cena-ativa', 'fade-in', 'fade-out');
            cena.classList.add('escondido');
        });
        tela.classList.remove('escondido', 'saindo-transicao-ato', 'transicao-ato-pronta');
        tela.classList.add('cena-ativa');

        requestAnimationFrame(() => {
            cortina.classList.remove('cortina-visivel');
            tela.classList.add('transicao-ato-pronta');
        });

        setTimeout(() => {
            botao.disabled = false;
            botao.focus();
            transicaoEmAndamento = false;
        }, movimentoReduzido ? 0 : 1750);
    }, movimentoReduzido ? 0 : 700);
}

document.getElementById('btn-iniciar-ato1').addEventListener('click', () => {
    if (transicaoEmAndamento || !aposTransicao) return;
    transicaoEmAndamento = true;
    tocarSom(somMenu);
    const tela = document.getElementById('tela-transicao-ato1');
    const cortina = document.getElementById('cortina-transicao-ato');
    const botao = document.getElementById('btn-iniciar-ato1');
    const movimentoReduzido = preferenciasAcessibilidade.reduzirMovimento;
    botao.disabled = true;
    tela.classList.add('saindo-transicao-ato');
    cortina.classList.add('cortina-visivel');

    setTimeout(() => {
        tela.classList.remove('cena-ativa', 'transicao-ato-pronta', 'saindo-transicao-ato');
        tela.classList.add('escondido');
        const callback = aposTransicao;
        aposTransicao = null;
        if (callback) callback();
        document.getElementById('menu-persistente').classList.remove('escondido');
        requestAnimationFrame(() => cortina.classList.remove('cortina-visivel'));
        transicaoEmAndamento = false;
    }, movimentoReduzido ? 0 : 750);
});

function ocultarPaineisJornada() {
    ['painel-decisao-atos', 'painel-recurso-atos', 'painel-atividade-atos'].forEach(id => {
        document.getElementById(id).classList.add('escondido');
    });
}

function iniciarAto(numero) {
    atoAtual = numero;
    const cena = document.getElementById('tela-caminho-atos');
    cena.style.backgroundImage = `url("${numero === 1 ? roteiroJornada.fundo1 : roteiroJornada.fundo2}")`;
    cena.classList.remove('escondido');
    cena.classList.add('cena-ativa', 'fade-in');
    const companheiro = document.getElementById('npc-companheiro-atos');
    companheiro.src = roteiroJornada.avatar;
    companheiro.alt = roteiroJornada.companheiro;
    document.getElementById('npc-player-atos').src = `assets/images/player_${jogador.genero}.png`;

    const dados = numero === 1 ? roteiroJornada.ato1 : roteiroJornada.ato2;
    const lembranca = numero === 2
        ? [{ nome: roteiroJornada.companheiro, texto: dados.retorno[jogador.escolhas.ato1] }]
        : [];
    passosJornada = [...lembranca, ...dados.antes, { tipo: 'decisao' }];
    indiceJornada = 0;
    somBiblioteca.loop = true;
    aplicarVolumeGlobal();
    if (somLigado) somBiblioteca.play().catch(() => {});
    carregarPassoJornada();
}

function carregarPassoJornada() {
    const passo = passosJornada[indiceJornada];
    if (!passo) return;
    if (passo.tipo === 'fimAto') {
        if (atoAtual === 1) {
            somBiblioteca.pause();
            mostrarTransicaoAto('Ato II', 'Três meses depois...', () => iniciarAto(2));
        } else {
            const cortina = document.getElementById('cortina-transicao-ato');
            cortina.classList.add('cortina-visivel');
            setTimeout(() => {
                iniciarConselhoAtos();
                requestAnimationFrame(() => cortina.classList.remove('cortina-visivel'));
            }, preferenciasAcessibilidade.reduzirMovimento ? 0 : 900);
        }
        return;
    }
    ocultarPaineisJornada();
    const caixa = document.getElementById('caixa-dialogo-atos');
    caixa.classList.add('escondido');
    document.getElementById('npc-companheiro-atos').classList.add('escondido');
    document.getElementById('npc-player-atos').classList.add('escondido');

    if (passo.tipo === 'decisao') {
        mostrarDecisaoJornada();
        return;
    }
    if (passo.recurso) {
        mostrarRecursoAtos(passo.recurso);
        return;
    }
    if (passo.atividade) {
        mostrarAtividadeAtos(passo.atividade);
        return;
    }

    caixa.classList.remove('escondido');
    const nome = preencherNome(passo.nome);
    const elNome = document.getElementById('nome-falante-atos');
    elNome.textContent = nome;
    elNome.classList.toggle('escondido', !nome);
    if (nome) {
        if (nome === roteiroJornada.companheiro) document.getElementById('npc-companheiro-atos').classList.remove('escondido');
        if (nome === jogador.nome) document.getElementById('npc-player-atos').classList.remove('escondido');
    }
    escreverJornada(document.getElementById('texto-narrativa-atos'), preencherNome(passo.texto));
    document.getElementById('btn-avancar-atos').textContent = passosJornada[indiceJornada + 1]?.tipo === 'fimAto' ? 'Encerrar ato' : 'Avançar';
}

function mostrarDecisaoJornada() {
    const ato = atoAtual === 1 ? roteiroJornada.ato1 : roteiroJornada.ato2;
    const painel = document.getElementById('painel-decisao-atos');
    const lista = document.getElementById('opcoes-decisao-atos');
    document.getElementById('pergunta-decisao-atos').textContent = ato.pergunta;
    lista.replaceChildren();
    ato.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-escolha';
        botao.textContent = opcao.texto;
        botao.addEventListener('click', () => {
            tocarSom(somMenu);
            jogador.escolhas[`ato${atoAtual}`] = opcao.id;
            passosJornada.splice(indiceJornada + 1, 0, ...opcao.passos, { tipo: 'fimAto' });
            indiceJornada++;
            carregarPassoJornada();
        });
        lista.appendChild(botao);
    });
    painel.classList.remove('escondido');
    lista.querySelector('button')?.focus();
}

function mostrarRecursoAtos(chave) {
    const recurso = recursosAtos[chave];
    const painel = document.getElementById('painel-recurso-atos');
    const frame = document.getElementById('iframe-recurso-atos');
    const pontos = document.getElementById('pontos-recurso-atos');
    document.getElementById('titulo-recurso-atos').textContent = recurso.titulo;
    document.getElementById('descricao-recurso-atos').textContent = recurso.descricao;
    pontos.replaceChildren();
    (recurso.pontos || []).forEach(texto => {
        const item = document.createElement('li');
        item.textContent = texto;
        pontos.appendChild(item);
    });
    pontos.classList.toggle('escondido', !recurso.pontos);
    frame.classList.toggle('escondido', !recurso.video);
    frame.src = recurso.video || '';
    const link = document.getElementById('link-recurso-atos');
    link.href = recurso.url;
    link.textContent = recurso.video ? 'Abrir vídeo em outra aba' : 'Ler material completo em outra aba';
    painel.classList.remove('escondido');
    if (recurso.video) somBiblioteca.pause();
    document.getElementById('btn-continuar-recurso-atos').focus();
}

function mostrarAtividadeAtos(atividade) {
    const painel = document.getElementById('painel-atividade-atos');
    const lista = document.getElementById('opcoes-atividade-atos');
    document.getElementById('pergunta-atividade-atos').textContent = atividade.pergunta;
    document.getElementById('retorno-atividade-atos').textContent = '';
    document.getElementById('btn-continuar-atividade-atos').classList.add('escondido');
    lista.replaceChildren();
    atividade.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-escolha';
        botao.textContent = opcao.texto;
        botao.addEventListener('click', () => {
            tocarSom(somTela);
            document.getElementById('retorno-atividade-atos').textContent = opcao.retorno;
            if (opcao.adequada) {
                lista.querySelectorAll('button').forEach(b => { b.disabled = true; });
                const continuar = document.getElementById('btn-continuar-atividade-atos');
                continuar.classList.remove('escondido');
                continuar.focus();
            }
        });
        lista.appendChild(botao);
    });
    painel.classList.remove('escondido');
    lista.querySelector('button')?.focus();
}

function avancarJornada() {
    indiceJornada++;
    carregarPassoJornada();
}

document.getElementById('btn-avancar-atos').addEventListener('click', () => {
    tocarSom(somTela);
    if (completarDigitacao(document.getElementById('texto-narrativa-atos'))) return;
    avancarJornada();
});
document.getElementById('btn-continuar-recurso-atos').addEventListener('click', () => {
    tocarSom(somMenu);
    document.getElementById('iframe-recurso-atos').src = '';
    if (somLigado) somBiblioteca.play().catch(() => {});
    avancarJornada();
});
document.getElementById('btn-continuar-atividade-atos').addEventListener('click', () => {
    tocarSom(somMenu);
    avancarJornada();
});

document.addEventListener('iniciarJogoAtos', () => {
    roteiroJornada = roteirosAtos[jogador.classeID];
    if (!roteiroJornada) return;
    jogador.escolhas = {};
    jogador.finalLiberado = '';
    iniciarAto(1);
});

document.addEventListener('reiniciarJogoAtos', () => {
    clearTimeout(maquinaJornada);
    document.getElementById('iframe-recurso-atos').src = '';
    if (atoAtual === 1) {
        delete jogador.escolhas.ato1;
        delete jogador.escolhas.ato2;
    } else {
        delete jogador.escolhas.ato2;
    }
    jogador.finalLiberado = '';
    iniciarAto(atoAtual);
});

const memoriaConselho = {
    estagiario: {
        ato1: {
            auditavel: 'O primeiro piloto foi acompanhado de perto; isso ajudou a conhecer limites, embora tenha demorado a chegar a toda a comunidade.',
            amplo: 'A abertura ampla trouxe demandas reais, mas exigiu conter problemas de suporte e dados antes de continuar.',
            adiar: 'O adiamento revelou desigualdade fora da rede institucional; o comitê abriu um piloto acessível depois de ouvir a comunidade.'
        },
        ato2: {
            negociar: 'Na proposta da fornecedora, você exigiu condições verificáveis para dados e continuidade.',
            aceitar: 'A continuidade imediata levou a uma revisão urgente dos termos de uso.',
            interna: 'A busca por autonomia tecnológica precisou ser combinada com um serviço provisório viável.'
        }
    },
    gestor: {
        ato1: {
            processo: 'A orientação para demonstrar processo ajudou a distinguir apoio da substituição do trabalho intelectual.',
            produto: 'Ao priorizar o texto entregue, você descobriu a necessidade de pedir evidências de compreensão.',
            restricao: 'Os limites iniciais foram ajustados para não confundir acessibilidade com produção substitutiva.'
        },
        ato2: {
            verificar: 'A verificação coletiva impediu que referências inventadas entrassem no artigo.',
            prazo: 'A entrega com referências não verificadas exigiu uma correção pública com o grupo.',
            refazer: 'A retirada da seção abriu um conflito que precisou de mediação e revisão em conjunto.'
        }
    },
    professor: {
        ato1: {
            autentica: 'O redesenho das atividades revelou como os estudantes aplicam e justificam o conhecimento.',
            presencial: 'As etapas presenciais deram evidências úteis, depois combinadas à investigação digital.',
            detector: 'A confiança da turma foi abalada por sinais de um detector, e os critérios precisaram ser reconstruídos.'
        },
        ato2: {
            conjunto: 'A resposta à revista reconheceu responsabilidades e abriu uma revisão do método.',
            individual: 'O foco inicial na estudante precisou se ampliar para incluir a orientação e a instituição.',
            revisao: 'A tentativa de corrigir somente os números revelou uma falha maior, que exigiu comunicação formal.'
        }
    }
};

const propostasConselho = [
    {
        chave: 'A',
        texto: 'Ampliar o programa por etapas, garantindo acesso, suporte humano e acompanhamento público dos resultados.',
        fala: 'Quero ampliar o acesso com apoio real, alternativas equivalentes e revisão dos efeitos em cada etapa.'
    },
    {
        chave: 'B',
        texto: 'Priorizar mediação humana e formação, com usos da IA delimitados por objetivos pedagógicos claros.',
        fala: 'Quero dar tempo e condições para que pessoas orientem as escolhas pedagógicas antes de cada ampliação.'
    },
    {
        chave: 'C',
        texto: 'Instituir uma política de uso transparente, com verificação, limites para dados e participação da comunidade.',
        fala: 'Quero tornar as decisões verificáveis: declarar processos, conferir evidências e permitir contestação.'
    }
];

const respostasConselho = {
    estagiario: {
        A: 'Podemos ampliar, desde que suporte, critérios de acesso e condições do contrato cresçam junto com o serviço.',
        B: 'Precisaremos de equipes disponíveis para ajudar quem encontra dificuldades, inclusive fora do laboratório.',
        C: 'Documentar dados, custos e falhas nos permite corrigir o projeto antes que uma decisão provisória vire dependência permanente.'
    },
    gestor: {
        A: 'Mais estudantes terão acesso, mas o acompanhamento precisa alcançar também quem aprende por caminhos diferentes.',
        B: 'Quero poder conversar com pessoas sobre o que compreendi, sem perder os apoios que tornam o estudo possível.',
        C: 'Mostrar as fontes e o processo ajuda a reconhecer a colaboração sem tratar uma resposta pronta como prova de aprendizagem.'
    },
    professor: {
        A: 'A ampliação só fará sentido se as disciplinas receberem tempo para redesenhar avaliações e examinar os resultados.',
        B: 'A presença docente exige condições de trabalho, formação e abertura para novas práticas de pesquisa.',
        C: 'Critérios transparentes permitem corrigir falhas de orientação sem terceirizar nosso julgamento a detectores.'
    }
};

function iniciarConselhoAtos() {
    somBiblioteca.pause();
    const cena = document.getElementById('tela-caminho-atos');
    cena.classList.remove('cena-ativa', 'fade-in');
    cena.classList.add('escondido');
    const conselho = document.getElementById('tela5-conselho');
    conselho.classList.remove('escondido');
    conselho.classList.add('cena-ativa', 'fade-in');
    document.getElementById('npc-player-conselho').src = `assets/images/player_${jogador.genero}.png`;
    document.getElementById('painel-final-aluno').classList.add('escondido');
    document.getElementById('painel-decisao-conselho').classList.add('escondido');
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    somConselho.loop = true;
    somConselho.currentTime = 0;
    aplicarVolumeGlobal();
    if (somLigado) somConselho.play().catch(() => {});

    const memoria = memoriaConselho[jogador.classeID];
    linhasConselho = [
        { nome: '', texto: 'Sala do Conselho da Universidade Horizonte. Três meses de decisões e correções estão reunidos nesta mesa.' },
        { nome: 'REITORA HELENA', texto: 'Quero ouvir o que aconteceu em cada etapa. O tempo decorrido também é parte das consequências das nossas escolhas.' },
        { nome: roteiroJornada.companheiro, texto: memoria.ato1[jogador.escolhas.ato1] },
        { nome: roteiroJornada.companheiro, texto: memoria.ato2[jogador.escolhas.ato2] },
        { nome: 'REITORA HELENA', texto: 'Agora precisamos escolher um compromisso para os próximos passos. Cada prioridade oferece possibilidades e exige responsabilidades.' }
    ];
    indiceConselhoAtos = 0;
    carregarFalaConselhoAtos();
}

function mostrarAvatarConselhoAtos(nome) {
    document.querySelectorAll('.npc-conselho').forEach(avatar => avatar.classList.add('escondido'));
    const ids = {
        'REITORA HELENA': 'npc-helena-conselho',
        'LÍVIA': 'npc-livia-conselho',
        'PROFESSOR AUGUSTO': 'npc-augusto-conselho',
        'NICODEMOS': 'npc-nicodemos-conselho'
    };
    const id = nome === jogador.nome ? 'npc-player-conselho' : ids[nome];
    if (id) document.getElementById(id).classList.remove('escondido');
}

function carregarFalaConselhoAtos() {
    const linha = linhasConselho[indiceConselhoAtos];
    if (!linha) {
        if (!jogador.finalLiberado) mostrarDecisaoConselho();
        else mostrarFinalAtos();
        return;
    }
    const nome = preencherNome(linha.nome);
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    const elNome = document.getElementById('nome-falante-conselho');
    elNome.textContent = nome;
    elNome.classList.toggle('escondido', !nome);
    mostrarAvatarConselhoAtos(nome);
    escreverConselho(document.getElementById('texto-narrativa-conselho'), preencherNome(linha.texto));
    document.getElementById('btn-avancar-conselho').textContent = indiceConselhoAtos === linhasConselho.length - 1 && jogador.finalLiberado
        ? 'Conhecer o futuro' : 'Avançar';
}

function mostrarDecisaoConselho() {
    document.getElementById('caixa-dialogo-conselho').classList.add('escondido');
    mostrarAvatarConselhoAtos('');
    const painel = document.getElementById('painel-decisao-conselho');
    const lista = document.getElementById('opcoes-decisao-conselho');
    lista.replaceChildren();
    propostasConselho.forEach(opcao => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-escolha';
        botao.textContent = opcao.texto;
        botao.addEventListener('click', () => {
            tocarSom(somMenu);
            jogador.escolhas.conselho = opcao.chave;
            jogador.finalLiberado = opcao.chave;
            painel.classList.add('escondido');
            linhasConselho.push(
                { nome: '{nome}', texto: opcao.fala },
                { nome: roteiroJornada.companheiro, texto: respostasConselho[jogador.classeID][opcao.chave] },
                { nome: 'REITORA HELENA', texto: 'A universidade assume essa prioridade e a revisará com evidências, diálogo e participação da comunidade.' }
            );
            indiceConselhoAtos++;
            carregarFalaConselhoAtos();
        });
        lista.appendChild(botao);
    });
    painel.classList.remove('escondido');
    lista.querySelector('button')?.focus();
}

function mostrarFinalAtos() {
    clearTimeout(maquinaConselhoAtos);
    mostrarAvatarConselhoAtos('');
    document.getElementById('caixa-dialogo-conselho').classList.add('escondido');
    const final = desfechosAtos[jogador.finalLiberado];
    document.getElementById('titulo-final-aluno').textContent = final.titulo;
    document.getElementById('texto-final-aluno').textContent = final.texto;
    document.getElementById('painel-final-aluno').classList.remove('escondido');
    document.getElementById('btn-recomecar-aluno').focus();
}

document.getElementById('btn-avancar-conselho').addEventListener('click', () => {
    tocarSom(somTela);
    if (completarDigitacao(document.getElementById('texto-narrativa-conselho'))) return;
    indiceConselhoAtos++;
    carregarFalaConselhoAtos();
});
document.getElementById('btn-recomecar-aluno').addEventListener('click', () => location.reload());
document.addEventListener('reiniciarConselhoAtos', iniciarConselhoAtos);
