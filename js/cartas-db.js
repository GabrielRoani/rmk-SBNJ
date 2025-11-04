// 1. Lista de Expansões
const localExpansoesDB = {
    "Jogo Base": "radioativo",
    "Eu Nunca...": "personalizado",
    "Discórdia": "geek",
    "Spice (Picante)": "18mais"
};

// 2. Banco de Dados de Cartas (LISTA ÚNICA E EXPANDIDA)
const localCartasDB = [
    // --- Expansão: Jogo Base ---
    // (tipo: 'p' = preto, 'a' = azul, 'v' = vermelho, 'r' = roxo)
    { "id": 1, "texto": "Todos os homens bebem 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 2, "texto": "Todas as mulheres bebem 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 3, "texto": "O jogador mais novo bebe 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 4, "texto": "O jogador mais velho bebe 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 5, "texto": "Vote em quem é o mais provável de... ser preso.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "JOGO BASE" },
    { "id": 6, "texto": "Vote em quem é a pessoa mais infantil.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "JOGO BASE" },
    { "id": 7, "texto": "Cante uma música. Se cantar mal, beba 2 doses.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "JOGO BASE" },
    { "id": 8, "texto": "REGRA: Ninguém pode dizer a palavra \"beber\". Quem disser, bebe.", "tipo": "v", "tipoCarta": "REGRA", "expansao": "JOGO BASE" },
    { "id": 9, "texto": "Vire 1 shot sem fazer careta ou beba mais 1.", "tipo": "r", "tipoCarta": "CASTIGO", "expansao": "JOGO BASE" },
    { "id": 10, "texto": "MINI JOGO: Pedra, papel e tesoura com o jogador da esquerda. Quem perder, bebe 2.", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "JOGO BASE" },
    { "id": 11, "texto": "Escolha alguém para beber com você.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 12, "texto": "Todos que estão de blusa preta bebem 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 13, "texto": "Todos que estão solteiros bebem 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "JOGO BASE" },
    { "id": 14, "texto": "REGRA: A partir de agora, só pode usar a mão não-dominante para beber. Quem se enganar, bebe 2.", "tipo": "v", "tipoCarta": "REGRA", "expansao": "JOGO BASE" },
    { "id": 15, "texto": "MINI JOGO: O último a colocar a mão na cabeça bebe 2.", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "JOGO BASE" },

    // --- Expansão: Eu Nunca... ---
    // (tipo: 'g' = verde)
    { "id": 16, "texto": "Eu nunca... fiquei com alguém desta roda.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 17, "texto": "Eu nunca... fui expulso da sala de aula.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 18, "texto": "Eu nunca... peguei carona com estranhos.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 19, "texto": "Eu nunca... fui parado por policiais.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 20, "texto": "Eu nunca... me arrependi imediatamente após enviar uma mensagem.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 21, "texto": "Eu nunca... chorei no transporte público.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 22, "texto": "Eu nunca... passei mais de dois dias sem tomar banho.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 23, "texto": "Eu nunca... fiquei apaixonado por algum professor.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 24, "texto": "Eu nunca... passei o número errado para alguém.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },
    { "id": 25, "texto": "Eu nunca... dei em cima do(a) namorado(a) de algum amigo.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "EU NUNCA..." },

    // --- Expansão: Discórdia ---
    // (tipo: 'a' = azul, 'p' = preto)
    { "id": 26, "texto": "Vote em quem tem mais chances de acabar em uma situação embaraçosa por causa de um crush.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "DISCÓRDIA" },
    { "id": 27, "texto": "Se fosse para ficar preso em uma ilha deserta com alguém do grupo, quem seria e por quê? O escolhido bebe 1.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "DISCÓRDIA" },
    { "id": 28, "texto": "Quem do grupo tem mais chances de te magoar? Beba 1 dose com essa pessoa.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "DISCÓRDIA" },
    { "id": 29, "texto": "Vote em quem é o mais provável de casar primeiro. O mais votado bebe.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "DISCÓRDIA" },
    { "id": 30, "texto": "Qual foi seu pior beijo? A pessoa da roda que mais se parece com ela bebe 2.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "DISCÓRDIA" },
    { "id": 31, "texto": "Já ficou com alguém do grupo? Se sim, beba 1 dose. Se não, escolha alguém para beber 1 dose.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "DISCÓRDIA" },
    { "id": 32, "texto": "Se tivesse que casar com alguém aqui, quem seria? A pessoa escolhida bebe 2.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "DISCÓRDIA" },
    { "id": 33, "texto": "Vote em quem é o \"Amigo de Merda\" do grupo. O mais votado bebe 3.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "DISCÓRDIA" },
    { "id": 34, "texto": "Já mentiu para um amigo por interesse próprio? Se sim, beba 2 doses.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "DISCÓRDIA" },
    { "id": 35, "texto": "Vote em quem tem o pior gosto musical. O mais votado bebe 1.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "DISCÓRDIA" },

    // --- Expansão: Spice (Picante) ---
    // (tipo: 'r' = roxo, 'g' = verde)
    { "id": 36, "texto": "Eu nunca... beijei um parente.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 37, "texto": "Eu nunca... transei menstruada.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 38, "texto": "Eu nunca... disfarcei uma marca de chupão.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 39, "texto": "Eu nunca... fiz sexo anal.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 40, "texto": "Eu nunca... transei em uma banheira.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 41, "texto": "Eu nunca... fiz garganta profunda.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 42, "texto": "Trair ou ser traído? Quem escolheu a mesma opção que você, bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "SPICE" },
    { "id": 43, "texto": "Ter tesão 24 horas por dia ou apenas um dia por ano? Quem discordar de você, bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "SPICE" },
    { "id": 44, "texto": "Sexo com as luzes acesas ou apagadas? A minoria bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "SPICE" },
    { "id": 45, "texto": "Cuspir ou engolir? A minoria bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "SPICE" },
    { "id": 46, "texto": "Já ficou com ex de amigo(a)? Se sim, beba 2 doses.", "tipo": "r", "tipoCarta": "VERDADE", "expansao": "SPICE" },
    { "id": 47, "texto": "Tem alguma fantasia secreta? Beba 2 goles ou conte para o grupo.", "tipo": "r", "tipoCarta": "VERDADE", "expansao": "SPICE" },
    { "id": 48, "texto": "Qual o maior arrependimento amoroso? Beba 1 dose.", "tipo": "r", "tipoCarta": "VERDADE", "expansao": "SPICE" },
    { "id": 49, "texto": "Eu nunca... tive um \"amigo colorido\".", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" },
    { "id": 50, "texto": "Eu nunca... fiquei com mais de uma pessoa ao mesmo tempo.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "SPICE" }
];