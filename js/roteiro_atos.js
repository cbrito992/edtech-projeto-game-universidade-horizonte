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
    },
    nivelamentoInclusao: {
        nivelamento: true,
        dimensao: 'Inclusão e condições de participação',
        titulo: 'Quem consegue participar desta decisão?',
        descricao: 'A mesma política pode produzir experiências diferentes conforme acesso, conectividade, acessibilidade e disponibilidade de apoio humano.',
        pontos: ['Identifique quem pode ficar de fora ou depender de uma alternativa.', 'Considere suporte e acessibilidade como parte da implementação.', 'Pergunte como a comunidade poderá relatar barreiras e participar das revisões.'],
        url: 'https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa'
    },
    nivelamentoMediacao: {
        nivelamento: true,
        dimensao: 'Mediação humana e aprendizagem',
        titulo: 'O que ainda precisa de acompanhamento humano?',
        descricao: 'Automatizar uma etapa não elimina a necessidade de escuta, orientação e evidências de aprendizagem. O desafio é definir onde a presença humana é indispensável.',
        pontos: ['Relacione a ferramenta ao objetivo pedagógico da atividade.', 'Preveja momentos de diálogo, explicação e revisão.', 'Evite transformar rapidez ou aparência de qualidade em prova de aprendizagem.'],
        url: 'https://www.unesco.org/pt/articles/marco-referencial-de-competencias-em-ia-para-professores'
    },
    nivelamentoTransparencia: {
        nivelamento: true,
        dimensao: 'Transparência e responsabilidade',
        titulo: 'Como tornar a decisão verificável?',
        descricao: 'Uma decisão responsável permite compreender fontes, dados, critérios, limites e responsáveis. Transparência também cria condições para corrigir e contestar.',
        pontos: ['Registre como a IA participou do processo.', 'Confira fontes, dados e condições do serviço.', 'Defina responsáveis, formas de contestação e critérios para rever a decisão.'],
        url: 'https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa'
    }
};

// Cada escolha destaca uma prioridade e deixa outra dimensão menos explorada.
// O recurso correspondente surge durante o ato como ampliação de perspectiva,
// sem atribuir nota ou classificar a resposta como certa ou errada.
const nivelamentoPorEscolha = {
    estagiario: {
        ato1: { auditavel: 'nivelamentoInclusao', amplo: 'nivelamentoTransparencia', adiar: 'nivelamentoMediacao' },
        ato2: { negociar: 'nivelamentoInclusao', aceitar: 'nivelamentoTransparencia', interna: 'nivelamentoMediacao' }
    },
    gestor: {
        ato1: { processo: 'nivelamentoInclusao', produto: 'nivelamentoMediacao', restricao: 'nivelamentoTransparencia' },
        ato2: { verificar: 'nivelamentoInclusao', prazo: 'nivelamentoTransparencia', refazer: 'nivelamentoMediacao' }
    },
    professor: {
        ato1: { autentica: 'nivelamentoInclusao', presencial: 'nivelamentoTransparencia', detector: 'nivelamentoMediacao' },
        ato2: { conjunto: 'nivelamentoInclusao', individual: 'nivelamentoTransparencia', revisao: 'nivelamentoMediacao' }
    }
};

const roteirosAtos = {
    "estagiario": {
        "nivel": "Fácil",
        "companheiro": "NICODEMOS",
        "avatar": "assets/images/npc_nicodemos.png",
        "fundo1": "assets/images/background_sala de informatica.webp",
        "fundo2": "assets/images/background_hall.webp",
        "ato1": {
            "antes": [
                {
                    "nome": "",
                    "texto": "Primeira semana do Programa Horizonte IA. A universidade vai testar um assistente para explicar conteúdos, organizar estudos e orientar a busca de informações acadêmicas. A equipe de TI precisa preparar o acesso antes da primeira atividade."
                },
                {
                    "nome": "NICODEMOS",
                    "texto": "Giovana me colocou como seu supervisor no estágio. Precisamos levantar as condições do laboratório e ouvir os estudantes. A autorização do piloto será da coordenação; nosso trabalho é apresentar evidências e uma recomendação."
                },
                {
                    "nome": "{nome}",
                    "texto": "O que já sabemos sobre quem vai usar o assistente?"
                },
                {
                    "nome": "NICODEMOS",
                    "texto": "Lívia estuda à noite e pediu ajuda fora do horário da monitoria. Outros colegas só têm internet no campus. O laboratório fecha antes de parte dessa turma chegar, e ainda estamos testando o leitor de tela."
                },
                {
                    "nome": "{nome}",
                    "texto": "Então criar uma conta não garante participação. Vou registrar horários, equipamentos, barreiras de acessibilidade e a capacidade de atendimento da equipe."
                },
                {
                    "nome": "NICODEMOS",
                    "texto": "A licença de teste dura três meses. Se as disciplinas passarem a depender dela, precisaremos planejar o que acontece quando acabar. Vamos consultar os critérios de implantação antes de recomendar a abertura."
                },
                {
                    "recurso": "governanca"
                },
                {
                    "nome": "{nome}",
                    "texto": "Com esses critérios, precisamos escolher como investigar usos reais sem prometer um suporte que ainda não temos."
                }
            ],
            "pergunta": "Que plano de acesso você recomenda à supervisão do estágio?",
            "opcoes": [
                {
                    "id": "auditavel",
                    "texto": "Recomendar um piloto com participantes de diferentes turnos e necessidades, suporte reservado e critérios públicos de ampliação.",
                    "passos": [
                        {
                            "nome": "NICODEMOS",
                            "texto": "Sua proposta inclui quem enfrenta barreiras, em vez de chamar só quem já domina a ferramenta. Vou levá-la à Giovana. Mas quem ficar fora desta etapa precisará de uma alternativa."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Incluí monitoria e materiais equivalentes no relatório. Também proponho testar o acesso noturno e ouvir quem usa leitor de tela."
                        },
                        {
                            "nome": "",
                            "texto": "A coordenação autoriza a primeira turma. Os registros mostram dúvidas resolvidas fora da aula e falhas de acessibilidade que precisam ser corrigidas antes de expandir."
                        }
                    ]
                },
                {
                    "id": "amplo",
                    "texto": "Abrir o acesso para toda a comunidade e aprender com uma variedade maior de situações reais desde o início.",
                    "passos": [
                        {
                            "nome": "NICODEMOS",
                            "texto": "A coordenação aprovou nossa recomendação de abertura ampla. Recebemos relatos de usos importantes fora do horário da monitoria, mas os pedidos de ajuda ultrapassaram a capacidade da equipe. Um teste mostrou que o painel de suporte dava acesso a históricos além do necessário."
                        },
                        {
                            "nome": "",
                            "texto": "Giovana limita o painel e pede um levantamento do ocorrido. Você registra a falha, preserva as informações para análise da equipe responsável e prepara um aviso aos participantes. A abertura trouxe acesso, mas também responsabilidades que o plano não previa."
                        },
                        {
                            "recurso": "privacidade"
                        },
                        {
                            "atividade": {
                                "pergunta": "Qual ação ajuda a conter o problema sem abandonar quem já depende do serviço?",
                                "opcoes": [
                                    {
                                        "texto": "Suspender temporariamente as funções afetadas, informar a comunidade e revisar os registros com a equipe responsável.",
                                        "adequada": true,
                                        "retorno": "A contenção cria espaço para investigar e comunicar o ocorrido."
                                    },
                                    {
                                        "texto": "Manter tudo aberto e esperar que o aumento de capacidade resolva também a dúvida sobre os dados.",
                                        "retorno": "Mais capacidade pode reduzir a lentidão, mas não esclarece o tratamento dos dados. Examine essa parte também."
                                    },
                                    {
                                        "texto": "Desligar o sistema sem aviso e considerar o incidente encerrado.",
                                        "retorno": "Interromper o acesso pode ser necessário, mas as pessoas afetadas ainda precisam de informação e suporte."
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "NICODEMOS",
                            "texto": "A equipe responsável restringiu o painel e revisou as permissões. Seu relatório recomenda suporte proporcional à demanda e revisão de acesso aos históricos antes de uma nova expansão."
                        }
                    ]
                },
                {
                    "id": "adiar",
                    "texto": "Aguardar garantias mais sólidas de acesso e privacidade antes de disponibilizar a ferramenta na rede universitária.",
                    "passos": [
                        {
                            "nome": "NICODEMOS",
                            "texto": "Giovana aceitou nossa recomendação de aguardar os testes. Só que Lívia contou que parte da turma já está usando contas pessoais. Quem paga uma assinatura recebe recursos que os demais não têm."
                        },
                        {
                            "nome": "",
                            "texto": "O comitê encontra uma diferença crescente entre quem pode pagar por serviços avançados e quem depende das opções gratuitas."
                        },
                        {
                            "recurso": "equidade"
                        },
                        {
                            "atividade": {
                                "pergunta": "Que medida responde à desigualdade encontrada?",
                                "opcoes": [
                                    {
                                        "texto": "Criar um piloto supervisionado com acesso gratuito e uma alternativa para quem não pode usar a plataforma.",
                                        "adequada": true,
                                        "retorno": "Essa medida permite oferecer apoio e aprender com condições de acesso diversas."
                                    },
                                    {
                                        "texto": "Manter o bloqueio apenas no Wi-Fi institucional e considerar que ninguém mais usará IA.",
                                        "retorno": "Redes móveis e plataformas externas continuam disponíveis de forma desigual."
                                    },
                                    {
                                        "texto": "Oferecer acesso somente a quem já possui conta paga.",
                                        "retorno": "Isso aumenta justamente a diferença que o comitê identificou."
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "NICODEMOS",
                            "texto": "Levamos os relatos à coordenação, que autorizou um piloto supervisionado com alternativas. A espera permitiu preparar o serviço, mas mostrou que adiar a oferta institucional não interrompe o uso externo."
                        }
                    ]
                }
            ]
        },
        "ato2": {
            "retorno": {
                "auditavel": "Os registros do piloto limitado mostram benefícios no estudo noturno e barreiras ainda abertas. Eles serão a base do relatório sobre continuidade e expansão.",
                "amplo": "A abertura ampla revelou demanda e uma falha de permissões. O relatório da revisão precisa demonstrar como a continuidade evitará repetir a sobrecarga e a exposição.",
                "adiar": "A escuta durante a espera mostrou diferenças entre contas pessoais pagas e gratuitas. O novo relatório deve considerar essas pessoas ao avaliar a continuidade institucional."
            },
            "antes": [
                {
                    "nome": "",
                    "texto": "Três meses depois, o piloto chega à revisão prevista. Faltam dez dias para a licença expirar e uma atividade de estudo já utiliza o assistente como apoio opcional."
                },
                {
                    "nome": "NICODEMOS",
                    "texto": "A mesma fornecedora que cedeu a licença oferece seis meses sem cobrança. O novo termo permite reutilizar comandos e respostas para aprimorar o sistema. Depois disso, a universidade terá de pagar por usuário ou reduzir as contas."
                },
                {
                    "nome": "{nome}",
                    "texto": "Os registros mostram que há estudantes usando o apoio à noite. Interromper sem alternativa os prejudica; continuar sem examinar os termos também pode expor o que escrevem."
                },
                {
                    "nome": "NICODEMOS",
                    "texto": "Uma estudante inseriu um relato pessoal ao pedir uma explicação. Não sabemos se esses conteúdos entram na reutilização. Giovana pediu que levantássemos essa dúvida, os custos futuros e as condições para sair do serviço."
                },
                {
                    "nome": "{nome}",
                    "texto": "Vou comparar o termo com as necessidades que observamos. Nosso parecer será técnico e preliminar; contratação e tratamento de dados precisam das equipes responsáveis e da decisão institucional."
                },
                {
                    "recurso": "privacidade"
                },
                {
                    "nome": "NICODEMOS",
                    "texto": "Depois da leitura, quais condições você colocaria no relatório? Precisamos explicar tanto o risco dos dados quanto o efeito de uma interrupção."
                }
            ],
            "pergunta": "Que encaminhamento você recomenda à Giovana para a revisão da licença?",
            "opcoes": [
                {
                    "id": "negociar",
                    "texto": "Recomendar negociação de limites para dados, custo futuro e saída, com apoio alternativo durante a análise institucional.",
                    "passos": [
                        {
                            "nome": "NICODEMOS",
                            "texto": "Seu relatório relaciona cada cláusula a um uso observado. Giovana encaminha a proposta às equipes de contratação e proteção de dados; a fornecedora terá de responder por escrito."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Enquanto aguardamos, proponho manter monitoria e materiais acessíveis. A atividade não pode exigir que estudantes aceitem condições ainda em análise."
                        },
                        {
                            "nome": "",
                            "texto": "A universidade negocia uma transição limitada, sem reutilização adicional de conteúdos. A ampliação fica condicionada à análise do contrato, do orçamento e das barreiras encontradas."
                        }
                    ]
                },
                {
                    "id": "aceitar",
                    "texto": "Recomendar continuidade temporária, condicionada à suspensão da reutilização de conteúdos e à revisão institucional em prazo definido.",
                    "passos": [
                        {
                            "nome": "NICODEMOS",
                            "texto": "A continuidade protege o apoio noturno, mas só pode ocorrer se a fornecedora aceitar a condição e a equipe responsável validar o termo. Quem acompanha esse prazo?"
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Proponho que Giovana designe responsáveis pela revisão e publique um calendário. Se a condição não for aceita, ativamos a monitoria e os materiais de apoio."
                        },
                        {
                            "recurso": "privacidade"
                        },
                        {
                            "nome": "",
                            "texto": "A equipe responsável aprova uma extensão transitória com a reutilização adicional suspensa. O serviço permanece disponível, mas o custo por usuário e a saída continuam pendentes para o Conselho."
                        }
                    ]
                },
                {
                    "id": "interna",
                    "texto": "Recomendar estudo de uma alternativa institucional, comparando manutenção, acessibilidade e uma transição com apoio humano.",
                    "passos": [
                        {
                            "nome": "NICODEMOS",
                            "texto": "Você pode levantar requisitos e testar opções comigo. Desenvolver ou hospedar uma alternativa exige orçamento, equipe e prazo; não podemos prometer uma plataforma pronta para a próxima semana."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou usar os relatos do piloto para comparar opções: horários de acesso, leitor de tela, proteção de conteúdos e capacidade de suporte. Controle institucional também exige manutenção."
                        },
                        {
                            "recurso": "governanca"
                        },
                        {
                            "nome": "",
                            "texto": "Giovana recebe o estudo preliminar e leva custos e etapas ao Conselho. Durante a avaliação, a universidade negocia acesso transitório limitado e mantém alternativas de estudo; a migração ainda depende de viabilidade."
                        }
                    ]
                }
            ]
        }
    },
    "gestor": {
        "nivel": "Intermediário",
        "companheiro": "LÍVIA",
        "avatar": "assets/images/npc_livia_stand.png",
        "fundo1": "assets/images/background_biblioteca.webp",
        "fundo2": "assets/images/background_sala de aula.webp",
        "ato1": {
            "antes": [
                {
                    "nome": "",
                    "texto": "Primeiro mês do Horizonte IA. Duas disciplinas e o laboratório de apoio participam do piloto. Como gestor educacional, você deve articular estudantes, docentes e TI para levar uma proposta de implantação ao Conselho."
                },
                {
                    "nome": "LÍVIA",
                    "texto": "Na minha turma, uma professora permite organizar ideias com IA. Em outra disciplina, ninguém explicou a regra. Tenho medo de usar até para entender uma pergunta e depois ser acusada de fraude."
                },
                {
                    "nome": "{nome}",
                    "texto": "Precisamos de uma orientação institucional comum, preservando a decisão pedagógica de cada disciplina. O que mais está dificultando a participação?"
                },
                {
                    "nome": "LÍVIA",
                    "texto": "A monitoria fecha cedo. Alguns colegas pagam ferramentas melhores. E pedir rascunhos toda semana pode ajudar, mas precisamos saber quem vai ler e dar retorno."
                },
                {
                    "nome": "{nome}",
                    "texto": "Vou reunir essas demandas com a carga de trabalho docente e os dados de suporte da TI. Uma política só funciona se houver tempo, pessoas e alternativas para cumpri-la."
                },
                {
                    "recurso": "autoria"
                },
                {
                    "nome": "LÍVIA",
                    "texto": "Então o Conselho vai discutir condições de participação e acompanhamento, além de dizer se podemos usar IA?"
                },
                {
                    "nome": "{nome}",
                    "texto": "Sim. Vou apresentar uma prioridade para esta etapa, com limites, recursos necessários e data de revisão."
                }
            ],
            "pergunta": "Que orientação institucional você propõe para esta fase do Horizonte IA?",
            "opcoes": [
                {
                    "id": "processo",
                    "texto": "Construir critérios comuns de declaração de uso e evidências de aprendizagem, com formação e tempo de acompanhamento.",
                    "passos": [
                        {
                            "nome": "LÍVIA",
                            "texto": "Saber o que declarar me dá segurança. Só espero que isso não vire um formulário que ninguém discute."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou reservar encontros de formação e negociar com as coordenações um registro breve. Cada docente explicará como esse registro se relaciona ao objetivo da atividade."
                        },
                        {
                            "nome": "",
                            "texto": "O Conselho aprova a orientação para o piloto. As turmas ganham critérios comuns, mas a gestão precisa redistribuir horas de acompanhamento para não sobrecarregar os professores."
                        }
                    ]
                },
                {
                    "id": "produto",
                    "texto": "Ampliar a autonomia das disciplinas com uma base comum de acesso, apoio e avaliação dos resultados do piloto.",
                    "passos": [
                        {
                            "nome": "LÍVIA",
                            "texto": "Podemos experimentar formas diferentes de estudar. Como vamos saber se uma turma está aprendendo mais ou só produzindo mais rápido?"
                        },
                        {
                            "nome": "{nome}",
                            "texto": "As coordenações vão comparar relatos, amostras comentadas e barreiras de participação. O docente continua responsável pela avaliação; a gestão reúne evidências para rever a implantação."
                        },
                        {
                            "recurso": "nivelamentoMediacao"
                        },
                        {
                            "nome": "",
                            "texto": "O Conselho mantém a experimentação em diferentes disciplinas. Os resultados variados ampliam o aprendizado institucional, mas dificultam comparar experiências sem ouvir estudantes e professores."
                        }
                    ]
                },
                {
                    "id": "restricao",
                    "texto": "Delimitar usos e turmas nesta etapa, garantindo alternativas acessíveis enquanto a universidade prepara equipes e infraestrutura.",
                    "passos": [
                        {
                            "nome": "LÍVIA",
                            "texto": "Entendo começar com limites. Mas quem ficar fora vai continuar usando ferramentas particulares, e alguns dependem de recursos de acessibilidade."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Os limites serão por finalidade e capacidade de suporte. Vou consultar os setores de acessibilidade e garantir uma rota equivalente para quem não participar."
                        },
                        {
                            "recurso": "equidade"
                        },
                        {
                            "nome": "",
                            "texto": "O Conselho delimita o piloto e publica critérios de participação. A preparação reduz a pressão sobre as equipes; permanece a necessidade de ouvir quem não recebeu acesso institucional."
                        }
                    ]
                }
            ]
        },
        "ato2": {
            "retorno": {
                "processo": "Os critérios comuns tornaram o processo mais visível, mas aumentaram a demanda por orientação. Agora você precisa avaliar se há equipe e orçamento para sustentá-los.",
                "produto": "A autonomia revelou usos e resultados variados. A revisão precisa reunir evidências comparáveis sem transformar quantidade de entregas em prova de aprendizagem.",
                "restricao": "O escopo limitado permitiu preparar equipes, mas os relatos de quem ficou de fora precisam entrar na decisão sobre a próxima etapa."
            },
            "antes": [
                {
                    "nome": "",
                    "texto": "Fim dos três meses do piloto. O Conselho precisa decidir sobre a próxima etapa antes do vencimento da licença. O relatório deve reunir acesso, aprendizagem, carga de trabalho e condições do serviço."
                },
                {
                    "nome": "LÍVIA",
                    "texto": "O painel destaca mais acessos e entregas mais rápidas. Mas colegas dizem que não conseguem explicar alguns textos. Outros nem entraram na plataforma porque o laboratório fecha cedo."
                },
                {
                    "nome": "{nome}",
                    "texto": "O número de acessos mostra uso, mas não basta para demonstrar aprendizagem ou inclusão. Vou confrontar o painel com relatos e amostras analisadas pelos professores."
                },
                {
                    "nome": "LÍVIA",
                    "texto": "Augusto encontrou referências inexistentes em trabalhos. A ferramenta respondeu com segurança, e os grupos acharam que uma referência bem formatada já era confiável."
                },
                {
                    "nome": "{nome}",
                    "texto": "A revisão das fontes pertence às atividades e à orientação docente. À gestão cabe garantir formação, tempo de verificação e um procedimento de atendimento para que cada turma não tenha de resolver tudo sozinha."
                },
                {
                    "recurso": "referencias"
                },
                {
                    "nome": "LÍVIA",
                    "texto": "E como responder ao prazo do Conselho sem anunciar que o piloto foi um sucesso só porque teve muitos acessos?"
                }
            ],
            "pergunta": "Como você encaminha a avaliação institucional e a continuidade do programa?",
            "opcoes": [
                {
                    "id": "verificar",
                    "texto": "Validar o relatório com representantes das turmas, docentes e TI, e condicionar a expansão a evidências e recursos de suporte.",
                    "passos": [
                        {
                            "nome": "LÍVIA",
                            "texto": "Quero que os relatos de quem não conseguiu participar também apareçam. Isso muda a leitura dos números."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "A proposta reunirá participação, evidências de aprendizagem, barreiras e carga das equipes. Vou negociar prazo para a escuta e apresentar o que já sabemos sem ocultar as lacunas."
                        },
                        {
                            "nome": "",
                            "texto": "O Conselho recebe uma avaliação participativa. A decisão de ampliar fica vinculada à formação, a horários de acesso e à revisão das condições da licença. A consulta exige tempo e o atendimento atual permanece delimitado."
                        }
                    ]
                },
                {
                    "id": "prazo",
                    "texto": "Apresentar no prazo um relatório preliminar, manter o escopo atual e fixar responsáveis e data para completar a avaliação.",
                    "passos": [
                        {
                            "nome": "LÍVIA",
                            "texto": "O prazo será cumprido. Mas a palavra preliminar precisa aparecer no comunicado, senão vão entender que o programa já foi validado."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou separar resultados observados de perguntas em aberto. A continuidade será temporária e dependerá da análise da licença; não será autorização para ampliar as turmas."
                        },
                        {
                            "nome": "",
                            "texto": "O Conselho mantém o atendimento atual sob condições transitórias e cobra a avaliação completa na data definida. A continuidade evita uma ruptura, mas adia a entrada de novas turmas e mantém pressão sobre as equipes."
                        }
                    ]
                },
                {
                    "id": "refazer",
                    "texto": "Reorganizar a implantação por etapas, priorizando formação, acessibilidade e apoio humano antes de acrescentar novos usos.",
                    "passos": [
                        {
                            "nome": "LÍVIA",
                            "texto": "Isso responde a problemas que vivemos. Como garantir que a reorganização não tire apoio de quem já usa o assistente à noite?"
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou preservar alternativas de estudo e pactuar a transição com as coordenações. Cada etapa terá responsáveis, orçamento estimado e critérios para avançar; as turmas participarão da revisão."
                        },
                        {
                            "nome": "",
                            "texto": "O Conselho aprova a reorganização, sem expansão imediata. O investimento em equipes e acessibilidade ganha prioridade, enquanto a universidade explica à comunidade por que algumas funcionalidades terão de esperar."
                        }
                    ]
                }
            ]
        }
    },
    "professor": {
        "nivel": "Difícil",
        "companheiro": "PROFESSOR AUGUSTO",
        "avatar": "assets/images/npc_professor_augusto_tela1.png",
        "fundo1": "assets/images/background_sala de aula.webp",
        "fundo2": "assets/images/background_sala de informatica.webp",
        "ato1": {
            "antes": [
                {
                    "nome": "",
                    "texto": "Sala 12, primeiro mês do Horizonte IA. Você participa como professor visitante da disciplina de Cultura Digital, ao lado de Augusto. A turma foi convidada a testar o assistente institucional para discutir um problema do campus."
                },
                {
                    "nome": "PROFESSOR AUGUSTO",
                    "texto": "Pedi uma análise sobre inclusão digital. Recebi vinte textos bem organizados, mas, quando perguntei como as propostas atenderiam o turno noturno, vários estudantes não conseguiram explicar."
                },
                {
                    "nome": "{nome}",
                    "texto": "O objetivo era analisar condições reais e justificar uma intervenção. Precisamos descobrir como a ferramenta entrou no processo e o que a atividade permitiu aprender."
                },
                {
                    "nome": "PROFESSOR AUGUSTO",
                    "texto": "Lívia disse que a IA ajudou a formular perguntas. Outro grupo aceitou uma proposta pronta sem verificar os horários do laboratório. Eu anunciei o recurso, mas não expliquei como avaliaríamos seu uso."
                },
                {
                    "nome": "{nome}",
                    "texto": "Vamos ouvir a turma e redesenhar a próxima etapa. A implantação precisa mostrar onde a IA apoia a investigação e onde o estudante deve confrontar a resposta com o contexto."
                },
                {
                    "recurso": "videoEnsino"
                },
                {
                    "recurso": "docencia"
                },
                {
                    "nome": "PROFESSOR AUGUSTO",
                    "texto": "Depois desses materiais, que evidências vamos pedir para avaliar o objetivo da disciplina sem transformar a aula numa investigação de suspeitos?"
                }
            ],
            "pergunta": "Como redesenhar a avaliação desta disciplina?",
            "opcoes": [
                {
                    "id": "autentica",
                    "texto": "Propor um problema contextualizado, registrar as fontes e pedir uma defesa das decisões, com ou sem apoio de IA declarado.",
                    "passos": [
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "Agora posso discutir por que cada solução foi escolhida. Teremos de definir critérios claros e tempo de acompanhamento, mas a autoria ficou mais visível."
                        },
                        {
                            "nome": "",
                            "texto": "Os estudantes investigam um problema real e justificam caminhos diferentes. As dúvidas encontradas alimentam a aula seguinte."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou levar à gestão as horas de orientação e as barreiras de acesso observadas. Essa experiência precisa orientar a próxima etapa do Horizonte IA."
                        }
                    ]
                },
                {
                    "id": "presencial",
                    "texto": "Priorizar etapas presenciais de escrita e diálogo para observar diretamente o raciocínio de cada estudante.",
                    "passos": [
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "As conversas revelaram muito, mas a carga de trabalho aumentou e parte da turma sente que a pesquisa digital desapareceu da disciplina."
                        },
                        {
                            "recurso": "docencia"
                        },
                        {
                            "atividade": {
                                "pergunta": "Como aproveitar a evidência presencial sem perder investigação e flexibilidade?",
                                "opcoes": [
                                    {
                                        "texto": "Combinar uma etapa acompanhada com pesquisa contextualizada e defesa posterior das decisões.",
                                        "adequada": true,
                                        "retorno": "As duas etapas mostram o processo e mantêm competências digitais relevantes."
                                    },
                                    {
                                        "texto": "Eliminar toda pesquisa e avaliar somente velocidade de escrita.",
                                        "retorno": "A rapidez de produção não demonstra necessariamente investigação ou aplicação."
                                    },
                                    {
                                        "texto": "Usar a conversa apenas para confirmar suspeitas sobre uso de IA.",
                                        "retorno": "A conversa pode revelar aprendizagem quando suas perguntas são abertas e ligadas aos objetivos."
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Reformulamos o plano: há observação direta e investigação orientada. A turma sabe o que cada etapa procura demonstrar."
                        }
                    ]
                },
                {
                    "id": "detector",
                    "texto": "Manter os trabalhos atuais por enquanto e usar um detector como sinal para selecionar entregas que merecem diálogo.",
                    "passos": [
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "O detector destacou textos de estudantes que registraram rascunhos próprios. A suspeita, mesmo provisória, começou a afetar a confiança da turma."
                        },
                        {
                            "recurso": "integridade"
                        },
                        {
                            "atividade": {
                                "pergunta": "Como revisar a avaliação diante de um resultado que pode estar errado?",
                                "opcoes": [
                                    {
                                        "texto": "Não tratar a detecção como prova; ouvir a turma, examinar o processo e oferecer critérios claros para todos.",
                                        "adequada": true,
                                        "retorno": "A decisão volta a se apoiar em evidências de aprendizagem e em uma escuta justa."
                                    },
                                    {
                                        "texto": "Reprovar automaticamente todos os trabalhos sinalizados.",
                                        "retorno": "Um sinal não confirma autoria nem explica a aprendizagem de cada estudante."
                                    },
                                    {
                                        "texto": "Esconder o uso do detector e manter as suspeitas sem possibilidade de diálogo.",
                                        "retorno": "Sem transparência, a turma não consegue compreender ou contestar o critério."
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "Pedimos desculpas pela forma como levantamos suspeitas e passamos a avaliar processo, fontes e defesa das escolhas."
                        }
                    ]
                }
            ]
        },
        "ato2": {
            "retorno": {
                "autentica": "As avaliações contextualizadas trouxeram bons resultados. Agora um trabalho de pesquisa mostra que bons critérios em sala precisam chegar também à orientação científica.",
                "presencial": "A combinação entre diálogo e pesquisa devolveu flexibilidade à disciplina. Um caso de pesquisa exige aplicar esse mesmo cuidado à orientação.",
                "detector": "Depois da crise causada pelo detector, a turma passou a exigir processos transparentes. Essa confiança será testada em uma publicação científica."
            },
            "antes": [
                {
                    "nome": "",
                    "texto": "Três meses depois, a mesma turma transforma a investigação sobre inclusão digital em um artigo para uma revista de práticas universitárias. Você e Augusto acompanham a pesquisa como docentes; o uso de IA foi declarado."
                },
                {
                    "nome": "PROFESSOR AUGUSTO",
                    "texto": "A revista perguntou de onde vieram os números sobre estudantes sem internet. Conferi com a turma: a IA sugeriu valores para exemplificar uma tabela, e eles entraram na análise como se fossem dados coletados. Eu revisei a redação e não rastreei a origem."
                },
                {
                    "nome": "{nome}",
                    "texto": "Então o problema de verificar respostas voltou em outra etapa. Precisamos ouvir os autores, distinguir registros reais de exemplos gerados e avisar à revista o que ainda não podemos sustentar."
                },
                {
                    "nome": "PROFESSOR AUGUSTO",
                    "texto": "A estudante que montou a tabela está com medo de perder o trabalho inteiro. E a gestão esperava usar o artigo como evidência de sucesso do Horizonte IA."
                },
                {
                    "nome": "{nome}",
                    "texto": "O caso precisa informar a revisão do programa, sem expor a estudante como símbolo de fracasso. O artigo só pode sustentar conclusões compatíveis com dados verificados."
                },
                {
                    "recurso": "integridade"
                },
                {
                    "nome": "PROFESSOR AUGUSTO",
                    "texto": "Que encaminhamento você propõe? Temos responsabilidade com a formação da turma, com os leitores e com o que a universidade vai aprender com esse piloto."
                }
            ],
            "pergunta": "Qual encaminhamento você propõe para o artigo e para a orientação?",
            "opcoes": [
                {
                    "id": "conjunto",
                    "texto": "Informar a revista, suspender o envio, revisar os dados com a estudante e assumir responsabilidades de orientação e autoria.",
                    "passos": [
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "É uma decisão difícil. Precisamos reconhecer o erro sem reduzir a estudante ao erro, e revisar o método antes de qualquer novo envio."
                        },
                        {
                            "nome": "",
                            "texto": "A revista recebe uma explicação formal. A universidade organiza formação para verificar dados e declarar o uso de ferramentas em pesquisa."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou encaminhar à gestão as necessidades de formação e acompanhamento identificadas, preservando as pessoas envolvidas. A avaliação do piloto precisa registrar essa limitação antes de recomendar novos usos."
                        }
                    ]
                },
                {
                    "id": "individual",
                    "texto": "Pedir que a estudante explique o caso primeiro, enquanto a universidade protege o calendário e adia sua resposta institucional.",
                    "passos": [
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "Ouvir a estudante é necessário. Ao deixar a resposta apenas com ela, porém, parecemos ignorar que a orientação também validou o trabalho."
                        },
                        {
                            "recurso": "integridade"
                        },
                        {
                            "atividade": {
                                "pergunta": "Que resposta reconhece o papel das pessoas envolvidas?",
                                "opcoes": [
                                    {
                                        "texto": "Ouvir a estudante, informar a revista e registrar como orientador e instituição irão revisar o processo.",
                                        "adequada": true,
                                        "retorno": "A resposta combina escuta, prestação de contas e revisão das condições de orientação."
                                    },
                                    {
                                        "texto": "Declarar que toda a responsabilidade é da ferramenta.",
                                        "retorno": "A ferramenta não assina o artigo nem substitui a verificação humana."
                                    },
                                    {
                                        "texto": "Punir a estudante antes de ouvi-la para proteger a imagem institucional.",
                                        "retorno": "Uma decisão sem escuta não examina o processo nem a responsabilidade da orientação."
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "Enviamos uma resposta conjunta e abrimos uma revisão orientada, com direito de manifestação da estudante."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou encaminhar à gestão as necessidades de formação e acompanhamento identificadas, preservando as pessoas envolvidas. A avaliação do piloto precisa registrar essa limitação antes de recomendar novos usos."
                        }
                    ]
                },
                {
                    "id": "revisao",
                    "texto": "Retirar os números contestados e tentar reconstruir rapidamente a análise antes de divulgar o ocorrido.",
                    "passos": [
                        {
                            "nome": "PROFESSOR AUGUSTO",
                            "texto": "Ao tentar corrigir apenas a tabela, percebemos que parte da interpretação dependia dos dados inexistentes. A revista ainda espera uma resposta."
                        },
                        {
                            "recurso": "docencia"
                        },
                        {
                            "atividade": {
                                "pergunta": "O que uma revisão completa deve incluir antes de qualquer reenvio?",
                                "opcoes": [
                                    {
                                        "texto": "Rastrear dados e método, avisar a revista, consultar a estudante e documentar alterações e uso da IA.",
                                        "adequada": true,
                                        "retorno": "A rastreabilidade permite avaliar a extensão do problema e justificar o próximo passo."
                                    },
                                    {
                                        "texto": "Substituir os valores até a conclusão parecer semelhante à original.",
                                        "retorno": "Uma conclusão desejada não determina quais dados são válidos."
                                    },
                                    {
                                        "texto": "Reenviar sem explicar as alterações porque a primeira versão ainda não foi publicada.",
                                        "retorno": "A revista já questionou a integridade dos dados e precisa conhecer a revisão."
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Interrompemos o envio, comunicamos o alcance da falha e propomos uma política de verificação para próximas orientações."
                        },
                        {
                            "nome": "{nome}",
                            "texto": "Vou encaminhar à gestão as necessidades de formação e acompanhamento identificadas, preservando as pessoas envolvidas. A avaliação do piloto precisa registrar essa limitação antes de recomendar novos usos."
                        }
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
