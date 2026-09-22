// Roteiro dos dois primeiros atos. As decisões não exibem notas nem rótulos de acerto.
const recursosAtos = {
    governanca: {
        titulo: 'Governança e acesso à IA',
        descricao: 'Uma política de acesso precisa prever infraestrutura, suporte, proteção de dados e uma forma de interromper o piloto se surgirem problemas.',
        pontos: ['Quem recebe acesso e quem oferece suporte?', 'O que será registrado e quem poderá consultar esses dados?', 'Que sinais justificam rever ou interromper o piloto?'],
        url: 'https://www.iiep.unesco.org/pt/articles/inteligencia-artificial-e-educacao-o-papel-da-ia-nas-politicas-educacionais'
    },
    equidade: {
        titulo: 'Acesso desigual, soluções diferentes',
        descricao: 'Bloquear uma ferramenta na rede do campus não impede seu uso por redes móveis ou serviços pagos. Compare as condições de quem estuda com recursos diferentes.',
        pontos: ['Nem todos têm conexão, equipamentos ou assinatura.', 'Uma alternativa equivalente precisa ser utilizável de verdade.', 'O piloto deve ouvir pessoas que ficaram de fora.'],
        url: 'https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa'
    },
    privacidade: {
        titulo: 'Dados e condições do contrato',
        descricao: 'Uma oferta gratuita pode envolver coleta de comandos, conteúdo acadêmico e dependência de uma plataforma. Examine finalidade, retenção, acesso e alternativas.',
        pontos: ['Quais dados são necessários para prestar o serviço?', 'Estudantes conseguem entender e contestar o uso?', 'O que acontece quando o período gratuito termina?'],
        url: 'https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa'
    },
    autoria: {
        titulo: 'Autoria e aprendizagem',
        descricao: 'Um texto bem acabado não mostra sozinho o percurso intelectual. Rascunhos, fontes e defesa das decisões ajudam a distinguir apoio de substituição.',
        pontos: ['A IA pode organizar ideias sem escrever a análise final.', 'Fontes e afirmações precisam ser conferidas.', 'Declarar o uso permite avaliar o processo.'],
        url: 'https://observatoriodeeducacao.institutounibanco.org.br/em-debate/inteligencia-artificial-na-educacao'
    },
    referencias: {
        titulo: 'Quando uma referência parece convincente',
        descricao: 'Uma citação formatada pode apontar para um artigo inexistente. A aparência correta da referência não comprova que a fonte existe.',
        pontos: ['Localize a publicação original e confirme autoria e conteúdo.', 'Confira se identificadores e endereços levam ao mesmo trabalho.', 'Se a fonte não for encontrada, retire a afirmação ou procure evidência verificável.'],
        url: 'https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa'
    },
    docencia: {
        titulo: 'Competências docentes em IA',
        descricao: 'A mediação do professor envolve escolher objetivos, desenhar atividades e examinar evidências de aprendizagem, mesmo com ferramentas automatizadas.',
        pontos: ['O que a atividade pede que o estudante demonstre?', 'Como acompanhar o processo sem vigiar cada passo?', 'Quais alternativas mantêm a avaliação acessível?'],
        url: 'https://www.unesco.org/pt/articles/marco-referencial-de-competencias-em-ia-para-professores'
    },
    integridade: {
        titulo: 'Integridade na pesquisa',
        descricao: 'Uma ferramenta pode sugerir dados e referências, mas a validação do método e a responsabilidade pela publicação continuam com as pessoas que assinam o trabalho.',
        pontos: ['Separe dados coletados de conteúdo apenas sugerido.', 'Informe à revista o que foi identificado e como será corrigido.', 'Crie uma revisão que proteja estudante, orientador e leitores.'],
        url: 'https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa'
    },
    videoEstudo: {
        titulo: 'Vídeo: IA e aprendizagem',
        descricao: 'Assista e considere a diferença entre receber uma explicação e construir uma compreensão que pode ser defendida.',
        video: 'https://www.youtube.com/embed/P1H_pmdCWWU',
        url: 'https://www.youtube.com/watch?v=P1H_pmdCWWU'
    },
    videoEnsino: {
        titulo: 'Vídeo: IA no ensino superior',
        descricao: 'Observe as relações entre objetivos da disciplina, uso da ferramenta e avaliação da aprendizagem.',
        video: 'https://www.youtube.com/embed/S2Pq1fwgTuM',
        url: 'https://www.youtube.com/watch?v=S2Pq1fwgTuM'
    }
};

const roteirosAtos = {
    estagiario: {
        nivel: 'Iniciante',
        companheiro: 'NICODEMOS',
        avatar: 'assets/images/npc_nicodemos.png',
        fundo1: 'assets/images/background_sala de informatica.png',
        fundo2: 'assets/images/background_hall.png',
        ato1: {
            antes: [
                { nome: '', texto: 'Laboratório do Comitê Horizonte IA. O assistente acadêmico já funciona nos testes; ainda não existe uma regra para oferecê-lo ao campus.' },
                { nome: 'NICODEMOS', texto: 'Giovana me pediu um plano de lançamento. É tentador pensar apenas em quantas contas conseguiremos criar, mas também teremos de atender quem encontrar dificuldades.' },
                { nome: '{nome}', texto: 'Vou comparar acesso, suporte e riscos antes de indicar o tamanho do piloto.' },
                { recurso: 'governanca' },
                { nome: 'NICODEMOS', texto: 'Agora temos um ponto de partida. Qual seria a primeira ação do comitê?' }
            ],
            pergunta: 'Como iniciar o projeto-piloto?',
            opcoes: [
                {
                    id: 'auditavel',
                    texto: 'Começar em um ambiente limitado, com suporte e critérios públicos de avaliação antes de ampliar o acesso.',
                    passos: [
                        { nome: 'NICODEMOS', texto: 'Conseguimos acompanhar erros e ouvir os primeiros participantes. O limite inicial também significa que teremos de explicar quem entra no piloto e quando outras pessoas poderão participar.' },
                        { nome: '', texto: 'A equipe registra falhas, testa acessibilidade e cria um canal de ajuda. O piloto segue estável e suas condições ficam documentadas.' }
                    ]
                },
                {
                    id: 'amplo',
                    texto: 'Abrir o acesso para toda a comunidade e aprender com uma variedade maior de situações reais desde o início.',
                    passos: [
                        { nome: 'NICODEMOS', texto: 'A abertura revelou demandas que os testes não mostraram. A equipe, porém, recebeu solicitações demais e precisa conter uma falha na gestão de dados.' },
                        { nome: '', texto: 'Dois dias depois, o serviço fica lento e a ouvidoria pede esclarecimentos sobre registros de uso. A prioridade agora é reduzir a exposição e recuperar o suporte.' },
                        { recurso: 'privacidade' },
                        { atividade: { pergunta: 'Qual ação ajuda a conter o problema sem abandonar quem já depende do serviço?', opcoes: [
                            { texto: 'Suspender temporariamente as funções afetadas, informar a comunidade e revisar os registros com a equipe responsável.', adequada: true, retorno: 'A contenção cria espaço para investigar e comunicar o ocorrido.' },
                            { texto: 'Manter tudo aberto e esperar que o aumento de capacidade resolva também a dúvida sobre os dados.', retorno: 'Mais capacidade pode reduzir a lentidão, mas não esclarece o tratamento dos dados. Examine essa parte também.' },
                            { texto: 'Desligar o sistema sem aviso e considerar o incidente encerrado.', retorno: 'Interromper o acesso pode ser necessário, mas as pessoas afetadas ainda precisam de informação e suporte.' }
                        ] } },
                        { nome: 'NICODEMOS', texto: 'Reduzimos a escala, comunicamos as medidas e reconstruímos o piloto com acompanhamento. A abertura nos ensinou a planejar suporte antes da próxima expansão.' }
                    ]
                },
                {
                    id: 'adiar',
                    texto: 'Aguardar garantias mais sólidas de acesso e privacidade antes de disponibilizar a ferramenta na rede universitária.',
                    passos: [
                        { nome: 'NICODEMOS', texto: 'Ganhamos tempo para elaborar critérios. Só que estudantes continuam usando plataformas externas, sem orientação da universidade.' },
                        { nome: '', texto: 'O comitê encontra uma diferença crescente entre quem pode pagar por serviços avançados e quem depende das opções gratuitas.' },
                        { recurso: 'equidade' },
                        { atividade: { pergunta: 'Que medida responde à desigualdade encontrada?', opcoes: [
                            { texto: 'Criar um piloto supervisionado com acesso gratuito e uma alternativa para quem não pode usar a plataforma.', adequada: true, retorno: 'Essa medida permite oferecer apoio e aprender com condições de acesso diversas.' },
                            { texto: 'Manter o bloqueio apenas no Wi-Fi institucional e considerar que ninguém mais usará IA.', retorno: 'Redes móveis e plataformas externas continuam disponíveis de forma desigual.' },
                            { texto: 'Oferecer acesso somente a quem já possui conta paga.', retorno: 'Isso aumenta justamente a diferença que o comitê identificou.' }
                        ] } },
                        { nome: 'NICODEMOS', texto: 'Abrimos um piloto acompanhado e com alternativas. Demorou mais, mas agora sabemos quem precisamos incluir desde o começo.' }
                    ]
                }
            ]
        },
        ato2: {
            retorno: {
                auditavel: 'O laboratório auditável que você organizou permitiu conhecer os limites do sistema. Agora há pressão para ampliar o acesso.',
                amplo: 'Após a abertura ampla e a revisão dos registros, o comitê recuperou o controle do piloto. A comunidade ainda espera respostas sobre a expansão.',
                adiar: 'O piloto supervisionado começou depois de um período de preparação. A diferença de acesso que vocês observaram segue no centro do debate.'
            },
            antes: [
                { nome: '', texto: 'Três meses depois. O prazo da licença de teste está terminando.' },
                { nome: 'NICODEMOS', texto: 'A fornecedora oferece mais seis meses sem cobrança. Em troca, quer usar comandos e dados de uso da comunidade para aprimorar o próprio sistema.' },
                { nome: '{nome}', texto: 'O preço da proposta não aparece apenas na fatura. Precisamos entender o destino desses dados, as alternativas e o custo de sair da plataforma.' },
                { recurso: 'privacidade' }
            ],
            pergunta: 'Que recomendação o comitê deve apresentar sobre a proposta?',
            opcoes: [
                {
                    id: 'negociar',
                    texto: 'Negociar finalidade, proteção dos dados, alternativas de acesso e condições de saída antes de ampliar o contrato.',
                    passos: [
                        { nome: 'NICODEMOS', texto: 'A negociação atrasa o anúncio, mas deixa a comunidade informada e dá à universidade condições para avaliar o acordo.' },
                        { nome: '', texto: 'A expansão acontece por etapas, com dados necessários delimitados e revisão periódica do contrato.' }
                    ]
                },
                {
                    id: 'aceitar',
                    texto: 'Aceitar a extensão gratuita para não interromper o serviço e revisar os termos durante os primeiros meses.',
                    passos: [
                        { nome: 'NICODEMOS', texto: 'A continuidade ajudou quem já usa o assistente. Ao examinar os termos, porém, estudantes perceberam que seus comandos poderiam ter outra finalidade.' },
                        { recurso: 'privacidade' },
                        { atividade: { pergunta: 'O contrato ainda pode ser revisto. Qual informação precisa constar na proposta de negociação?', opcoes: [
                            { texto: 'Quais dados serão usados, para quê, por quanto tempo e como a comunidade poderá contestar esse uso.', adequada: true, retorno: 'Com esses pontos explícitos, a universidade consegue negociar limites verificáveis.' },
                            { texto: 'Somente a quantidade de novos usuários cadastrados.', retorno: 'O número de contas não esclarece o tratamento dos comandos e dados de uso.' },
                            { texto: 'A promessa informal de que os dados estarão seguros.', retorno: 'Uma promessa sem critérios não permite verificar as condições do serviço.' }
                        ] } },
                        { nome: 'NICODEMOS', texto: 'Suspendemos o compartilhamento adicional e renegociamos os termos. O serviço continua, mas agora a revisão é pública.' }
                    ]
                },
                {
                    id: 'interna',
                    texto: 'Preparar uma alternativa sob controle da universidade e reduzir a dependência da fornecedora.',
                    passos: [
                        { nome: 'NICODEMOS', texto: 'Ter uma alternativa própria pode ser importante. O prazo da licença, porém, é curto para desenvolver, testar e manter um serviço para todo o campus.' },
                        { recurso: 'governanca' },
                        { atividade: { pergunta: 'Como planejar uma alternativa sem interromper o apoio atual?', opcoes: [
                            { texto: 'Definir custos e etapas de desenvolvimento enquanto negocia um serviço provisório limitado.', adequada: true, retorno: 'O plano reduz dependência sem prometer uma solução imediata que a equipe não pode entregar.' },
                            { texto: 'Anunciar que a equipe criará uma plataforma completa em duas semanas.', retorno: 'A equipe precisa de tempo e recursos para testar, manter e oferecer suporte à plataforma.' },
                            { texto: 'Encerrar o serviço hoje e deixar a comunidade encontrar substitutos sozinha.', retorno: 'A interrupção repentina transfere o problema às pessoas que mais dependem do apoio.' }
                        ] } },
                        { nome: 'NICODEMOS', texto: 'Fechamos uma continuidade provisória e apresentamos um estudo de viabilidade para a solução institucional.' }
                    ]
                }
            ]
        }
    },

    gestor: {
        nivel: 'Intermediário',
        companheiro: 'LÍVIA',
        avatar: 'assets/images/npc_livia_stand.png',
        fundo1: 'assets/images/background_biblioteca.png',
        fundo2: 'assets/images/background_sala de aula.png',
        ato1: {
            antes: [
                { nome: '', texto: 'Como gestor educacional do Programa Horizonte IA, você recebe relatos de turmas com práticas muito diferentes de uso da ferramenta.' },
                { nome: 'LÍVIA', texto: 'Na disciplina do Augusto, a IA produz textos bem escritos em segundos. Alguns colegas usam para organizar perguntas; outros entregam o texto inteiro. Ninguém sabe qual processo será avaliado.' },
                { nome: '{nome}', texto: 'Preciso propor uma orientação que ajude estudantes e docentes a reconhecer aprendizagem, autoria e condições de acesso.' },
                { recurso: 'autoria' },
                { nome: 'LÍVIA', texto: 'Se a universidade puder definir uma regra para este primeiro trabalho, o que ela deve pedir aos participantes?' }
            ],
            pergunta: 'Que orientação você levará à turma e ao professor?',
            opcoes: [
                {
                    id: 'processo',
                    texto: 'Permitir a IA para organizar ideias; pedir fontes conferidas, texto próprio e explicação das decisões tomadas.',
                    passos: [
                        { nome: 'LÍVIA', texto: 'Posso usar a ferramenta para explorar caminhos sem esconder que a utilizei. A conversa com o professor continua importante.' },
                        { nome: '', texto: 'O professor recolhe esboços e promove uma defesa breve. A maioria consegue explicar o que fez, e surgem dúvidas que orientam a próxima aula.' }
                    ]
                },
                {
                    id: 'produto',
                    texto: 'Dar liberdade de ferramentas e avaliar primeiro a qualidade dos textos entregues, para não restringir estratégias de estudo.',
                    passos: [
                        { nome: 'LÍVIA', texto: 'Ganhei liberdade para experimentar. Mas dois textos muito bons não corresponderam ao que seus autores conseguiram explicar depois.' },
                        { nome: '', texto: 'Na apresentação, parte da turma reconhece que passou a confiar na fluência do texto sem investigar as afirmações.' },
                        { recurso: 'videoEstudo' },
                        { atividade: { pergunta: 'Que evidência ajudaria a avaliar a aprendizagem além do texto final?', opcoes: [
                            { texto: 'Pedir que cada estudante explique uma escolha, apresente uma fonte e mostre o que revisou.', adequada: true, retorno: 'A defesa revela o percurso sem impedir formas diferentes de produzir.' },
                            { texto: 'Considerar o texto suficiente porque sua redação parece madura.', retorno: 'A qualidade da redação não revela sozinha como o estudante construiu o entendimento.' },
                            { texto: 'Exigir apenas uma declaração genérica: “usei IA”.', retorno: 'A declaração ajuda, mas faltam a finalidade, as fontes e as decisões do estudante.' }
                        ] } },
                        { nome: '{nome}', texto: 'Acrescentamos uma defesa do processo e orientação sobre fontes. A liberdade de ferramentas agora vem acompanhada de evidências de aprendizagem.' }
                    ]
                },
                {
                    id: 'restricao',
                    texto: 'Restringir a ferramenta nesta primeira entrega para preservar uma referência inicial do trabalho dos estudantes.',
                    passos: [
                        { nome: 'LÍVIA', texto: 'Uma referência inicial pode ajudar. Alguns colegas, porém, não sabem se até um apoio de acessibilidade conta como uso proibido.' },
                        { nome: '', texto: 'As restrições diferentes entre disciplinas deixam estudantes inseguros. A gestão precisa distinguir apoio formativo, acessibilidade e produção substitutiva.' },
                        { recurso: 'equidade' },
                        { atividade: { pergunta: 'Como tornar o limite inicial mais claro e acessível?', opcoes: [
                            { texto: 'Descrever o que a atividade avalia, quais apoios são permitidos e como declarar cada uso.', adequada: true, retorno: 'Critérios claros ajudam docentes e estudantes a entender o objetivo da restrição.' },
                            { texto: 'Manter a regra vaga e decidir caso a caso depois da entrega.', retorno: 'A incerteza pode penalizar usos de apoio que não substituem a aprendizagem.' },
                            { texto: 'Impedir também recursos de acessibilidade para tratar todos de forma idêntica.', retorno: 'Condições idênticas podem criar barreiras distintas para estudantes com necessidades diferentes.' }
                        ] } },
                        { nome: '{nome}', texto: 'Publicamos critérios de uso e alternativas acessíveis. A turma agora sabe o que pode usar e o que precisa demonstrar.' }
                    ]
                }
            ]
        },
        ato2: {
            retorno: {
                processo: 'A orientação sobre rascunhos, fontes e defesa do processo deu aos professores mais evidências de aprendizagem. Um novo caso exige atenção à pesquisa em grupo.',
                produto: 'Após incluir a defesa do processo, as turmas passaram a distinguir melhor um texto fluente de uma compreensão demonstrada.',
                restricao: 'Os critérios publicados reduziram dúvidas sobre apoios permitidos. Agora a equipe precisa lidar com referências produzidas pela IA.'
            },
            antes: [
                { nome: '', texto: 'Três meses depois. Faltam duas horas para o envio de um artigo coletivo.' },
                { nome: 'LÍVIA', texto: 'Pedi à IA referências para nosso grupo. Ela devolveu autores conhecidos, títulos convincentes e números de identificação. Já inserimos tudo no texto.' },
                { nome: 'GIOVANA', texto: 'O grupo pediu orientação à gestão porque não conseguiu localizar dois desses artigos. O prazo é real, mas uma fonte inventada também tem consequências.' },
                { recurso: 'referencias' }
            ],
            pergunta: 'Como você orienta o grupo a concluir o trabalho?',
            opcoes: [
                {
                    id: 'verificar',
                    texto: 'Conferir os originais com o grupo, retirar referências inexistentes e negociar uma entrega transparente do que foi validado.',
                    passos: [
                        { nome: 'LÍVIA', texto: 'O identificador também era inventado. Refizemos a seção com fontes reais e explicamos ao professor onde a IA participou.' },
                        { nome: '{nome}', texto: 'A verificação consumiu tempo, mas permitiu avaliar a contribuição de cada pessoa sem esconder o problema.' }
                    ]
                },
                {
                    id: 'prazo',
                    texto: 'Entregar no horário para preservar o esforço coletivo e pedir uma conferência formal das referências logo depois.',
                    passos: [
                        { nome: 'LÍVIA', texto: 'Com a pressa, o grupo enviou referências que não conseguiu localizar. O professor suspendeu a avaliação enquanto investiga as fontes.' },
                        { recurso: 'referencias' },
                        { atividade: { pergunta: 'Como responder ao professor e organizar a correção?', opcoes: [
                            { texto: 'Informar quais referências não foram verificadas, localizar os originais e substituir o que não puder ser comprovado.', adequada: true, retorno: 'A revisão permite reparar o texto e documentar a responsabilidade coletiva.' },
                            { texto: 'Dizer que a IA garantiu que as referências existiam.', retorno: 'A resposta da ferramenta não substitui a consulta às publicações originais.' },
                            { texto: 'Alterar apenas os números de identificação para que pareçam válidos.', retorno: 'Uma referência precisa apontar para um trabalho real, não apenas seguir uma forma correta.' }
                        ] } },
                        { nome: 'LÍVIA', texto: 'Assumimos a falha e solicitamos prazo para uma versão corrigida. O professor aceita revisar o percurso do grupo.' }
                    ]
                },
                {
                    id: 'refazer',
                    texto: 'Retirar a seção inteira e encarregar uma pessoa da reescrita para evitar que o grupo publique referências duvidosas.',
                    passos: [
                        { nome: 'LÍVIA', texto: 'Entendo o cuidado, mas tomar a tarefa de todos sem conversar comigo enfraqueceu a colaboração. O novo texto também ficou superficial.' },
                        { recurso: 'autoria' },
                        { atividade: { pergunta: 'Que proposta recupera a qualidade do texto e a colaboração?', opcoes: [
                            { texto: 'Dividir a busca de fontes originais, comparar as evidências em grupo e revisar a seção juntos.', adequada: true, retorno: 'A tarefa volta a ser coletiva e cada afirmação pode ser examinada.' },
                            { texto: 'Pedir a uma pessoa que termine tudo sozinha e não consulte o restante do grupo.', retorno: 'Isso preserva a pressa que produziu o conflito e reduz a chance de revisão.' },
                            { texto: 'Restaurar as citações inventadas apenas para preencher a seção.', retorno: 'A forma completa do texto não compensa a ausência de fontes verificáveis.' }
                        ] } },
                        { nome: '{nome}', texto: 'Organizamos a revisão conjunta e pedimos um prazo justificado. Lívia participa da verificação e o grupo recupera seu trabalho.' }
                    ]
                }
            ]
        }
    },

    professor: {
        nivel: 'Avançado',
        companheiro: 'PROFESSOR AUGUSTO',
        avatar: 'assets/images/npc_professor_augusto_tela1.png',
        fundo1: 'assets/images/background_sala de aula.png',
        fundo2: 'assets/images/background_sala de informatica.png',
        ato1: {
            antes: [
                { nome: '', texto: 'Sala 12. Na mesa de Augusto há vinte trabalhos com estrutura semelhante. A disciplina pede que os estudantes expliquem conceitos de cultura digital.' },
                { nome: 'PROFESSOR AUGUSTO', texto: 'Não consigo concluir quem usou IA apenas olhando o estilo dos textos. O problema maior é não saber quem consegue aplicar as ideias fora dessas páginas.' },
                { nome: '{nome}', texto: 'Como professor visitante, preciso redesenhar a avaliação para produzir evidências de aprendizagem e ainda tornar os critérios viáveis para a turma.' },
                { recurso: 'videoEnsino' },
                { recurso: 'docencia' }
            ],
            pergunta: 'Como redesenhar a avaliação desta disciplina?',
            opcoes: [
                {
                    id: 'autentica',
                    texto: 'Propor um problema contextualizado, registrar as fontes e pedir uma defesa das decisões, com ou sem apoio de IA declarado.',
                    passos: [
                        { nome: 'PROFESSOR AUGUSTO', texto: 'Agora posso discutir por que cada solução foi escolhida. Teremos de definir critérios claros e tempo de acompanhamento, mas a autoria ficou mais visível.' },
                        { nome: '', texto: 'Os estudantes investigam um problema real e justificam caminhos diferentes. As dúvidas encontradas alimentam a aula seguinte.' }
                    ]
                },
                {
                    id: 'presencial',
                    texto: 'Priorizar etapas presenciais de escrita e diálogo para observar diretamente o raciocínio de cada estudante.',
                    passos: [
                        { nome: 'PROFESSOR AUGUSTO', texto: 'As conversas revelaram muito, mas a carga de trabalho aumentou e parte da turma sente que a pesquisa digital desapareceu da disciplina.' },
                        { recurso: 'docencia' },
                        { atividade: { pergunta: 'Como aproveitar a evidência presencial sem perder investigação e flexibilidade?', opcoes: [
                            { texto: 'Combinar uma etapa acompanhada com pesquisa contextualizada e defesa posterior das decisões.', adequada: true, retorno: 'As duas etapas mostram o processo e mantêm competências digitais relevantes.' },
                            { texto: 'Eliminar toda pesquisa e avaliar somente velocidade de escrita.', retorno: 'A rapidez de produção não demonstra necessariamente investigação ou aplicação.' },
                            { texto: 'Usar a conversa apenas para confirmar suspeitas sobre uso de IA.', retorno: 'A conversa pode revelar aprendizagem quando suas perguntas são abertas e ligadas aos objetivos.' }
                        ] } },
                        { nome: '{nome}', texto: 'Reformulamos o plano: há observação direta e investigação orientada. A turma sabe o que cada etapa procura demonstrar.' }
                    ]
                },
                {
                    id: 'detector',
                    texto: 'Manter os trabalhos atuais por enquanto e usar um detector como sinal para selecionar entregas que merecem diálogo.',
                    passos: [
                        { nome: 'PROFESSOR AUGUSTO', texto: 'O detector destacou textos de estudantes que registraram rascunhos próprios. A suspeita, mesmo provisória, começou a afetar a confiança da turma.' },
                        { recurso: 'integridade' },
                        { atividade: { pergunta: 'Como revisar a avaliação diante de um resultado que pode estar errado?', opcoes: [
                            { texto: 'Não tratar a detecção como prova; ouvir a turma, examinar o processo e oferecer critérios claros para todos.', adequada: true, retorno: 'A decisão volta a se apoiar em evidências de aprendizagem e em uma escuta justa.' },
                            { texto: 'Reprovar automaticamente todos os trabalhos sinalizados.', retorno: 'Um sinal não confirma autoria nem explica a aprendizagem de cada estudante.' },
                            { texto: 'Esconder o uso do detector e manter as suspeitas sem possibilidade de diálogo.', retorno: 'Sem transparência, a turma não consegue compreender ou contestar o critério.' }
                        ] } },
                        { nome: 'PROFESSOR AUGUSTO', texto: 'Pedimos desculpas pela forma como levantamos suspeitas e passamos a avaliar processo, fontes e defesa das escolhas.' }
                    ]
                }
            ]
        },
        ato2: {
            retorno: {
                autentica: 'As avaliações contextualizadas trouxeram bons resultados. Agora um trabalho de pesquisa mostra que bons critérios em sala precisam chegar também à orientação científica.',
                presencial: 'A combinação entre diálogo e pesquisa devolveu flexibilidade à disciplina. Um caso de pesquisa exige aplicar esse mesmo cuidado à orientação.',
                detector: 'Depois da crise causada pelo detector, a turma passou a exigir processos transparentes. Essa confiança será testada em uma publicação científica.'
            },
            antes: [
                { nome: '', texto: 'Três meses depois. Uma revista científica pede explicações sobre um trabalho de conclusão orientado por Augusto.' },
                { nome: 'PROFESSOR AUGUSTO', texto: 'Dados centrais do artigo não aparecem nos registros da pesquisa. A estudante disse que a IA sugeriu números plausíveis e ela os aceitou sem conferir. Eu também não identifiquei o problema na revisão.' },
                { nome: '{nome}', texto: 'Há uma publicação em avaliação, uma estudante que precisa ser ouvida e leitores que dependem da integridade dos resultados. Nossa resposta terá consequências para todos.' },
                { recurso: 'integridade' }
            ],
            pergunta: 'Qual encaminhamento você propõe para o artigo e para a orientação?',
            opcoes: [
                {
                    id: 'conjunto',
                    texto: 'Informar a revista, suspender o envio, revisar os dados com a estudante e assumir responsabilidades de orientação e autoria.',
                    passos: [
                        { nome: 'PROFESSOR AUGUSTO', texto: 'É uma decisão difícil. Precisamos reconhecer o erro sem reduzir a estudante ao erro, e revisar o método antes de qualquer novo envio.' },
                        { nome: '', texto: 'A revista recebe uma explicação formal. A universidade organiza formação para verificar dados e declarar o uso de ferramentas em pesquisa.' }
                    ]
                },
                {
                    id: 'individual',
                    texto: 'Pedir que a estudante explique o caso primeiro, enquanto a universidade protege o calendário e adia sua resposta institucional.',
                    passos: [
                        { nome: 'PROFESSOR AUGUSTO', texto: 'Ouvir a estudante é necessário. Ao deixar a resposta apenas com ela, porém, parecemos ignorar que a orientação também validou o trabalho.' },
                        { recurso: 'integridade' },
                        { atividade: { pergunta: 'Que resposta reconhece o papel das pessoas envolvidas?', opcoes: [
                            { texto: 'Ouvir a estudante, informar a revista e registrar como orientador e instituição irão revisar o processo.', adequada: true, retorno: 'A resposta combina escuta, prestação de contas e revisão das condições de orientação.' },
                            { texto: 'Declarar que toda a responsabilidade é da ferramenta.', retorno: 'A ferramenta não assina o artigo nem substitui a verificação humana.' },
                            { texto: 'Punir a estudante antes de ouvi-la para proteger a imagem institucional.', retorno: 'Uma decisão sem escuta não examina o processo nem a responsabilidade da orientação.' }
                        ] } },
                        { nome: 'PROFESSOR AUGUSTO', texto: 'Enviamos uma resposta conjunta e abrimos uma revisão orientada, com direito de manifestação da estudante.' }
                    ]
                },
                {
                    id: 'revisao',
                    texto: 'Retirar os números contestados e tentar reconstruir rapidamente a análise antes de divulgar o ocorrido.',
                    passos: [
                        { nome: 'PROFESSOR AUGUSTO', texto: 'Ao tentar corrigir apenas a tabela, percebemos que parte da interpretação dependia dos dados inexistentes. A revista ainda espera uma resposta.' },
                        { recurso: 'docencia' },
                        { atividade: { pergunta: 'O que uma revisão completa deve incluir antes de qualquer reenvio?', opcoes: [
                            { texto: 'Rastrear dados e método, avisar a revista, consultar a estudante e documentar alterações e uso da IA.', adequada: true, retorno: 'A rastreabilidade permite avaliar a extensão do problema e justificar o próximo passo.' },
                            { texto: 'Substituir os valores até a conclusão parecer semelhante à original.', retorno: 'Uma conclusão desejada não determina quais dados são válidos.' },
                            { texto: 'Reenviar sem explicar as alterações porque a primeira versão ainda não foi publicada.', retorno: 'A revista já questionou a integridade dos dados e precisa conhecer a revisão.' }
                        ] } },
                        { nome: '{nome}', texto: 'Interrompemos o envio, comunicamos o alcance da falha e propomos uma política de verificação para próximas orientações.' }
                    ]
                }
            ]
        }
    }
};

const desfechosAtos = {
    A: {
        titulo: 'HORIZONTE EXPANDIDO',
        texto: 'A Universidade Horizonte amplia o programa por etapas. Cada expansão inclui suporte humano, alternativas de acesso e indicadores públicos de aprendizagem e participação. A comunidade experimenta novas possibilidades sabendo onde encontrar ajuda e como pedir mudanças.'
    },
    B: {
        titulo: 'PRESENÇA QUE ORIENTA',
        texto: 'A universidade prioriza tempo de acompanhamento, formação e decisões pedagógicas compartilhadas. A IA participa de tarefas delimitadas; estudantes, professores e equipes recebem condições reais para discutir seus efeitos antes de cada nova ampliação.'
    },
    C: {
        titulo: 'INOVAÇÃO RESPONSÁVEL',
        texto: 'A universidade cria uma política de uso verificável: declarações de processo, revisão de fontes e dados, limites para fornecedores e canais de contestação. Os resultados serão avaliados com participação da comunidade para que nenhuma ferramenta se torne uma resposta automática.'
    }
};
