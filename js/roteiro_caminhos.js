const caminhosAdicionais = {
    professor: {
        npcNome: "PROFESSOR AUGUSTO",
        npcImagem: "assets/images/npc_professor_augusto_tela1.png",
        inicio: "url('assets/images/background_sala de aula.png')",
        dialogos: [
            { nome: "", texto: "Sala 12. O projeto-piloto começa com uma pergunta deixada no quadro: o que ainda pertence ao professor quando uma máquina também explica, corrige e sugere?" },
            { nome: "PROFESSOR AUGUSTO", texto: "Bem-vindo, {nome}. Recebi vinte trabalhos muito parecidos. Alguns estudantes usaram IA; outros apenas imitaram a estrutura que ela costuma produzir." },
            { nome: "{nome}", texto: "Então detectar a ferramenta não revela necessariamente quem aprendeu. Talvez a avaliação precise observar o processo, não apenas o texto entregue." },
            { nome: "PROFESSOR AUGUSTO", texto: "Antes de redesenhar a disciplina, preciso decidir qual papel a IA terá no acompanhamento dos estudantes." },
            {
                tipo: "escolha", interacao: "interacaoProfessor1",
                pergunta: "Que prioridade deve orientar o acompanhamento da turma?",
                opcoes: [
                    { final: "A", texto: "Usar a IA para oferecer explicações e devolutivas frequentes, ampliando o apoio fora do horário de aula e reservando os encontros para dificuldades mais complexas." },
                    { final: "B", texto: "Manter a devolutiva diretamente com o professor, porque escutar o raciocínio do estudante permite perceber dúvidas e contextos que uma resposta automatizada pode não alcançar." },
                    { final: "C", texto: "Combinar sugestões da IA com revisão docente, registrando critérios, limites e decisões para que estudantes compreendam como cada devolutiva foi construída." }
                ]
            },
            { tipo: "resposta", interacao: "interacaoProfessor1" },
            { nome: "PROFESSOR AUGUSTO", texto: "Vamos confrontar essa prioridade com a perspectiva de pesquisadores que discutem IA generativa no ensino superior." },
            { tipo: "video", url: "https://www.youtube.com/embed/S2Pq1fwgTuM" },
            { nome: "{nome}", texto: "A discussão mostra que tecnologia, currículo e avaliação não podem ser separados. Automatizar uma prática inadequada apenas torna o problema mais rápido." },
            { nome: "PROFESSOR AUGUSTO", texto: "E personalizar não é apenas trocar palavras. Uma boa intervenção depende do objetivo da atividade, das evidências de aprendizagem e das necessidades reais do estudante." },
            { tipo: "link", url: "https://www.unesco.org/pt/articles/marco-referencial-de-competencias-em-ia-para-professores" },
            { nome: "{nome}", texto: "O marco trata o professor como responsável pelo desenho pedagógico e pelo uso ético, não como alguém que apenas opera uma ferramenta." },
            { nome: "PROFESSOR AUGUSTO", texto: "Isso nos leva à segunda interação: como avaliar autoria e aprendizagem quando a IA participa da produção?", bg: "url('assets/images/background_sala de informatica.png')" },
            { nome: "", texto: "Laboratório de informática. Na tela, três versões do mesmo trabalho: o rascunho do estudante, as sugestões da IA e a versão entregue." },
            { nome: "PROFESSOR AUGUSTO", texto: "O texto final está bem escrito, mas isso não basta. Preciso escolher o que a avaliação realmente deve tornar visível." },
            {
                tipo: "escolha", interacao: "interacaoProfessor2",
                pergunta: "Como a disciplina deve responder a trabalhos produzidos com apoio de IA?",
                opcoes: [
                    { final: "A", texto: "Redesenhar as tarefas para integrar a IA, valorizando comparação de respostas, revisão e defesa das decisões, porque a ferramenta já faz parte do ambiente profissional." },
                    { final: "B", texto: "Reservar etapas centrais para produção acompanhada e diálogo presencial, garantindo evidências diretas do que cada estudante consegue compreender e realizar." },
                    { final: "C", texto: "Permitir usos declarados e avaliar o percurso: comandos, fontes, alterações, justificativas e responsabilidade assumida pela versão final." }
                ]
            },
            { tipo: "resposta", interacao: "interacaoProfessor2" },
            { nome: "{nome}", texto: "Nenhuma dessas decisões elimina o trabalho docente. Elas apenas distribuem de formas diferentes autonomia, acompanhamento e prestação de contas." },
            { nome: "PROFESSOR AUGUSTO", texto: "Levaremos ao conselho não uma regra universal, mas uma prioridade pedagógica com consequências que precisarão ser acompanhadas." , btnTexto: "Ir ao conselho" }
        ],
        respostas: {
            interacaoProfessor1: {
                A: { nome: "PROFESSOR AUGUSTO", texto: "Essa direção valoriza escala e disponibilidade. Teremos de observar se a frequência das respostas também produz compreensão e quando encaminhar o estudante para apoio humano." },
                B: { nome: "PROFESSOR AUGUSTO", texto: "Essa direção preserva vínculo e leitura de contexto. Teremos de garantir que o acompanhamento humano seja realmente acessível e não dependa apenas de horários limitados." },
                C: { nome: "PROFESSOR AUGUSTO", texto: "Essa direção valoriza rastreabilidade e combinação de saberes. Teremos de definir quem revisa, quais critérios são públicos e quanto trabalho adicional isso exige." }
            },
            interacaoProfessor2: {
                A: { nome: "PROFESSOR AUGUSTO", texto: "Integrar a ferramenta aproxima a avaliação de práticas contemporâneas. O desafio será impedir que familiaridade tecnológica seja confundida com domínio conceitual." },
                B: { nome: "PROFESSOR AUGUSTO", texto: "Produções acompanhadas oferecem evidências mais diretas. O desafio será preservar flexibilidade e não excluir estudantes que demonstram conhecimento de outras formas." },
                C: { nome: "PROFESSOR AUGUSTO", texto: "Avaliar o processo torna o uso discutível e verificável. O desafio será criar registros proporcionais, que apoiem reflexão sem transformar cada atividade em burocracia." }
            }
        }
    },

    estagiario: {
        npcNome: "NICODEMOS",
        npcImagem: "assets/images/npc_nicodemos.png",
        inicio: "url('assets/images/background_sala de informatica.png')",
        dialogos: [
            { nome: "", texto: "Laboratório do Comitê Horizonte IA. Planilhas, termos de uso e relatórios disputam espaço na mesma tela." },
            { nome: "NICODEMOS", texto: "Você deve ser {nome}. Sou Nicodemos, também estou apoiando o comitê. A reitoria quer lançar um assistente acadêmico para todo o campus." },
            { nome: "{nome}", texto: "Parece uma decisão técnica, mas envolve acesso, dados pessoais, suporte e a forma como a instituição responde quando algo dá errado." },
            { nome: "NICODEMOS", texto: "Exato. Temos pouco tempo e três maneiras diferentes de começar o projeto-piloto." },
            {
                tipo: "escolha", interacao: "interacaoEstagiario1",
                pergunta: "Qual prioridade deve orientar o início do projeto-piloto?",
                opcoes: [
                    { final: "A", texto: "Disponibilizar o assistente para uma comunidade ampla desde o início, reunindo experiências diversas e corrigindo problemas a partir do uso real." },
                    { final: "B", texto: "Começar em poucos espaços com acompanhamento próximo, formando equipes de apoio antes de aumentar o número de participantes." },
                    { final: "C", texto: "Criar um laboratório controlado com documentação, testes de acessibilidade e auditoria dos resultados antes de decidir a escala." }
                ]
            },
            { tipo: "resposta", interacao: "interacaoEstagiario1" },
            { nome: "NICODEMOS", texto: "A política escolhida precisa considerar quem consegue acessar a ferramenta, quem fica de fora e quais alternativas existirão." },
            { tipo: "video", url: "https://www.youtube.com/embed/P1H_pmdCWWU" },
            { nome: "{nome}", texto: "A transformação digital pode democratizar serviços, mas também criar uma universidade em duas velocidades: uma para quem domina as ferramentas e outra para quem depende de apoio." },
            { nome: "NICODEMOS", texto: "Encontrei um debate sobre políticas digitais, equidade, acessibilidade, sustentabilidade e proteção de dados. É exatamente o nosso problema." },
            { tipo: "link", url: "https://www.iiep.unesco.org/pt/articles/inteligencia-artificial-e-educacao-o-papel-da-ia-nas-politicas-educacionais" },
            { nome: "{nome}", texto: "Implementar não é apenas contratar uma plataforma. Precisamos de governança, formação, infraestrutura, canais de contestação e critérios para medir impacto." },
            { nome: "NICODEMOS", texto: "E chegou uma proposta da empresa fornecedora. Vamos analisá-la no hall antes da reunião.", bg: "url('assets/images/background_hall.png')" },
            { nome: "", texto: "A proposta oferece seis meses gratuitos. Em troca, a empresa solicita dados de uso para aprimorar o sistema e não garante os mesmos recursos no plano gratuito após o piloto." },
            { nome: "NICODEMOS", texto: "A oferta acelera o projeto, mas cria dependência. Recusar agora protege a instituição, mas também adia benefícios. Precisamos escolher como lidar com a incerteza." },
            {
                tipo: "escolha", interacao: "interacaoEstagiario2",
                pergunta: "Como o comitê deve responder à proposta?",
                opcoes: [
                    { final: "A", texto: "Negociar garantias mínimas e iniciar o piloto em escala, usando os dados de participação para aperfeiçoar rapidamente o serviço e demonstrar sua utilidade." },
                    { final: "B", texto: "Adiar a contratação até assegurar proteção de dados, continuidade, suporte e condições equivalentes para quem não puder utilizar a plataforma." },
                    { final: "C", texto: "Aceitar apenas um ambiente limitado e auditável, comparando resultados, custos e impactos antes de qualquer compromisso institucional mais amplo." }
                ]
            },
            { tipo: "resposta", interacao: "interacaoEstagiario2" },
            { nome: "{nome}", texto: "Nossa recomendação precisa declarar também o que será observado: participação, aprendizagem, acessibilidade, carga de trabalho, erros e possibilidade de contestação." },
            { nome: "NICODEMOS", texto: "Assim o conselho poderá decidir sabendo não apenas o que pode ganhar, mas também quais responsabilidades está assumindo.", btnTexto: "Ir ao conselho" }
        ],
        respostas: {
            interacaoEstagiario1: {
                A: { nome: "NICODEMOS", texto: "Uma abertura ampla produz evidências variadas e benefícios imediatos. Precisaremos de suporte responsivo e limites claros para não transformar participantes em testadores involuntários." },
                B: { nome: "NICODEMOS", texto: "Um começo acompanhado permite aprender com proximidade. Precisaremos escolher os grupos com cuidado para que o piloto não represente apenas os contextos mais favorecidos." },
                C: { nome: "NICODEMOS", texto: "Um laboratório auditável aumenta controle e documentação. Precisaremos evitar que a busca por segurança prolongue indefinidamente uma experiência distante da realidade." }
            },
            interacaoEstagiario2: {
                A: { nome: "NICODEMOS", texto: "Avançar após negociar preserva o impulso do projeto. O comitê terá de acompanhar dependência tecnológica, diferenças entre planos e uso efetivo dos dados." },
                B: { nome: "NICODEMOS", texto: "Adiar cria espaço para garantias mais sólidas. O comitê terá de explicar o prazo e oferecer outras formas de apoio enquanto a solução não é liberada." },
                C: { nome: "NICODEMOS", texto: "O ambiente limitado transforma a contratação em investigação. O comitê terá de definir critérios de saída para que o teste resulte em decisão, não em permanência provisória." }
            }
        }
    }
};

const conselhosAdicionais = {
    professor: {
        abertura: [
            { nome: "", texto: "Sala do Conselho. Os trabalhos analisados e as decisões sobre avaliação agora orientam a discussão." },
            { nome: "REITORA HELENA", texto: "A IA alterou as condições de produção acadêmica. Precisamos decidir o que desejamos tornar visível, ensinável e avaliável." }
        ],
        A: [
            { nome: "PROFESSOR AUGUSTO", texto: "{nome} priorizou integração e disponibilidade. Isso permite usar o tempo docente onde a mediação é mais necessária, sem ignorar as práticas que os estudantes já adotam." },
            { nome: "{nome}", texto: "Proponho avaliações que integrem a IA e exijam comparação, revisão e defesa das escolhas. O produto importa, mas o estudante precisa demonstrar o raciocínio que o sustenta." },
            { nome: "REITORA HELENA", texto: "A instituição ampliará a experimentação, apoiará o redesenho das disciplinas e acompanhará se eficiência e personalização resultam em aprendizagem." }
        ],
        B: [
            { nome: "PROFESSOR AUGUSTO", texto: "{nome} priorizou evidências humanas e acompanhamento direto. Essa direção preserva contexto, vínculo e a possibilidade de reconhecer dúvidas que não aparecem no texto final." },
            { nome: "{nome}", texto: "Proponho etapas acompanhadas e momentos de diálogo, mantendo a IA em funções delimitadas. Precisamos assegurar tempo e acesso para que a mediação seja uma prática, não apenas um princípio." },
            { nome: "REITORA HELENA", texto: "A instituição fortalecerá tutoria e formação docente, com usos supervisionados e alternativas que preservem a diversidade das formas de aprender." }
        ],
        C: [
            { nome: "PROFESSOR AUGUSTO", texto: "{nome} priorizou transparência do processo. Isso permite discutir autoria a partir de evidências, em vez de reduzir a avaliação à tentativa de detectar uma ferramenta." },
            { nome: "{nome}", texto: "Proponho usos declarados, registro proporcional do percurso e responsabilidade pela versão final. Professores e estudantes precisarão construir critérios em conjunto." },
            { nome: "REITORA HELENA", texto: "A instituição criará protocolos de declaração, laboratórios de avaliação e revisão contínua dos critérios de autoria e integridade acadêmica." }
        ],
        encerramento: [{ nome: "REITORA HELENA", texto: "A decisão será revista com evidências das disciplinas. Ensinar e avaliar continuarão sendo compromissos humanos, mesmo quando mediados por tecnologia." }]
    },
    estagiario: {
        abertura: [
            { nome: "", texto: "Sala do Conselho. Nicodemos apresenta o relatório do piloto; {nome} traz a recomendação sobre governança e implementação." },
            { nome: "REITORA HELENA", texto: "Uma política digital não se mede apenas pela ferramenta contratada, mas por quem participa, quem responde e que alternativas permanecem disponíveis." }
        ],
        A: [
            { nome: "NICODEMOS", texto: "{nome} priorizou escala e aprendizagem pelo uso real. Essa direção pode revelar rapidamente demandas diversas e ampliar o acesso ao serviço." },
            { nome: "{nome}", texto: "Proponho expansão com garantias negociadas, suporte ativo e indicadores públicos. Crescer rápido não elimina a obrigação de corrigir desigualdades e interromper práticas prejudiciais." },
            { nome: "REITORA HELENA", texto: "O projeto será ampliado por etapas, com metas de acesso, canais de contestação e avaliação pública dos resultados e dos custos." }
        ],
        B: [
            { nome: "NICODEMOS", texto: "{nome} priorizou garantias antes da escala. Essa direção reduz exposição e dependência, embora adie benefícios que parte da comunidade já solicita." },
            { nome: "{nome}", texto: "Proponho consolidar proteção de dados, suporte e alternativas equivalentes antes da contratação. O período de preparação também deverá ter prazo e entregas verificáveis." },
            { nome: "REITORA HELENA", texto: "A expansão aguardará condições institucionais mínimas. Enquanto isso, serão oferecidos formação e serviços que não dependam da plataforma." }
        ],
        C: [
            { nome: "NICODEMOS", texto: "{nome} priorizou experimentação auditável. Essa direção trata a tecnologia como hipótese a ser testada, sem antecipar aprovação ou rejeição." },
            { nome: "{nome}", texto: "Proponho um ambiente limitado, indicadores definidos antes do teste e critérios claros para ampliar, modificar ou encerrar o projeto." },
            { nome: "REITORA HELENA", texto: "A universidade criará um laboratório de governança com participação da comunidade, auditoria de impactos e decisões documentadas." }
        ],
        encerramento: [{ nome: "REITORA HELENA", texto: "Implementar também é aprender. A instituição responderá não apenas pelos resultados da ferramenta, mas pelas condições que escolheu para utilizá-la." }]
    }
};
