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
        fala1: "Antes de começarmos, me diga um pouco sobre você...",
        fala2: "Muito bem, {nome}. Eu sabia que fizemos uma boa escolha ao convocar você como {classe}.<br><br>Tenho certeza que você irá fazer um bom trabalho.<br><br>Até mais!"
    },

    trilhaAluno: [
        { nome: "", texto: "Primeiro dia oficial no programa Horizonte IA.<br>O campus parece ainda maior quando você está tentando encontrar o bloco de pesquisa.", player: false, bg: "url('assets/images/background_biblioteca.png')" },
        { nome: "{nome}", texto: "Certo... Bloco B, laboratório 204. Não deve ser tão difícil.", player: true },

        { nome: "LÍVIA", texto: "Posso perguntar uma coisa?", player: false },
        { nome: "{nome}", texto: "Claro.", player: true },
        { nome: "LÍVIA", texto: "Se existe uma ferramenta capaz de explicar uma matéria para mim a qualquer hora... por que eu deveria depender do horário de um professor?", player: false },

        { tipo: "escolha" },

        { nome: "LÍVIA", texto: "Eu uso IA para estudar quase todos os dias.<br><br>Às vezes ela explica melhor do que o material da disciplina.<br><br>Posso perguntar dez vezes sem ficar com vergonha.", player: false },
        { nome: "LÍVIA", texto: "Precisamos pesquisar mais sobre a perspectiva discente/tecnológica.", player: false },

        { tipo: "video", url: "https://www.youtube.com/embed/P1H_pmdCWWU?si=A4U5pW-rYBe5Hy5c" },

        { nome: "{nome}", texto: "Eu achei a colocação do especialista muito interessante. Como aluno, é fundamental ter a presença de um professor para me ajudar a compreender certos aspectos do ensino.", player: true },
        { nome: "LÍVIA", texto: "Concordo com você, mas ainda tenho minhas dúvidas.", player: false },
        { nome: "{nome}", texto: "Eu tenho um artigo excelente para te ajudar a compreender mais este novo ponto de vista:", player: true },

        { tipo: "link", url: "https://observatoriodeeducacao.institutounibanco.org.br/em-debate/inteligencia-artificial-na-educacao?gad_source=1&gad_campaignid=18892021431&gbraid=0AAAAABRS77FRkwadUuInw7TAsKWq1f6be&gclid=Cj0KCQjw79nUBhCgARIsADSHka2VJwnCO0-m_zCGn5xiTqj8P8JwChwdkp7vofRBIm7KYNJ-M46UoiYaAqhNEALw_wcB" },

        { nome: "{nome}", texto: "E então, o que você achou?", player: true },
        { nome: "LÍVIA", texto: "A Inteligência Artificial está traçando novos caminhos para a aprendizagem...", player: false },
        { nome: "{nome}", texto: "Eu já tenho alguns dados o suficiente para a minha pesquisa. Acredito que na próxima reunião do conselho, terei muito o que acrescentar ao projeto.", player: true },
        { nome: "LÍVIA", texto: "Sabe, {nome}, gostei da nossa conversa. Espero nos encontrarmos em breve...", player: false },
        { nome: "{nome}", texto: "Até mais, Livia. Vou para o laboratório...", player: true },
        { nome: "LÍVIA", texto: "E eu vou aproveitar para estudar...", player: false, btnTexto: "Continuar" }
    ],

    trilhaAluno2: [
        { nome: "", texto: "Antes de seguir para o laboratório, uma nova notificação chega ao seu celular.<br><br>Lívia também recebeu o material.", bg: "url('assets/images/background_biblioteca.png')" },
        { nome: "LÍVIA", texto: "Parece que a reitoria quer que a gente analise mais uma perspectiva antes da reunião do conselho." },
        { nome: "{nome}", texto: "Então vamos investigar. Talvez isso nos ajude a entender qual deve ser o papel da IA na universidade." },
        { tipo: "video", url: "https://www.youtube.com/embed/P1H_pmdCWWU?si=A4U5pW-rYBe5Hy5c" },
        { nome: "LÍVIA", texto: "O vídeo levanta uma questão importante: ampliar o acesso à tecnologia não elimina a responsabilidade sobre a aprendizagem." },
        { nome: "{nome}", texto: "Também recebi um artigo da equipe de pesquisa. Vamos conferir os argumentos antes de decidir." },
        { tipo: "link", url: "https://observatoriodeeducacao.institutounibanco.org.br/em-debate/inteligencia-artificial-na-educacao" },
        { nome: "LÍVIA", texto: "Depois de tudo o que vimos, qual princípio você acredita que deveria orientar o uso da Inteligência Artificial na Universidade Horizonte?" },
        { tipo: "escolha-final" }
    ]
};
