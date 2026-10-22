let roteiroJornada;
let passosJornada = [];
let indiceJornada = 0;
let indiceDecisaoJornada = -1;
let escolhaJornadaEmProcessamento = false;
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

function obterRamoNarrativo(classe = jogador.classeID, ato1 = jogador.escolhas.ato1, ato2 = jogador.escolhas.ato2) {
    return arvoreNarrativa?.[classe]?.[ato1]?.[ato2] || null;
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
    const fundosTransicao = {
        'Ato I': 'assets/images/background_transicao_ato1.webp',
        'Ato II': 'assets/images/background_transicao_ato2.webp',
        'Conselho': 'assets/images/background_transicao_ato3.webp'
    };
    const fundoTransicao = fundosTransicao[titulo] || fundosTransicao['Ato I'];
    tela.style.backgroundImage = `url("${fundoTransicao}")`;
    tela.classList.toggle('transicao-titulo-longo', titulo.length > 6);
    document.getElementById('titulo-ato1').textContent = titulo;
    subtituloEl.textContent = subtitulo;
    subtituloEl.classList.toggle('escondido', !subtitulo);
    botao.textContent = titulo === 'Ato I' ? 'Começar ato' : titulo === 'Conselho' ? 'Entrar no Conselho' : 'Continuar';
    botao.disabled = true;
    document.getElementById('menu-persistente').classList.add('escondido');
    document.getElementById('btn-acessibilidade-flutuante').classList.add('escondido');
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
    // O play nasce do gesto do usuário; isso evita bloqueio de áudio móvel
    // quando a cena seguinte só é ativada após o tempo do fade.
    if (somLigado && document.getElementById('titulo-ato1').textContent !== 'Conselho') {
        somBiblioteca.play().catch(() => {});
    }
    tela.classList.add('saindo-transicao-ato');
    cortina.classList.add('cortina-visivel');

    setTimeout(() => {
        tela.classList.remove('cena-ativa', 'transicao-ato-pronta', 'saindo-transicao-ato');
        tela.classList.add('escondido');
        const callback = aposTransicao;
        aposTransicao = null;
        if (callback) callback();
        document.getElementById('menu-persistente').classList.remove('escondido');
        document.getElementById('btn-acessibilidade-flutuante').classList.remove('escondido');
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
    const caminhoFundo = numero === 1 ? roteiroJornada.fundo1 : roteiroJornada.fundo2;
    cena.style.backgroundImage = `url("${encodeURI(caminhoFundo)}")`;
    cena.classList.remove('escondido');
    cena.classList.add('cena-ativa', 'fade-in');
    const companheiro = document.getElementById('npc-companheiro-atos');
    companheiro.src = roteiroJornada.avatar;
    companheiro.alt = roteiroJornada.companheiro;
    document.getElementById('npc-player-atos').src = caminhoAvatarJogador();

    const dados = numero === 1 ? roteiroJornada.ato1 : roteiroJornada.ato2;
    const lembranca = numero === 2
        ? [{ nome: roteiroJornada.companheiro, texto: dados.retorno[jogador.escolhas.ato1] }]
        : [];
    passosJornada = [...lembranca, ...dados.antes, { tipo: 'decisao' }];
    indiceJornada = 0;
    indiceDecisaoJornada = passosJornada.length - 1;
    escolhaJornadaEmProcessamento = false;
    document.getElementById('btn-voltar-decisao-atos').classList.add('escondido');
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
            somBiblioteca.pause();
            mostrarTransicaoAto(
                'Conselho',
                'As escolhas feitas agora encontram outras perspectivas.',
                iniciarConselhoAtos
            );
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
    escolhaJornadaEmProcessamento = false;
    ato.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-escolha';
        botao.textContent = opcao.texto;
        botao.addEventListener('click', () => {
            if (escolhaJornadaEmProcessamento) return;
            escolhaJornadaEmProcessamento = true;
            tocarSom(somMenu);
            jogador.escolhas[`ato${atoAtual}`] = opcao.id;
            const passosEscolhidos = [...opcao.passos];
            if (atoAtual === 2) {
                const ramo = obterRamoNarrativo(jogador.classeID, jogador.escolhas.ato1, opcao.id);
                if (ramo) passosEscolhidos.unshift({ nome: roteiroJornada.companheiro, texto: ramo.consequencia });
            }
            const chaveAto = `ato${atoAtual}`;
            const chaveNivelamento = nivelamentoPorEscolha[jogador.classeID]?.[chaveAto]?.[opcao.id];
            const vistos = jogador.escolhas.nivelamentos || [];
            if (chaveNivelamento && !vistos.includes(chaveNivelamento)) {
                // Primeiro vemos uma consequência; depois o jogo oferece outra lente para a situação.
                passosEscolhidos.splice(Math.min(1, passosEscolhidos.length), 0, { recurso: chaveNivelamento });
            }
            // Reconstrói o ramo em vez de inseri-lo. Assim, escolhas anteriores nunca
            // deixam passos ou marcadores de fim duplicados após várias revisões.
            passosJornada = [
                ...passosJornada.slice(0, indiceDecisaoJornada + 1),
                ...passosEscolhidos,
                { tipo: 'fimAto' }
            ];
            document.getElementById('btn-voltar-decisao-atos').classList.remove('escondido');
            indiceJornada = indiceDecisaoJornada + 1;
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
    const rotulo = painel.querySelector('.rotulo-jornada');
    rotulo.textContent = recurso.nivelamento ? 'AMPLIE SUA PERSPECTIVA' : 'ARQUIVO DE INVESTIGAÇÃO';
    painel.classList.toggle('recurso-nivelamento', Boolean(recurso.nivelamento));
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
    if (recurso.nivelamento) {
        const vistos = (jogador.escolhas.nivelamentos ||= []);
        if (!vistos.includes(chave)) vistos.push(chave);
    }
    if (recurso.video) somBiblioteca.pause();
    document.getElementById('btn-continuar-recurso-atos').focus();
}

function mostrarAtividadeAtos(atividade) {
    const painel = document.getElementById('painel-atividade-atos');
    const lista = document.getElementById('opcoes-atividade-atos');
    document.getElementById('pergunta-atividade-atos').textContent = atividade.pergunta;
    lista.replaceChildren();
    atividade.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-escolha';
        botao.textContent = opcao.texto;
        botao.addEventListener('click', () => {
            tocarSom(somTela);
            (jogador.escolhas.atividades ||= {})[`ato${atoAtual}-${indiceJornada}`] = opcao.texto;
            if (!opcao.adequada && passosJornada[indiceJornada + 1]?.texto) {
                const proximo = passosJornada[indiceJornada + 1];
                passosJornada[indiceJornada + 1] = {
                    ...proximo,
                    texto: `A equipe seguiu a proposta escolhida: “${opcao.texto}” ${opcao.retorno} Essas questões permanecem em aberto para a próxima etapa.`
                };
            }
            botao.classList.add('selecionado');
            lista.querySelectorAll('button').forEach(b => { b.disabled = true; });
            encerrarJanelaDeRevisao();
            setTimeout(avancarJornada, preferenciasAcessibilidade.reduzirMovimento ? 0 : 350);
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

function encerrarJanelaDeRevisao() {
    document.getElementById('btn-voltar-decisao-atos').classList.add('escondido');
}

document.getElementById('btn-avancar-atos').addEventListener('click', () => {
    tocarSom(somTela);
    if (completarDigitacao(document.getElementById('texto-narrativa-atos'))) return;
    encerrarJanelaDeRevisao();
    avancarJornada();
});
document.getElementById('btn-continuar-recurso-atos').addEventListener('click', () => {
    tocarSom(somMenu);
    encerrarJanelaDeRevisao();
    document.getElementById('iframe-recurso-atos').src = '';
    if (somLigado) somBiblioteca.play().catch(() => {});
    avancarJornada();
});
document.getElementById('btn-voltar-decisao-atos').addEventListener('click', () => {
    tocarSom(somMenu);
    clearTimeout(maquinaJornada);
    document.getElementById('iframe-recurso-atos').src = '';
    if (somLigado) somBiblioteca.play().catch(() => {});

    const chaveAto = `ato${atoAtual}`;
    const escolhaAnterior = jogador.escolhas[chaveAto];
    const nivelamentoAnterior = nivelamentoPorEscolha[jogador.classeID]?.[chaveAto]?.[escolhaAnterior];
    delete jogador.escolhas[chaveAto];
    if (nivelamentoAnterior && jogador.escolhas.nivelamentos) {
        jogador.escolhas.nivelamentos = jogador.escolhas.nivelamentos
            .filter(chave => chave !== nivelamentoAnterior);
    }
    if (jogador.escolhas.atividades) {
        Object.keys(jogador.escolhas.atividades)
            .filter(chave => chave.startsWith(`${chaveAto}-`))
            .forEach(chave => delete jogador.escolhas.atividades[chave]);
    }

    const dados = atoAtual === 1 ? roteiroJornada.ato1 : roteiroJornada.ato2;
    const lembranca = atoAtual === 2
        ? [{ nome: roteiroJornada.companheiro, texto: dados.retorno[jogador.escolhas.ato1] }]
        : [];
    passosJornada = [...lembranca, ...dados.antes, { tipo: 'decisao' }];
    indiceDecisaoJornada = passosJornada.length - 1;
    indiceJornada = indiceDecisaoJornada;
    escolhaJornadaEmProcessamento = false;
    document.getElementById('btn-voltar-decisao-atos').classList.add('escondido');
    carregarPassoJornada();
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
    "estagiario": {
        "ato1": {
            "auditavel": "O primeiro piloto foi acompanhado de perto; isso ajudou a conhecer limites, embora tenha demorado a chegar a toda a comunidade.",
            "amplo": "A abertura ampla trouxe demandas reais, mas exigiu conter problemas de suporte e dados antes de continuar.",
            "adiar": "O adiamento revelou desigualdade fora da rede institucional; o comitê abriu um piloto acessível depois de ouvir a comunidade."
        },
        "ato2": {
            "negociar": "Na proposta da fornecedora, você exigiu condições verificáveis para dados e continuidade.",
            "aceitar": "Você recomendou continuidade transitória condicionada à suspensão da reutilização de conteúdos e à revisão pelas equipes responsáveis.",
            "interna": "A busca por autonomia tecnológica precisou ser combinada com um serviço provisório viável."
        }
    },
    "gestor": {
        "ato1": {
            "processo": "Você articulou critérios comuns de uso e evidências de aprendizagem; a implementação exigiu formação e horas de acompanhamento.",
            "produto": "Você preservou a autonomia das disciplinas com condições comuns de acesso; a variedade de experiências exigiu uma avaliação mais cuidadosa.",
            "restricao": "Você delimitou o piloto pela capacidade de suporte e previu alternativas; quem ficou fora ainda precisava ser ouvido."
        },
        "ato2": {
            "verificar": "Você reuniu diferentes setores para validar resultados e condicionou a expansão a evidências e suporte.",
            "prazo": "Você apresentou um relatório preliminar, delimitou a continuidade e marcou a conclusão da avaliação.",
            "refazer": "Você propôs reorganizar a implantação com prioridade para equipes, acessibilidade e transição acompanhada."
        }
    },
    "professor": {
        "ato1": {
            "autentica": "O redesenho das atividades revelou como os estudantes aplicam e justificam o conhecimento.",
            "presencial": "As etapas presenciais deram evidências úteis, depois combinadas à investigação digital.",
            "detector": "A confiança da turma foi abalada por sinais de um detector, e os critérios precisaram ser reconstruídos."
        },
        "ato2": {
            "conjunto": "A resposta à revista reconheceu responsabilidades e abriu uma revisão do método.",
            "individual": "O foco inicial na estudante precisou se ampliar para incluir a orientação e a instituição.",
            "revisao": "A tentativa de corrigir somente os números revelou uma falha maior, que exigiu comunicação formal."
        }
    }
};

const reacoesConselho = {
    "estagiario": {
        "ato1": {
            "auditavel": "Eu estava ansioso para mostrar resultado logo. Quando os primeiros erros apareceram, senti alívio por termos começado pequeno — conseguimos ouvir as pessoas sem abandonar ninguém no meio do teste.",
            "amplo": "No primeiro dia, ver tanta gente entrando foi empolgante. Depois chegaram as falhas e as mensagens sem resposta. Confesso que me senti responsável por termos corrido mais do que a equipe conseguia acompanhar.",
            "adiar": "Esperar parecia prudente, mas foi desconfortável descobrir que os estudantes continuavam usando ferramentas externas sem apoio. A pausa não eliminou o problema; só o deixou menos visível para nós."
        },
        "ato2": {
            "negociar": "A negociação foi cansativa, mas pela primeira vez senti que não estávamos apenas aceitando promessas. Havia perguntas que a fornecedora precisava responder diante da comunidade.",
            "aceitar": "Preservar o apoio trouxe alívio, mas nossa recomendação tinha condições. A decisão dependeu da revisão institucional, e os custos futuros continuam exigindo atenção.",
            "interna": "Eu gosto da ideia de construirmos algo nosso, mas tive medo de prometer o que a equipe ainda não consegue entregar. Um plano honesto pareceu mais responsável que uma solução heroica."
        }
    },
    "gestor": {
        "ato1": {
            "processo": "Ter critérios comuns me deu segurança para conversar com os professores. Mas vi o esforço de acompanhar os registros; sem tempo para retorno, a regra perderia o sentido.",
            "produto": "Gostei de poder experimentar. Quando comparamos as turmas, percebi que entregar mais rápido não dizia, sozinho, o que cada pessoa tinha aprendido.",
            "restricao": "Os limites deram tempo para preparar o apoio. Ainda assim, foi difícil explicar aos colegas de fora por que precisavam esperar. Fiquei contente por terem sido ouvidos."
        },
        "ato2": {
            "verificar": "Ouvir quem não aparecia no painel mudou a avaliação. Agora reconheço minhas dificuldades no relatório, além dos números de acesso.",
            "prazo": "Manter o apoio trouxe alívio. Também precisamos cobrar a data da avaliação completa: não quero que uma solução temporária vire permanente sem discussão.",
            "refazer": "Priorizar formação e acessibilidade respondeu a problemas reais. A espera por novas funções frustra alguns colegas, por isso precisamos acompanhar se as etapas serão cumpridas."
        }
    },
    "professor": {
        "ato1": {
            "autentica": "Eu queria uma avaliação que me permitisse confiar no que os estudantes compreendiam. Ouvi-los justificar escolhas devolveu à sala uma curiosidade que eu temia perder.",
            "presencial": "Os encontros presenciais me tranquilizaram, mas também mostraram que presença não é sinônimo de aprendizagem. Precisei escutar mais e controlar menos.",
            "detector": "Quando o detector acusou estudantes que conseguiam explicar o próprio trabalho, senti que havia terceirizado meu julgamento. Reconstruir a confiança da turma foi mais difícil que aplicar qualquer ferramenta."
        },
        "ato2": {
            "conjunto": "Assinar uma resposta conjunta foi desconfortável, mas correto. A estudante não poderia carregar sozinha uma falha que atravessou orientação, método e instituição.",
            "individual": "A conversa individual revelou medo e confusão, não apenas descuido. Saí dela convencido de que responsabilizar também exige oferecer condições para reparar.",
            "revisao": "Eu quis corrigir os números rapidamente. Percebi, porém, que uma correção silenciosa protegeria nossa aparência, não a integridade da pesquisa."
        }
    }
};

// Árvore 3 x 3 de cada função. Os códigos de resultado são apenas internos:
// o jogador vê a solução e a explicação do percurso, nunca uma classificação A/B/C.
const criarRamo = (final, consequencia, sintese, compromisso) => ({ final, consequencia, sintese, compromisso });
const arvoreNarrativa = {
    "estagiario": {
        "auditavel": {
            "negociar": {
                "final": "C",
                "consequencia": "Como o piloto já produzia registros auditáveis, a equipe levou evidências concretas à negociação e conseguiu delimitar dados, suporte e condições de saída.",
                "sintese": "Você combinou experimentação controlada com negociação verificável. O projeto avançou com rastreabilidade e espaço para correções.",
                "compromisso": "Formalizar uma política de inovação responsável, com auditoria, limites contratuais e revisão pública."
            },
            "aceitar": {
                "final": "A",
                "consequencia": "A recomendação de continuidade foi vinculada à suspensão da reutilização adicional de conteúdos e à análise institucional. Os registros da primeira etapa ajudam a avaliar acesso e suporte; custo futuro e saída da plataforma ainda exigem decisão do Conselho.",
                "sintese": "Você preservou a continuidade e usou as evidências do piloto para corrigir a expansão sem interromper o apoio já oferecido.",
                "compromisso": "Ampliar por etapas, vinculando cada avanço a suporte, indicadores e revisão dos dados utilizados."
            },
            "interna": {
                "final": "B",
                "consequencia": "A experiência do piloto mostrou quais tarefas exigiam acompanhamento humano. A alternativa institucional foi planejada com participação das equipes que prestariam suporte.",
                "sintese": "Você articulou autonomia tecnológica e presença humana, evitando tratar o desenvolvimento interno como uma solução puramente técnica.",
                "compromisso": "Investir em capacidade institucional, formação e acompanhamento antes de substituir o serviço atual."
            }
        },
        "amplo": {
            "negociar": {
                "final": "A",
                "consequencia": "A diversidade de usos encontrada na abertura deu força à negociação: acesso e suporte entraram no contrato ao lado das regras de dados.",
                "sintese": "Você transformou uma expansão turbulenta em aprendizado coletivo e usou essa experiência para negociar condições mais inclusivas.",
                "compromisso": "Consolidar a ampliação com suporte proporcional à demanda e acompanhamento público dos resultados."
            },
            "aceitar": {
                "final": "B",
                "consequencia": "A recomendação de continuidade foi vinculada à suspensão da reutilização adicional de conteúdos e à análise institucional. Os registros da primeira etapa ajudam a avaliar acesso e suporte; custo futuro e saída da plataforma ainda exigem decisão do Conselho.",
                "sintese": "Suas escolhas favoreceram disponibilidade imediata; as consequências mostraram que a tecnologia depende de mediação, orientação e capacidade de atendimento.",
                "compromisso": "Priorizar formação e apoio humano antes de qualquer nova expansão do serviço."
            },
            "interna": {
                "final": "C",
                "consequencia": "A abertura ampla revelou requisitos que não apareciam no laboratório. Eles foram convertidos em critérios técnicos, de acessibilidade e de governança para a solução institucional.",
                "sintese": "Você partiu de experiências reais para reduzir dependência externa e documentar responsabilidades que antes estavam dispersas.",
                "compromisso": "Criar uma alternativa institucional transparente, auditável e construída a partir das necessidades observadas."
            }
        },
        "adiar": {
            "negociar": {
                "final": "B",
                "consequencia": "O tempo de preparação permitiu ouvir grupos que estavam fora do piloto. Na negociação, a universidade incluiu atendimento, acessibilidade e alternativas de uso.",
                "sintese": "Você usou a pausa para ampliar a escuta e transformou cautela em condições concretas de participação.",
                "compromisso": "Adotar o serviço somente com formação, apoio humano e alternativas acessíveis garantidas."
            },
            "aceitar": {
                "final": "A",
                "consequencia": "A recomendação de continuidade foi vinculada à suspensão da reutilização adicional de conteúdos e à análise institucional. Os registros da primeira etapa ajudam a avaliar acesso e suporte; custo futuro e saída da plataforma ainda exigem decisão do Conselho.",
                "sintese": "Você equilibrou preparação e oportunidade de acesso, aceitando avançar sem abandonar o acompanhamento das diferenças encontradas.",
                "compromisso": "Abrir o programa gradualmente e revisar seus efeitos sobre grupos com condições distintas de acesso."
            },
            "interna": {
                "final": "C",
                "consequencia": "A análise feita durante o adiamento ofereceu requisitos claros para uma solução própria e para uma transição que não deixasse usuários sem atendimento.",
                "sintese": "Você converteu prudência em planejamento institucional e definiu critérios verificáveis para evitar novas dependências.",
                "compromisso": "Desenvolver uma alternativa pública com governança de dados, cronograma realista e transição acompanhada."
            }
        }
    },
    "gestor": {
        "processo": {
            "verificar": {
                "final": "C",
                "consequencia": "A orientação inicial priorizou critérios comuns e acompanhamento do processo. Ela agora precisa ser sustentada por uma avaliação participativa antes de ampliar. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou critérios comuns e acompanhamento do processo com uma avaliação participativa antes de ampliar. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Publicar critérios de uso, responsabilidades, resultados e limites da avaliação, com participação da comunidade e data de revisão."
            },
            "prazo": {
                "final": "B",
                "consequencia": "A orientação inicial priorizou critérios comuns e acompanhamento do processo. Ela agora precisa ser sustentada por continuidade temporária com avaliação ainda em aberto. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou critérios comuns e acompanhamento do processo com continuidade temporária com avaliação ainda em aberto. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Garantir formação, tempo de acompanhamento e alternativas acessíveis antes de incorporar novos usos de IA."
            },
            "refazer": {
                "final": "A",
                "consequencia": "A orientação inicial priorizou critérios comuns e acompanhamento do processo. Ela agora precisa ser sustentada por reorganização por etapas com investimento em formação e acessibilidade. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou critérios comuns e acompanhamento do processo com reorganização por etapas com investimento em formação e acessibilidade. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Ampliar o Horizonte IA por etapas, somente com acesso, equipes e evidências de aprendizagem acompanhados."
            }
        },
        "produto": {
            "verificar": {
                "final": "B",
                "consequencia": "A orientação inicial priorizou autonomia das disciplinas e condições comuns de participação. Ela agora precisa ser sustentada por uma avaliação participativa antes de ampliar. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou autonomia das disciplinas e condições comuns de participação com uma avaliação participativa antes de ampliar. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Garantir formação, tempo de acompanhamento e alternativas acessíveis antes de incorporar novos usos de IA."
            },
            "prazo": {
                "final": "A",
                "consequencia": "A orientação inicial priorizou autonomia das disciplinas e condições comuns de participação. Ela agora precisa ser sustentada por continuidade temporária com avaliação ainda em aberto. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou autonomia das disciplinas e condições comuns de participação com continuidade temporária com avaliação ainda em aberto. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Ampliar o Horizonte IA por etapas, somente com acesso, equipes e evidências de aprendizagem acompanhados."
            },
            "refazer": {
                "final": "C",
                "consequencia": "A orientação inicial priorizou autonomia das disciplinas e condições comuns de participação. Ela agora precisa ser sustentada por reorganização por etapas com investimento em formação e acessibilidade. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou autonomia das disciplinas e condições comuns de participação com reorganização por etapas com investimento em formação e acessibilidade. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Publicar critérios de uso, responsabilidades, resultados e limites da avaliação, com participação da comunidade e data de revisão."
            }
        },
        "restricao": {
            "verificar": {
                "final": "A",
                "consequencia": "A orientação inicial priorizou escopo delimitado e preparação das equipes. Ela agora precisa ser sustentada por uma avaliação participativa antes de ampliar. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou escopo delimitado e preparação das equipes com uma avaliação participativa antes de ampliar. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Ampliar o Horizonte IA por etapas, somente com acesso, equipes e evidências de aprendizagem acompanhados."
            },
            "prazo": {
                "final": "C",
                "consequencia": "A orientação inicial priorizou escopo delimitado e preparação das equipes. Ela agora precisa ser sustentada por continuidade temporária com avaliação ainda em aberto. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou escopo delimitado e preparação das equipes com continuidade temporária com avaliação ainda em aberto. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Publicar critérios de uso, responsabilidades, resultados e limites da avaliação, com participação da comunidade e data de revisão."
            },
            "refazer": {
                "final": "B",
                "consequencia": "A orientação inicial priorizou escopo delimitado e preparação das equipes. Ela agora precisa ser sustentada por reorganização por etapas com investimento em formação e acessibilidade. A gestão leva essa combinação ao Conselho, com limites de orçamento e capacidade de atendimento explícitos.",
                "sintese": "Você articulou escopo delimitado e preparação das equipes com reorganização por etapas com investimento em formação e acessibilidade. A implantação passa a ser avaliada por condições de participação e evidências de aprendizagem, além do volume de uso.",
                "compromisso": "Garantir formação, tempo de acompanhamento e alternativas acessíveis antes de incorporar novos usos de IA."
            }
        }
    },
    "professor": {
        "autentica": {
            "conjunto": {
                "final": "C",
                "consequencia": "Os registros da avaliação contextualizada ajudaram a rastrear onde dados sugeridos pela IA entraram na pesquisa. Estudante, orientador e instituição assumiram a revisão.",
                "sintese": "Você articulou avaliação autêntica e responsabilidade compartilhada, tornando método e autoria verificáveis.",
                "compromisso": "Adotar uma política de integridade baseada em rastreabilidade, declaração de uso e responsabilidades compartilhadas."
            },
            "individual": {
                "final": "B",
                "consequencia": "A defesa das decisões deu à estudante condições para explicar o percurso. A escuta individual foi incorporada a uma revisão acompanhada pelo orientador.",
                "sintese": "Você valorizou aplicação e diálogo; diante da falha, esse caminho se consolidou em mediação formativa, sem apagar responsabilidades.",
                "compromisso": "Fortalecer orientação e escuta qualificada antes de decidir correções ou responsabilizações."
            },
            "revisao": {
                "final": "A",
                "consequencia": "O problema contextualizado permitiu reconstruir parte da análise com dados reais. O caso virou material de formação para outras equipes de pesquisa.",
                "sintese": "Você transformou a revisão em oportunidade de aprendizagem institucional e de ampliação de práticas mais seguras.",
                "compromisso": "Compartilhar protocolos e experiências revisadas, ampliando gradualmente práticas de pesquisa assistida por IA."
            }
        },
        "presencial": {
            "conjunto": {
                "final": "B",
                "consequencia": "Os encontros presenciais facilitaram uma conversa franca sobre a origem dos dados. A resposta conjunta preservou escuta e responsabilidade.",
                "sintese": "Você construiu evidências pelo diálogo e manteve essa presença humana ao enfrentar uma falha de pesquisa.",
                "compromisso": "Garantir tempo de orientação, formação e decisões compartilhadas em todas as pesquisas com IA."
            },
            "individual": {
                "final": "A",
                "consequencia": "A conversa individual revelou lacunas que também apareciam em outros trabalhos. A universidade ampliou os encontros de orientação e criou apoio para mais turmas.",
                "sintese": "Você partiu da observação direta e transformou um caso particular em oportunidade de ampliar suporte institucional.",
                "compromisso": "Expandir o acompanhamento em etapas, monitorando carga docente, participação e aprendizagem."
            },
            "revisao": {
                "final": "C",
                "consequencia": "A revisão técnica precisou ser acompanhada por uma explicação oral das decisões. O novo protocolo passou a reunir registros, dados e defesa do método.",
                "sintese": "Você uniu evidência presencial e rastreabilidade documental para tornar a correção compreensível e verificável.",
                "compromisso": "Formalizar revisões com registro do método, diálogo com autores e comunicação transparente às revistas."
            }
        },
        "detector": {
            "conjunto": {
                "final": "A",
                "consequencia": "A experiência com falsos sinais tornou a equipe mais cautelosa. Na pesquisa, a análise conjunta substituiu suspeitas automáticas e gerou formação para toda a comunidade.",
                "sintese": "Você converteu uma crise de confiança em aprendizagem coletiva e em condições melhores para ampliar o uso responsável.",
                "compromisso": "Ampliar formação e acesso a protocolos de análise, sem automatizar julgamentos sobre autoria."
            },
            "individual": {
                "final": "C",
                "consequencia": "Depois do conflito com o detector, a escuta da estudante foi registrada e confrontada com dados e versões do artigo, evitando um novo julgamento automático.",
                "sintese": "Você aprendeu a não confundir indício com prova e levou essa cautela a um processo transparente de apuração.",
                "compromisso": "Criar procedimentos verificáveis de escuta, contestação e revisão antes de qualquer responsabilização."
            },
            "revisao": {
                "final": "B",
                "consequencia": "A tentativa de corrigir rapidamente repetiu a lógica do detector: buscar uma resposta simples para um problema complexo. A equipe interrompeu o envio e retomou a orientação.",
                "sintese": "As duas etapas mostraram os limites de soluções automáticas e conduziram a uma escolha pela presença humana e pelo tempo de análise.",
                "compromisso": "Priorizar orientação, revisão colegiada e formação antes de adotar respostas automatizadas para integridade."
            }
        }
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
    document.getElementById('npc-player-conselho').src = caminhoAvatarJogador();
    document.getElementById('painel-final-aluno').classList.add('escondido');
    document.getElementById('painel-decisao-conselho').classList.add('escondido');
    document.getElementById('caixa-dialogo-conselho').classList.remove('escondido');
    somConselho.loop = true;
    somConselho.currentTime = 0;
    aplicarVolumeGlobal();
    if (somLigado) somConselho.play().catch(() => {});

    const memoria = memoriaConselho[jogador.classeID];
    const ramo = obterRamoNarrativo();
    if (!ramo) return;
    jogador.finalLiberado = ramo.final;
    jogador.escolhas.conselho = ramo.compromisso;
    const reacoes = reacoesConselho[jogador.classeID];
    const conviteCompanheiro = {
        estagiario: 'Ainda fico nervoso pensando no que poderia ter dado errado, mas agora consigo enxergar o que aprendemos.',
        gestor: 'Eu não saio daqui com uma resposta perfeita. Saio sabendo quais perguntas não podemos mais ignorar.',
        professor: 'Esta experiência mexeu com certezas que eu levava para a sala de aula. Isso é desconfortável — e necessário.'
    };
    linhasConselho = [
        { nome: '', texto: 'Sala do Conselho da Universidade Horizonte. A revisão dos três meses do Programa Horizonte IA reúne nesta mesa evidências sobre acesso, aprendizagem, trabalho das equipes e condições de continuidade.' },
        { nome: 'REITORA HELENA', texto: 'Precisamos decidir as condições de continuidade da implantação da IA. Antes de deliberar, quero ouvir como as decisões afetaram as pessoas e o que as evidências permitem concluir.' },
        { nome: roteiroJornada.companheiro, texto: reacoes.ato1[jogador.escolhas.ato1] },
        { nome: roteiroJornada.companheiro, texto: reacoes.ato2[jogador.escolhas.ato2] },
        { nome: '{nome}', texto: `Não foi uma escolha simples. ${ramo.sintese}` },
        { nome: roteiroJornada.companheiro, texto: `${conviteCompanheiro[jogador.classeID]} Por isso, defendo este compromisso: ${ramo.compromisso}` },
        { nome: 'REITORA HELENA', texto: 'Eu também preferiria uma decisão sem riscos. Ela não existe. O que podemos fazer é assumir este caminho, torná-lo público e ter coragem para revê-lo quando a comunidade mostrar que algo não está funcionando.' }
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
        mostrarFinalAtos();
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

function mostrarFinalAtos() {
    clearTimeout(maquinaConselhoAtos);
    mostrarAvatarConselhoAtos('');
    document.getElementById('caixa-dialogo-conselho').classList.add('escondido');
    const final = desfechosAtos[jogador.finalLiberado];
    document.getElementById('titulo-final-aluno').textContent = final.titulo;
    document.getElementById('texto-final-aluno').textContent = final.texto;
    montarFeedbackFinal();
    document.getElementById('painel-final-aluno').classList.remove('escondido');
    document.getElementById('btn-recomecar-aluno').focus();
}

function montarFeedbackFinal() {
    const memoria = memoriaConselho[jogador.classeID];
    const ramo = obterRamoNarrativo();
    const final = desfechosAtos[jogador.finalLiberado];
    const opcaoAto1 = roteiroJornada.ato1.opcoes.find(opcao => opcao.id === jogador.escolhas.ato1);
    const opcaoAto2 = roteiroJornada.ato2.opcoes.find(opcao => opcao.id === jogador.escolhas.ato2);
    const leituras = {
        A: 'No Conselho, sua trajetória se consolidou na prioridade de ampliar oportunidades com acesso, suporte e acompanhamento dos resultados.',
        B: 'No Conselho, sua trajetória se consolidou na prioridade de preservar mediação humana, formação e tempo para decisões pedagógicas.',
        C: 'No Conselho, sua trajetória se consolidou na prioridade de tornar o uso da IA transparente, verificável e aberto à contestação.'
    };

    document.getElementById('resumo-feedback-final').textContent =
        `${leituras[jogador.finalLiberado]} Explore os três marcos para rever como essa solução foi construída.`;

    const rotulosEscolhas = {
        auditavel: 'Piloto acompanhado', amplo: 'Abertura ampla', adiar: 'Preparar antes',
        negociar: 'Negociar condições', aceitar: 'Manter e revisar', interna: 'Alternativa institucional',
        processo: 'Critérios institucionais', produto: 'Autonomia das disciplinas', restricao: 'Escopo delimitado',
        verificar: 'Avaliação participativa', prazo: 'Relatório preliminar', refazer: 'Implantação por etapas',
        autentica: 'Avaliação contextualizada', presencial: 'Etapas presenciais', detector: 'Análise automatizada',
        conjunto: 'Responsabilidade compartilhada', individual: 'Escuta individual', revisao: 'Revisão técnica'
    };

    const etapas = [
        { titulo: '1 · Ato I', escolha: rotulosEscolhas[jogador.escolhas.ato1] || opcaoAto1?.texto, consequencia: memoria.ato1[jogador.escolhas.ato1] },
        { titulo: '2 · Ato II', escolha: rotulosEscolhas[jogador.escolhas.ato2] || opcaoAto2?.texto, consequencia: memoria.ato2[jogador.escolhas.ato2] },
        { titulo: '3 · Solução', escolha: final.titulo, consequencia: ramo?.compromisso }
    ];
    const nivelamentosVistos = (jogador.escolhas.nivelamentos || [])
        .map(chave => recursosAtos[chave]?.dimensao)
        .filter(Boolean);
    if (nivelamentosVistos.length) {
        etapas[2].consequencia += ` Perspectivas revisitadas durante a jornada: ${nivelamentosVistos.join(' e ')}.`;
    }
    const lista = document.getElementById('etapas-feedback-final');
    lista.replaceChildren();
    const detalhe = document.getElementById('detalhe-feedback-final');
    const selecionarEtapa = (botao, etapa) => {
        lista.querySelectorAll('.etapa-feedback').forEach(item => {
            item.classList.toggle('ativo', item === botao);
            item.setAttribute('aria-pressed', String(item === botao));
        });
        detalhe.textContent = etapa.consequencia;
    };
    etapas.forEach((etapa, indice) => {
        const artigo = document.createElement('button');
        artigo.type = 'button';
        artigo.className = 'etapa-feedback';
        artigo.setAttribute('aria-pressed', 'false');
        const titulo = document.createElement('strong');
        titulo.textContent = etapa.titulo;
        const escolha = document.createElement('span');
        escolha.textContent = etapa.escolha || 'Escolha não registrada.';
        artigo.append(titulo, escolha);
        artigo.addEventListener('click', () => selecionarEtapa(artigo, etapa));
        lista.appendChild(artigo);
        if (indice === 0) selecionarEtapa(artigo, etapa);
    });
}

document.getElementById('btn-avancar-conselho').addEventListener('click', () => {
    tocarSom(somTela);
    if (completarDigitacao(document.getElementById('texto-narrativa-conselho'))) return;
    indiceConselhoAtos++;
    carregarFalaConselhoAtos();
});
document.getElementById('btn-recomecar-aluno').addEventListener('click', () => location.reload());
document.addEventListener('reiniciarConselhoAtos', iniciarConselhoAtos);
