// 1. Lista de Expansões (ATUALIZADA)
const localExpansoesDB = {
    // Mantidos:
    "JOGO BASE": "radioativo",
    "EU NUNCA...": "personalizado",
    
    // Atualizados conforme sua solicitação (usando ícones disponíveis):
    "Discórdia!": "politica",       // Substituindo "DISCÓRDIA"
    "Spicy": "sexo",             // Substituindo "SPICE"
    
    // Novas expansões:
    "Challenge": "cartas-mandonas",
    "Challenge 2.0": "cartas-mandonas",
    "Challenge Extreme": "cartas-mandonas",
    "Mini Game": "danca-das-cadeiras",
    "Aniversário": "family"
};

// 2. Banco de Dados de Cartas (ATUALIZADO E EXPANDIDO)
const localCartasDB = [
    // --- Expansão: JOGO BASE (IDs 1-15) ---
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

    // --- Expansão: EU NUNCA... (IDs 16-25) ---
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

    // --- Expansão: Discórdia! (IDs 26-35) - NOME ATUALIZADO ---
    { "id": 26, "texto": "Vote em quem tem mais chances de acabar em uma situação embaraçosa por causa de um crush.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "Discórdia!" },
    { "id": 27, "texto": "Se fosse para ficar preso em uma ilha deserta com alguém do grupo, quem seria e por quê? O escolhido bebe 1.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "Discórdia!" },
    { "id": 28, "texto": "Quem do grupo tem mais chances de te magoar? Beba 1 dose com essa pessoa.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "Discórdia!" },
    { "id": 29, "texto": "Vote em quem é o mais provável de casar primeiro. O mais votado bebe.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "Discórdia!" },
    { "id": 30, "texto": "Qual foi seu pior beijo? A pessoa da roda que mais se parece com ela bebe 2.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "Discórdia!" },
    { "id": 31, "texto": "Já ficou com alguém do grupo? Se sim, beba 1 dose. Se não, escolha alguém para beber 1 dose.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "Discórdia!" },
    { "id": 32, "texto": "Se tivesse que casar com alguém aqui, quem seria? A pessoa escolhida bebe 2.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "Discórdia!" },
    { "id": 33, "texto": "Vote em quem é o \"Amigo de Merda\" do grupo. O mais votado bebe 3.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "Discórdia!" },
    { "id": 34, "texto": "Já mentiu para um amigo por interesse próprio? Se sim, beba 2 doses.", "tipo": "p", "tipoCarta": "VERDADE", "expansao": "Discórdia!" },
    { "id": 35, "texto": "Vote em quem tem o pior gosto musical. O mais votado bebe 1.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "Discórdia!" },

    // --- Expansão: Spicy (IDs 36-50) - NOME ATUALIZADO ---
    { "id": 36, "texto": "Eu nunca... beijei um parente.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 37, "texto": "Eu nunca... transei menstruada.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 38, "texto": "Eu nunca... disfarcei uma marca de chupão.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 39, "texto": "Eu nunca... fiz sexo anal.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 40, "texto": "Eu nunca... transei em uma banheira.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 41, "texto": "Eu nunca... fiz garganta profunda.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 42, "texto": "Trair ou ser traído? Quem escolheu a mesma opção que você, bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "Spicy" },
    { "id": 43, "texto": "Ter tesão 24 horas por dia ou apenas um dia por ano? Quem discordar de você, bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "Spicy" },
    { "id": 44, "texto": "Sexo com as luzes acesas ou apagadas? A minoria bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "Spicy" },
    { "id": 45, "texto": "Cuspir ou engolir? A minoria bebe.", "tipo": "r", "tipoCarta": "ESCOLHA", "expansao": "Spicy" },
    { "id": 46, "texto": "Já ficou com ex de amigo(a)? Se sim, beba 2 doses.", "tipo": "r", "tipoCarta": "VERDADE", "expansao": "Spicy" },
    { "id": 47, "texto": "Tem alguma fantasia secreta? Beba 2 goles ou conte para o grupo.", "tipo": "r", "tipoCarta": "VERDADE", "expansao": "Spicy" },
    { "id": 48, "texto": "Qual o maior arrependimento amoroso? Beba 1 dose.", "tipo": "r", "tipoCarta": "VERDADE", "expansao": "Spicy" },
    { "id": 49, "texto": "Eu nunca... tive um \"amigo colorido\".", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },
    { "id": 50, "texto": "Eu nunca... fiquei com mais de uma pessoa ao mesmo tempo.", "tipo": "g", "tipoCarta": "EU NUNCA... (PICANTE)", "expansao": "Spicy" },

    // --- Expansão: Challenge (NOVAS CARTAS) ---
    { "id": 51, "texto": "DESAFIO: O último a colocar o dedo no nariz bebe 3 doses.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Challenge" },
    { "id": 52, "texto": "DESAFIO: Imite um animal. O primeiro a adivinhar escolhe quem bebe.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Challenge" },
    { "id": 53, "texto": "REGRA: Proibido falar 'Não'. Quem falar, bebe. (Inspirado em)", "tipo": "v", "tipoCarta": "REGRA", "expansao": "Challenge" },
    { "id": 54, "texto": "AÇÃO: Todos que estão de óculos bebem 1 dose.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "Challenge" },
    { "id": 55, "texto": "DESAFIO: Beba 1 dose sem usar as mãos.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Challenge" },
    
    // --- Expansão: Challenge 2.0 (NOVAS CARTAS) ---
    { "id": 56, "texto": "DESAFIO: Fale 'Eu te amo' para a pessoa à sua esquerda. Se ela rir, ela bebe. Se não rir, você bebe.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Challenge 2.0" },
    { "id": 57, "texto": "DESAFIO: Deixe o grupo postar um story vergonhoso no seu Instagram.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Challenge 2.0" },
    { "id": 58, "texto": "REGRA: Jogo do 'C ou S'. Proibido palavras com C ou S. Quem errar, bebe. (Inspirado em)", "tipo": "v", "tipoCarta": "REGRA", "expansao": "Challenge 2.0" },
    { "id": 59, "texto": "AÇÃO: O jogador mais alto e o mais baixo da roda bebem 2 doses.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "Challenge 2.0" },
    { "id": 60, "texto": "DESAFIO: Troque de camiseta com o jogador da sua direita.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Challenge 2.0" },

    // --- Expansão: Challenge Extreme (NOVAS CARTAS) ---
    { "id": 61, "texto": "CASTIGO: Beba o 'chorume do pântano'. (Mistura de bebidas feita pelo grupo). (Inspirado em)", "tipo": "r", "tipoCarta": "CASTIGO", "expansao": "Challenge Extreme" },
    { "id": 62, "texto": "DESAFIO: Mande um 'nude' (foto picante) para o segundo contato do seu WhatsApp. (Inspirado em)", "tipo": "r", "tipoCarta": "DESAFIO", "expansao": "Challenge Extreme" },
    { "id": 63, "texto": "DESAFIO: Lamba o chão ou beba 5 doses.", "tipo": "r", "tipoCarta": "DESAFIO", "expansao": "Challenge Extreme" },
    { "id": 64, "texto": "DESAFIO: Ligue para seu/sua ex e cante uma música romântica.", "tipo": "r", "tipoCarta": "DESAFIO", "expansao": "Challenge Extreme" },
    { "id": 65, "texto": "CASTIGO: Beba 1 dose de 'leite com mostarda' ou algo similar criado pelo grupo. (Inspirado em)", "tipo": "r", "tipoCarta": "CASTIGO", "expansao": "Challenge Extreme" },

    // --- Expansão: Mini Game (NOVAS CARTAS) ---
    { "id": 66, "texto": "MINI JOGO: Fui ao bar e comprei... (Jogo de memória). O primeiro a errar, bebe. (Inspirado em)", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "Mini Game" },
    { "id": 67, "texto": "MINI JOGO: Mímica. O jogador deve fazer mímica de um filme. Quem errar o palpite, bebe. (Inspirado em)", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "Mini Game" },
    { "id": 68, "texto": "MINI JOGO: Dança das Cadeiras (imaginária). O último a sentar no chão quando a música parar, bebe. (Inspirado em)", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "Mini Game" },
    { "id": 69, "texto": "MINI JOGO: Paranoia. Sussurre uma pergunta (ex: 'Quem é o mais...'). A pessoa aponta. O apontado bebe 1 ou bebe 2 para saber a pergunta. (Inspirado em)", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "Mini Game" },
    { "id": 70, "texto": "MINI JOGO: Jogo do Pato. O jogador deve falar 'Pato', o próximo 'Ganso'. Quem errar, bebe. (Inspirado em)", "tipo": "p", "tipoCarta": "MINI JOGO", "expansao": "Mini Game" },

    // --- Expansão: Aniversário (NOVAS CARTAS) ---
    { "id": 71, "texto": "ANIVERSÁRIO: O aniversariante (ou quem fez aniversário mais recentemente) escolhe 3 pessoas para beber.", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "Aniversário" },
    { "id": 72, "texto": "ANIVERSÁRIO (VOTE): Vote em quem é o mais provável de esquecer o aniversário de um amigo.", "tipo": "a", "tipoCarta": "VOTE", "expansao": "Aniversário" },
    { "id": 73, "texto": "ANIVERSÁRIO (EU NUNCA...): Eu nunca... dei 'PT' em uma festa de aniversário.", "tipo": "g", "tipoCarta": "EU NUNCA...", "expansao": "Aniversário" },
    { "id": 74, "texto": "ANIVERSÁRIO (DESAFIO): Faça um discurso de parabéns para a pessoa à sua direita. Se for ruim, beba 3.", "tipo": "p", "tipoCarta": "DESAFIO", "expansao": "Aniversário" },
    { "id": 75, "texto": "ANIVERSÁRIO (AÇÃO): Todos bebem 1 dose em homenagem à Netuno Jogos! (A empresa que criou o jogo físico 'Se Beber, Não Jogue')", "tipo": "p", "tipoCarta": "AÇÃO", "expansao": "Aniversário" }
];