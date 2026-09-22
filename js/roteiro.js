const bancoDeDialogos = {
    tela1: [
        { nome: "", texto: "Universidade Horizonte.<br>08h17.<br>O semestre deveria começar como qualquer outro.<br>Mas algo estava...diferente.", livia: false, augusto: false },
        { nome: "LÍVIA", texto: "Professor, o senhor leu o comunicado?", livia: true, augusto: false },
        { nome: "PROFESSOR AUGUSTO", texto: "Qual deles? (Risos!)", livia: true, augusto: true },
        { nome: "LÍVIA", texto: "Alguma coisa sobre Inteligência Artificial.", livia: true, augusto: true },
        { nome: "PROFESSOR AUGUSTO", texto: "Se for aquele comunicado da reitoria, eu li. Recebi no e-mail...", livia: true, augusto: true },
        { nome: "LÍVIA", texto: "O comunicado diz que a IA vai acompanhar algumas disciplinas.", livia: true, augusto: true },
        { nome: "PROFESSOR AUGUSTO", texto: '"Acompanhar" é uma palavra interessante.', livia: true, augusto: true },
        { nome: "LÍVIA", texto: "Por quê?", livia: true, augusto: true },
        { nome: "PROFESSOR AUGUSTO", texto: "Porque ninguém explicou exatamente o que isso significa na prática. Mas vamos descobrir em breve...", livia: true, augusto: true },

        {
            nome: "NOTIFICAÇÃO",
            texto: "COMUNICADO INSTITUCIONAL<br>A Universidade Horizonte iniciará neste semestre o Programa Horizonte IA.<br>Algumas disciplinas participarão de um projeto-piloto de integração entre Inteligência Artificial e aprendizagem.",
            livia: false,
            augusto: false,
            bg: "url('assets/images/background_tela_apresentacao_celular.png')",
            btnTexto: "Avançar"
        },
        {
            nome: "NOTIFICAÇÃO",
            texto: "Professores, estudantes, gestores e toda a comunidade acadêmica serão convidados a participar da avaliação do projeto.",
            livia: false,
            augusto: false,
            btnTexto: "Avançar"
        },
        {
            nome: "NOTIFICAÇÃO",
            texto: "Você recebeu um convite.",
            livia: false,
            augusto: false,
            btnTexto: "Avançar"
        }
    ],

    tela2: {
        fala1: "Olá! Sou Giovana, gerente de TI da Universidade Horizonte. Antes de começarmos, me diga um pouco sobre você...",
        fala2: "Muito bem, {nome}. Você participará do Programa Horizonte IA como {classe}.<br><br>Sua perspectiva vai ajudar a universidade a entender os efeitos de cada decisão.<br><br>Vamos começar!"
    },

    trilhaAluno: [
        { nome: "", texto: "Primeiro dia oficial no programa Horizonte IA.<br>O campus parece ainda maior quando você está tentando encontrar o bloco de pesquisa.", player: false, bg: "url('assets/images/background_biblioteca.png')" },
        { nome: "{nome}", texto: "Certo... Bloco B, laboratório 204. Não deve ser tão difícil.", player: true },

        { nome: "LÍVIA", texto: "Posso perguntar uma coisa?", player: false },
        { nome: "{nome}", texto: "Claro.", player: true },
        { nome: "LÍVIA", texto: "Se existe uma ferramenta capaz de explicar uma matéria para mim a qualquer hora... por que eu deveria depender do horário de um professor?", player: false },

        { tipo: "escolha" },

        { tipo: "resposta-escolha1" },
        { nome: "LÍVIA", texto: "Eu uso IA para estudar quase todos os dias. Posso pedir outra explicação dez vezes sem sentir vergonha, adaptar exemplos e revisar no meu ritmo.", player: false },
        { nome: "LÍVIA", texto: "Ao mesmo tempo, percebi que facilidade não é sinônimo de aprendizagem. Se eu apenas aceito a resposta, talvez termine a atividade sem compreender o raciocínio.", player: false },
        { nome: "{nome}", texto: "Então a pergunta não é apenas se a ferramenta responde. Precisamos investigar quem consegue acessá-la, como verificamos o que ela diz e o que ainda cabe ao estudante e ao professor.", player: true },

        { tipo: "video", url: "https://www.youtube.com/embed/P1H_pmdCWWU?si=A4U5pW-rYBe5Hy5c" },

        { nome: "{nome}", texto: "O especialista diferencia acesso à informação de construção de conhecimento. Uma explicação pode ser imediata, mas compreender exige comparar, testar e relacionar ideias.", player: true },
        { nome: "LÍVIA", texto: "E a IA pode responder com muita segurança mesmo quando erra. Sem repertório, talvez eu nem perceba uma informação inventada ou uma fonte inexistente.", player: false },
        { nome: "{nome}", texto: "Encontrei um artigo sobre oportunidades e riscos da IA na educação. Vamos confrontar o vídeo com outra fonte.", player: true },

        { tipo: "link", url: "https://observatoriodeeducacao.institutounibanco.org.br/em-debate/inteligencia-artificial-na-educacao?gad_source=1&gad_campaignid=18892021431&gbraid=0AAAAABRS77FRkwadUuInw7TAsKWq1f6be&gclid=Cj0KCQjw79nUBhCgARIsADSHka2VJwnCO0-m_zCGn5xiTqj8P8JwChwdkp7vofRBIm7KYNJ-M46UoiYaAqhNEALw_wcB" },

        { nome: "{nome}", texto: "O texto amplia o problema. A IA pode apoiar estudantes com diferentes necessidades, mas também pode aprofundar desigualdades entre quem tem acesso às melhores ferramentas e quem não tem.", player: true },
        { nome: "LÍVIA", texto: "Também há privacidade, autoria e transparência. Se a ferramenta participou de um trabalho, esconder esse uso impede que o professor compreenda como o estudante chegou ao resultado.", player: false },
        { nome: "{nome}", texto: "Já temos uma questão importante para o conselho: como ampliar possibilidades sem transformar tecnologia em atalho, privilégio ou substituição da responsabilidade humana?", player: true },
        { nome: "LÍVIA", texto: "Sabe, {nome}, gostei da nossa conversa. Espero nos encontrarmos em breve...", player: false },
        { nome: "{nome}", texto: "Até mais, Livia. Vou para o laboratório...", player: true },
        { nome: "LÍVIA", texto: "E eu vou aproveitar para estudar...", player: false, btnTexto: "Continuar" }
    ],

    respostasAluno1: {
        A: { nome: "LÍVIA", texto: "Você está sugerindo que a disponibilidade da ferramenta pode diminuir uma dependência desnecessária. Isso amplia minha autonomia, mas também transfere para mim a responsabilidade de reconhecer quando preciso de orientação." },
        B: { nome: "LÍVIA", texto: "Entendo. Aprender envolve diálogo, acompanhamento e retorno, não apenas receber uma explicação. Talvez a questão seja preservar essa relação sem ignorar as novas ferramentas." },
        C: { nome: "LÍVIA", texto: "Faz sentido. A mesma ferramenta pode apoiar uma investigação ou substituir o esforço de pensar. O efeito depende da finalidade, da transparência e das escolhas de quem a utiliza." }
    },

    trilhaAluno2: [
        { nome: "", texto: "Antes de seguir para o laboratório, uma nova notificação chega ao seu celular.<br><br>O conselho pede uma análise sobre autoria, equidade e responsabilidade no uso acadêmico da IA.", bg: "url('assets/images/background_biblioteca.png')" },
        { nome: "LÍVIA", texto: "Eles apresentaram um caso: uma estudante usou IA para organizar categorias iniciais e revisar a clareza do texto. Depois verificou as fontes e escreveu a análise final." },
        { nome: "{nome}", texto: "Isso não cabe facilmente em 'usou' ou 'não usou'. Precisamos observar a finalidade, o quanto da contribuição intelectual foi preservado e se houve transparência." },
        { tipo: "video", url: "https://www.youtube.com/embed/S2Pq1fwgTuM" },
        { nome: "LÍVIA", texto: "A discussão mostra que proibir tudo não ensina ninguém a avaliar respostas, formular boas perguntas ou reconhecer limites. Mas liberar sem orientação também pode fragilizar a aprendizagem." },
        { nome: "{nome}", texto: "A equipe indicou um guia internacional com uma abordagem centrada nas pessoas. Ele trata de privacidade, inclusão, validação pedagógica e formação para o uso crítico." },
        { tipo: "link", url: "https://www.unesco.org/pt/articles/guia-para-ia-generativa-na-educacao-e-na-pesquisa" },
        { nome: "LÍVIA", texto: "Um estudante que não dispõe de boa conexão, assinatura paga ou letramento digital começa da mesma posição que os demais?" },
        { nome: "{nome}", texto: "Não. Uma política responsável precisaria prever acesso, alternativas equivalentes e apoio formativo. Caso contrário, uma inovação pode produzir uma nova barreira." },
        { nome: "LÍVIA", texto: "E, quando a IA participa de um trabalho, declarar o processo permite discutir autoria sem fingir que a ferramenta não existe." },
        { nome: "{nome}", texto: "Chegou a hora de levar uma posição ao conselho. Qual princípio deve orientar o Programa Horizonte IA?" },
        { tipo: "escolha-final" }
    ],

    conselhoAluno: {
        abertura: [
            { nome: "", texto: "Sala do Conselho da Universidade Horizonte.<br><br>As evidências e as escolhas reunidas durante a jornada agora fazem parte da decisão institucional." },
            { nome: "REITORA HELENA", texto: "Não decidiremos apenas se a Inteligência Artificial deve entrar na universidade. Ela já faz parte da realidade de muitos estudantes e professores." },
            { nome: "REITORA HELENA", texto: "Nossa responsabilidade é definir que problema queremos resolver, quais riscos aceitamos e quais condições não podem ser abandonadas." }
        ],
        A: [
            { nome: "LÍVIA", texto: "As escolhas de {nome} deram mais peso à autonomia. Para muitos estudantes, receber apoio fora do horário de aula pode significar continuar aprendendo quando antes só havia silêncio." },
            { nome: "PROFESSOR AUGUSTO", texto: "Ampliar o acesso é valioso. Minha preocupação é que personalização não vire isolamento e que eficiência não seja confundida com compreensão." },
            { nome: "{nome}", texto: "Minha proposta é ampliar a experimentação e o acesso, mantendo pontos claros de apoio humano. A IA deve abrir caminhos, não abandonar o estudante diante deles." },
            { nome: "REITORA HELENA", texto: "O programa será expandido. A instituição investirá em acesso, tutoria assistida e acompanhamento dos resultados para que autonomia não signifique ausência de suporte." }
        ],
        B: [
            { nome: "LÍVIA", texto: "As escolhas de {nome} preservam a presença humana. Eu também não quero que a facilidade de perguntar a uma máquina torne mais difícil encontrar um professor disponível." },
            { nome: "PROFESSOR AUGUSTO", texto: "A mediação docente protege o contexto, o vínculo e o julgamento pedagógico. Mas precisamos evitar que proteção se transforme em simples proibição." },
            { nome: "{nome}", texto: "Minha proposta é adotar limites claros e uso supervisionado. A tecnologia pode apoiar atividades específicas, mas decisões pedagógicas e acompanhamento permanecem humanos." },
            { nome: "REITORA HELENA", texto: "O programa seguirá com escopo restrito. Cada uso deverá ter finalidade pedagógica definida, alternativa acessível e supervisão de um profissional responsável." }
        ],
        C: [
            { nome: "LÍVIA", texto: "As escolhas de {nome} insistem na pergunta 'como foi usado?'. Isso me parece mais honesto do que tratar qualquer uso como fraude ou qualquer resposta como aprendizagem." },
            { nome: "PROFESSOR AUGUSTO", texto: "Transparência permite avaliar processos. Para isso, estudantes e docentes precisarão aprender a verificar fontes, reconhecer limites e justificar decisões." },
            { nome: "{nome}", texto: "Minha proposta é uma política baseada em finalidade, transparência e responsabilidade: declarar o uso, preservar a contribuição intelectual, verificar informações e assumir a autoria da versão final." },
            { nome: "REITORA HELENA", texto: "O programa adotará laboratórios de uso crítico, declarações de processo e revisão contínua das práticas. A inovação será tratada como objeto de investigação, não como solução automática." }
        ],
        encerramento: [
            { nome: "REITORA HELENA", texto: "Esta decisão não encerra o debate. Ela define o compromisso que orientará nossos próximos passos e os critérios pelos quais seremos avaliados." }
        ]
    }
};
