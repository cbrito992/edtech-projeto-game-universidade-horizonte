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

// Árvore 3 x 3 de cada função. Os códigos de resultado são apenas internos:
// o jogador vê a solução e a explicação do percurso, nunca uma classificação A/B/C.
const criarRamo = (final, consequencia, sintese, compromisso) => ({ final, consequencia, sintese, compromisso });
const arvoreNarrativa = {
    estagiario: {
        auditavel: {
            negociar: criarRamo('C',
                'Como o piloto já produzia registros auditáveis, a equipe levou evidências concretas à negociação e conseguiu delimitar dados, suporte e condições de saída.',
                'Você combinou experimentação controlada com negociação verificável. O projeto avançou com rastreabilidade e espaço para correções.',
                'Formalizar uma política de inovação responsável, com auditoria, limites contratuais e revisão pública.'),
            aceitar: criarRamo('A',
                'Os registros do piloto permitiram manter o serviço enquanto a equipe identificava riscos no contrato. A expansão continuou, mas cada nova etapa passou a depender de indicadores públicos.',
                'Você preservou a continuidade e usou as evidências do piloto para corrigir a expansão sem interromper o apoio já oferecido.',
                'Ampliar por etapas, vinculando cada avanço a suporte, indicadores e revisão dos dados utilizados.'),
            interna: criarRamo('B',
                'A experiência do piloto mostrou quais tarefas exigiam acompanhamento humano. A alternativa institucional foi planejada com participação das equipes que prestariam suporte.',
                'Você articulou autonomia tecnológica e presença humana, evitando tratar o desenvolvimento interno como uma solução puramente técnica.',
                'Investir em capacidade institucional, formação e acompanhamento antes de substituir o serviço atual.')
        },
        amplo: {
            negociar: criarRamo('A',
                'A diversidade de usos encontrada na abertura deu força à negociação: acesso e suporte entraram no contrato ao lado das regras de dados.',
                'Você transformou uma expansão turbulenta em aprendizado coletivo e usou essa experiência para negociar condições mais inclusivas.',
                'Consolidar a ampliação com suporte proporcional à demanda e acompanhamento público dos resultados.'),
            aceitar: criarRamo('B',
                'Manter a oferta evitou uma ruptura, mas a sobrecarga reapareceu. A universidade percebeu que continuidade sem equipes preparadas apenas deslocaria o problema.',
                'Suas escolhas favoreceram disponibilidade imediata; as consequências mostraram que a tecnologia depende de mediação, orientação e capacidade de atendimento.',
                'Priorizar formação e apoio humano antes de qualquer nova expansão do serviço.'),
            interna: criarRamo('C',
                'A abertura ampla revelou requisitos que não apareciam no laboratório. Eles foram convertidos em critérios técnicos, de acessibilidade e de governança para a solução institucional.',
                'Você partiu de experiências reais para reduzir dependência externa e documentar responsabilidades que antes estavam dispersas.',
                'Criar uma alternativa institucional transparente, auditável e construída a partir das necessidades observadas.')
        },
        adiar: {
            negociar: criarRamo('B',
                'O tempo de preparação permitiu ouvir grupos que estavam fora do piloto. Na negociação, a universidade incluiu atendimento, acessibilidade e alternativas de uso.',
                'Você usou a pausa para ampliar a escuta e transformou cautela em condições concretas de participação.',
                'Adotar o serviço somente com formação, apoio humano e alternativas acessíveis garantidas.'),
            aceitar: criarRamo('A',
                'Depois de uma espera cuidadosa, a continuidade gratuita acelerou a entrada de novos participantes. A equipe manteve canais de escuta para corrigir desigualdades durante a expansão.',
                'Você equilibrou preparação e oportunidade de acesso, aceitando avançar sem abandonar o acompanhamento das diferenças encontradas.',
                'Abrir o programa gradualmente e revisar seus efeitos sobre grupos com condições distintas de acesso.'),
            interna: criarRamo('C',
                'A análise feita durante o adiamento ofereceu requisitos claros para uma solução própria e para uma transição que não deixasse usuários sem atendimento.',
                'Você converteu prudência em planejamento institucional e definiu critérios verificáveis para evitar novas dependências.',
                'Desenvolver uma alternativa pública com governança de dados, cronograma realista e transição acompanhada.')
        }
    },
    gestor: {
        processo: {
            verificar: criarRamo('C',
                'Os registros de autoria facilitaram a conferência coletiva: cada pessoa mostrou como encontrou, usou ou descartou uma fonte.',
                'Você conectou transparência do processo à verificação das evidências, criando uma prática que pode ser compreendida e contestada.',
                'Instituir critérios de autoria, declaração de uso e verificação de fontes em todas as disciplinas.'),
            prazo: criarRamo('B',
                'Como o percurso estava documentado, o grupo conseguiu explicar a pressa e organizar uma correção orientada, sem transformar a falha em punição automática.',
                'Você valorizou o processo e, diante do prazo, percebeu que a mediação é necessária para converter um erro em aprendizagem.',
                'Criar momentos de orientação e revisão para que prazos acadêmicos não eliminem a aprendizagem reflexiva.'),
            refazer: criarRamo('A',
                'Os rascunhos permitiram redistribuir a revisão sem apagar o trabalho anterior. O grupo refez a seção e transformou o material em referência para outras turmas.',
                'Você preservou evidências do percurso e reorganizou a produção coletiva, tornando o aprendizado reutilizável e acessível.',
                'Ampliar a prática de portfólios e revisão coletiva com modelos que possam circular pela universidade.')
        },
        produto: {
            verificar: criarRamo('B',
                'A conferência mostrou que um texto fluente escondia fontes frágeis. A gestão acrescentou encontros de defesa e revisão ao calendário.',
                'Você começou pela qualidade do produto e encontrou na verificação a necessidade de diálogo para reconhecer compreensão real.',
                'Priorizar acompanhamento e defesa das decisões, sem reduzir a avaliação à aparência do texto final.'),
            prazo: criarRamo('A',
                'A entrega preservou o trabalho visível, mas a correção posterior revelou diferentes necessidades de apoio. A experiência foi usada para redesenhar a próxima oferta.',
                'Você privilegiou continuidade e alcance; as consequências levaram a uma expansão acompanhada por indicadores de aprendizagem.',
                'Expandir o programa com ciclos de entrega, revisão e apoio diferenciados para estudantes e equipes.'),
            refazer: criarRamo('C',
                'Ao reconstruir a seção, o grupo precisou tornar visíveis fontes, decisões e responsabilidades que o produto acabado ocultava.',
                'Você saiu do foco exclusivo no resultado e chegou a uma política de rastreabilidade capaz de orientar futuras produções.',
                'Exigir documentação de fontes, alterações e participação humana nos trabalhos apoiados por IA.')
        },
        restricao: {
            verificar: criarRamo('A',
                'A referência inicial sem IA ajudou a comparar processos, e a verificação coletiva abriu caminhos para usos posteriores mais bem acompanhados.',
                'Você combinou um limite temporário com evidências que permitiram ampliar possibilidades sem abandonar critérios claros.',
                'Autorizar novos usos por etapas, avaliando acesso, aprendizagem e alternativas em cada disciplina.'),
            prazo: criarRamo('C',
                'A urgência expôs ambiguidades da restrição: o grupo não sabia quais apoios poderia usar. A correção originou regras públicas e formas de contestação.',
                'Você percebeu que limitar sem explicar produz novas incertezas; o percurso conduziu a critérios transparentes e revisáveis.',
                'Publicar regras de uso, exceções de acessibilidade, responsabilidades e procedimentos de revisão.'),
            refazer: criarRamo('B',
                'A reconstrução exigiu acompanhamento próximo para não excluir apoios legítimos. Professores e estudantes revisaram juntos o objetivo da atividade.',
                'Você preservou uma referência inicial, mas as consequências mostraram que limites justos dependem de escuta e mediação.',
                'Definir limites pedagógicos com participação docente, apoio humano e alternativas acessíveis.')
        }
    },
    professor: {
        autentica: {
            conjunto: criarRamo('C',
                'Os registros da avaliação contextualizada ajudaram a rastrear onde dados sugeridos pela IA entraram na pesquisa. Estudante, orientador e instituição assumiram a revisão.',
                'Você articulou avaliação autêntica e responsabilidade compartilhada, tornando método e autoria verificáveis.',
                'Adotar uma política de integridade baseada em rastreabilidade, declaração de uso e responsabilidades compartilhadas.'),
            individual: criarRamo('B',
                'A defesa das decisões deu à estudante condições para explicar o percurso. A escuta individual foi incorporada a uma revisão acompanhada pelo orientador.',
                'Você valorizou aplicação e diálogo; diante da falha, esse caminho se consolidou em mediação formativa, sem apagar responsabilidades.',
                'Fortalecer orientação e escuta qualificada antes de decidir correções ou responsabilizações.'),
            revisao: criarRamo('A',
                'O problema contextualizado permitiu reconstruir parte da análise com dados reais. O caso virou material de formação para outras equipes de pesquisa.',
                'Você transformou a revisão em oportunidade de aprendizagem institucional e de ampliação de práticas mais seguras.',
                'Compartilhar protocolos e experiências revisadas, ampliando gradualmente práticas de pesquisa assistida por IA.')
        },
        presencial: {
            conjunto: criarRamo('B',
                'Os encontros presenciais facilitaram uma conversa franca sobre a origem dos dados. A resposta conjunta preservou escuta e responsabilidade.',
                'Você construiu evidências pelo diálogo e manteve essa presença humana ao enfrentar uma falha de pesquisa.',
                'Garantir tempo de orientação, formação e decisões compartilhadas em todas as pesquisas com IA.'),
            individual: criarRamo('A',
                'A conversa individual revelou lacunas que também apareciam em outros trabalhos. A universidade ampliou os encontros de orientação e criou apoio para mais turmas.',
                'Você partiu da observação direta e transformou um caso particular em oportunidade de ampliar suporte institucional.',
                'Expandir o acompanhamento em etapas, monitorando carga docente, participação e aprendizagem.'),
            revisao: criarRamo('C',
                'A revisão técnica precisou ser acompanhada por uma explicação oral das decisões. O novo protocolo passou a reunir registros, dados e defesa do método.',
                'Você uniu evidência presencial e rastreabilidade documental para tornar a correção compreensível e verificável.',
                'Formalizar revisões com registro do método, diálogo com autores e comunicação transparente às revistas.')
        },
        detector: {
            conjunto: criarRamo('A',
                'A experiência com falsos sinais tornou a equipe mais cautelosa. Na pesquisa, a análise conjunta substituiu suspeitas automáticas e gerou formação para toda a comunidade.',
                'Você converteu uma crise de confiança em aprendizagem coletiva e em condições melhores para ampliar o uso responsável.',
                'Ampliar formação e acesso a protocolos de análise, sem automatizar julgamentos sobre autoria.'),
            individual: criarRamo('C',
                'Depois do conflito com o detector, a escuta da estudante foi registrada e confrontada com dados e versões do artigo, evitando um novo julgamento automático.',
                'Você aprendeu a não confundir indício com prova e levou essa cautela a um processo transparente de apuração.',
                'Criar procedimentos verificáveis de escuta, contestação e revisão antes de qualquer responsabilização.'),
            revisao: criarRamo('B',
                'A tentativa de corrigir rapidamente repetiu a lógica do detector: buscar uma resposta simples para um problema complexo. A equipe interrompeu o envio e retomou a orientação.',
                'As duas etapas mostraram os limites de soluções automáticas e conduziram a uma escolha pela presença humana e pelo tempo de análise.',
                'Priorizar orientação, revisão colegiada e formação antes de adotar respostas automatizadas para integridade.')
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
    linhasConselho = [
        { nome: '', texto: 'Sala do Conselho da Universidade Horizonte. Três meses de decisões e correções estão reunidos nesta mesa.' },
        { nome: 'REITORA HELENA', texto: 'Quero ouvir o que aconteceu em cada etapa. O tempo decorrido também é parte das consequências das nossas escolhas.' },
        { nome: roteiroJornada.companheiro, texto: memoria.ato1[jogador.escolhas.ato1] },
        { nome: roteiroJornada.companheiro, texto: memoria.ato2[jogador.escolhas.ato2] },
        { nome: '{nome}', texto: ramo.sintese },
        { nome: roteiroJornada.companheiro, texto: ramo.compromisso },
        { nome: 'REITORA HELENA', texto: 'O Conselho acolhe essa leitura do percurso. A decisão não encerra o debate: ela define a solução que a universidade colocará em prática e continuará avaliando com a comunidade.' }
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
    const opcaoAto1 = roteiroJornada.ato1.opcoes.find(opcao => opcao.id === jogador.escolhas.ato1);
    const opcaoAto2 = roteiroJornada.ato2.opcoes.find(opcao => opcao.id === jogador.escolhas.ato2);
    const leituras = {
        A: 'No Conselho, sua trajetória se consolidou na prioridade de ampliar oportunidades com acesso, suporte e acompanhamento dos resultados.',
        B: 'No Conselho, sua trajetória se consolidou na prioridade de preservar mediação humana, formação e tempo para decisões pedagógicas.',
        C: 'No Conselho, sua trajetória se consolidou na prioridade de tornar o uso da IA transparente, verificável e aberto à contestação.'
    };

    document.getElementById('resumo-feedback-final').textContent =
        `${leituras[jogador.finalLiberado]} As escolhas anteriores não eram certas ou erradas: elas produziram experiências que deram contexto a essa decisão.`;

    const etapas = [
        { titulo: 'Ato I — prioridade inicial', escolha: opcaoAto1?.texto, consequencia: memoria.ato1[jogador.escolhas.ato1] },
        { titulo: 'Ato II — resposta às consequências', escolha: opcaoAto2?.texto, consequencia: memoria.ato2[jogador.escolhas.ato2] },
        { titulo: 'Conselho — leitura do percurso', escolha: ramo?.compromisso, consequencia: 'A combinação das duas decisões definiu esta solução. Uma escolha diferente em qualquer ato poderia produzir outra leitura institucional.' }
    ];
    const nivelamentosVistos = (jogador.escolhas.nivelamentos || [])
        .map(chave => recursosAtos[chave]?.dimensao)
        .filter(Boolean);
    if (nivelamentosVistos.length) {
        etapas.splice(2, 0, {
            titulo: 'Nivelamento — perspectivas ampliadas',
            escolha: nivelamentosVistos.join(' • '),
            consequencia: 'Esses conteúdos foram apresentados durante os atos porque suas decisões priorizaram outros aspectos do problema. Eles ampliaram o repertório levado ao Conselho.'
        });
    }
    const lista = document.getElementById('etapas-feedback-final');
    lista.replaceChildren();
    etapas.forEach(etapa => {
        const artigo = document.createElement('article');
        artigo.className = 'etapa-feedback';
        const titulo = document.createElement('strong');
        titulo.textContent = etapa.titulo;
        const escolha = document.createElement('span');
        escolha.textContent = etapa.escolha || 'Escolha não registrada.';
        const consequencia = document.createElement('small');
        consequencia.textContent = etapa.consequencia;
        artigo.append(titulo, escolha, consequencia);
        lista.appendChild(artigo);
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
