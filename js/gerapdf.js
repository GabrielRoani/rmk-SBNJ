// js/gerapdf.js (Refatorado para o novo layout de carta)

function montaPDF() {
	$("#modal-aguarde").modal('show');

	// 1. PEGAR TODAS AS CARTAS SELECIONADAS
	let cartasPDF = [];
	$.each($("tr.marcado"), (i, v) => {
		cartasPDF.push({
			texto: $(v).attr("texto"),
			tipo: $(v).attr("tipo"),
            tipoCarta: $(v).attr("tipoCarta"), // NOVO: Captura o Cabeçalho
            expansao: $(v).attr("expansao") // NOVO: Captura o Rodapé
		});
	});

	// 2. CONFIGURAÇÕES DE IMPRESSÃO
	let doc = new jsPDF({ unit: "mm" });
	doc.addFont("js/plugins/fonts/calibri.ttf", "calibri", "normal");
	doc.addFont("js/plugins/fonts/calibrib.ttf", "calibri", "bold");
	doc.setFont("calibri", "bold");

	const config = getConfig();

	// 3. PROCESSAR E DESENHAR TODAS AS CARTAS
	let pagina = 1;
	let cartasNaPagina = 1;
    let paginasDeVerso = {}; 

	for (let i = 0; i < cartasPDF.length; i++) {
		const carta = cartasPDF[i];
		const posicao = calculaPosicao(cartasNaPagina, config);
        const corInfo = getCorPorTipo(carta.tipo, config);
        
		desenhaFrente(doc, carta, posicao.x, posicao.y, config, corInfo);

        if (!paginasDeVerso[carta.tipo]) {
            paginasDeVerso[carta.tipo] = corInfo;
        }

		cartasNaPagina++;

		if (cartasNaPagina > config.cartasPorPagina || i === cartasPDF.length - 1) {
			desenhaLinhasCorte(doc, config);
			if (i < cartasPDF.length - 1) {
				doc.addPage();
				pagina++;
				cartasNaPagina = 1;
			}
		}
	}

	// 4. DESENHAR O(S) VERSO(S) DAS CARTAS
    for (const tipo in paginasDeVerso) {
        const corInfo = paginasDeVerso[tipo];
        doc.addPage();
        for (let i = 1; i <= config.cartasPorPagina; i++) {
            const posicao = calculaPosicao(i, config);
            desenhaVerso(doc, tipo, posicao.x, posicao.y, config, corInfo);
        }
        desenhaLinhasCorte(doc, config);
    }

	// 5. SALVAR O PDF
	doc.save("Se beber, Nao jogue!.pdf");
	$("#modal-aguarde").modal('hide');
}

// --- FUNÇÕES AUXILIARES ---

function getConfig() {
	const tamanhos = {
		padrao: { altura: 88, largura: 63, cartasPorPagina: 9, fontSize: 13 },
		menor: { altura: 63, largura: 41, cartasPorPagina: 16, fontSize: 10 },
		controverso: { altura: 53, largura: 56, cartasPorPagina: 15, fontSize: 10 }
	};
	return {
		...tamanhos[impressao.tamanho],
		corPadrao: impressao.cor || "#000000",
		verso: impressao.verso,
		textoPers: impressao.textoPers || "Se beber, Não jogue!", // Texto do verso
		margemX: 10,
		margemY: 10,
		gap: 1
	};
}

// Define esquemas de cores para cada tipo de carta
function getCorPorTipo(tipo, config) {
    // Defina seus esquemas de cores aqui
    // 'headerFundo' é a cor do cabeçalho, 'headerTexto' a cor do texto do cabeçalho
    const cores = {
        'p': { fundo: '#212529', texto: '#FFFFFF', headerFundo: '#FFFFFF', headerTexto: '#212529', icone: "-branco" }, // Preto
        'v': { fundo: '#DC3545', texto: '#FFFFFF', headerFundo: '#FFFFFF', headerTexto: '#DC3545', icone: "-branco" }, // Vermelho (Regra)
        'a': { fundo: '#0D6EFD', texto: '#FFFFFF', headerFundo: '#FFFFFF', headerTexto: '#0D6EFD', icone: "-branco" }, // Azul (Vote)
        'g': { fundo: '#198754', texto: '#FFFFFF', headerFundo: '#FFFFFF', headerTexto: '#198754', icone: "-branco" }, // Verde (Eu Nunca)
        'r': { fundo: '#6610F2', texto: '#FFFFFF', headerFundo: '#FFFFFF', headerTexto: '#6610F2', icone: "-branco" }, // Roxo (Castigo)
        'b': { fundo: '#FFFFFF', texto: '#000000', headerFundo: '#212529', headerTexto: '#FFFFFF', icone: "-preto" }   // Carta Branca
    };
    // Retorna a cor do 'tipo' ou a cor personalizada do usuário (antigo 'p')
    const corPadraoUsuario = { fundo: config.corPadrao, texto: '#FFFFFF', headerFundo: '#FFFFFF', headerTexto: config.corPadrao, icone: "-branco" };
    
    // Se o tipo for 'p' (padrão preto), mas o usuário escolheu uma cor, use a cor do usuário
    if (tipo === 'p' && config.corPadrao !== "#000000") {
        return corPadraoUsuario;
    }
    
    return cores[tipo] || corPadraoUsuario; // Retorna a cor do tipo ou a cor padrão
}


function calculaPosicao(num, config) {
	const cartasPorLinha = Math.floor((210 - (config.margemX * 2)) / config.largura);
	const linha = Math.ceil(num / cartasPorLinha) - 1;
	const coluna = (num - 1) % cartasPorLinha;

	return {
		x: config.margemX + (coluna * (config.largura + config.gap)),
		y: config.margemY + (linha * (config.altura + config.gap))
	};
}

// **** FUNÇÃO PRINCIPAL MODIFICADA (desenhaFrente) ****
function desenhaFrente(doc, carta, x, y, config, corInfo) {
    const alturaCabecalho = 10; // Altura do cabeçalho em mm
    const margemTexto = 4; // Margem interna
    
    // 1. Desenha o fundo principal
	doc.setDrawColor(0);
	doc.setFillColor(corInfo.fundo);
	doc.rect(x, y, config.largura, config.altura, impressao.verso === 'padrao' ? 'F' : 'D');
	
    // 2. Desenha o fundo do Cabeçalho
    doc.setFillColor(corInfo.headerFundo);
    doc.rect(x, y, config.largura, alturaCabecalho, 'F');

    // 3. Desenha o Texto do Cabeçalho (ex: "DESAFIO")
    doc.setFont("calibri", "bold");
    doc.setFontSize(10);
    doc.setTextColor(corInfo.headerTexto);
    doc.text(carta.tipoCarta.toUpperCase(), x + (config.largura / 2), y + (alturaCabecalho / 2) + 2, { align: 'center' });

    // 4. Desenha o Texto Principal (o desafio)
	doc.setFont("calibri", "normal");
    doc.setFontSize(config.fontSize);
	doc.setTextColor(corInfo.texto);
	let textoFormatado = formataTexto(carta.texto, doc, config.largura - (margemTexto * 2));
    
    // Posição Y do texto: 8mm abaixo do cabeçalho
    let posYTexto = y + alturaCabecalho + 8; 
	doc.text(textoFormatado, x + (config.largura / 2), posYTexto, { align: 'center', maxWidth: config.largura - (margemTexto * 2) });

	// 5. Desenha o Rodapé (Expansão)
	doc.setFont("calibri", "bold");
    doc.setFontSize(7);
	doc.text(carta.expansao.toUpperCase(), x + (config.largura / 2), y + config.altura - 4, { align: 'center' });

    // 6. Desenha o Logo (Ícone do jogo) no canto
    // Use o logo 'radioativo' como padrão
    const logoIconePath = `imgs/icones/radioativo${corInfo.icone}.png`; 
    try {
	    doc.addImage(logoIconePath, "PNG", x + 2, y + config.altura - 6, 4, 4);
    } catch (e) { } // ignora se o logo principal falhar
}

// Desenha o verso da carta
function desenhaVerso(doc, tipo, x, y, config, corInfo) {
    const icone = `imgs/icones/radioativo${corInfo.icone}.png`; // Logo padrão no verso
    
    doc.setDrawColor(0);

    if (config.verso === 'padrao') {
        doc.setFillColor(corInfo.fundo);
        doc.rect(x, y, config.largura, config.altura, 'F');
    } else {
        doc.setFillColor(corInfo.fundo);
        doc.rect(x, y, config.largura, 5, 'F'); // Faixa superior
        doc.rect(x, y + config.altura - 5, config.largura, 5, 'F'); // Faixa inferior
        doc.rect(x, y, 5, config.altura, 'F'); // Faixa esquerda
        doc.rect(x + config.larga - 5, y, 5, config.altura, 'F'); // Faixa direita
    }

    doc.setTextColor(corInfo.texto);
    doc.setFontSize(12);
    // Usa o texto personalizado do usuário (ou o padrão)
    doc.text(config.textoPers.split(' ').join('\n'), x + (config.largura / 2), y + (config.altura / 2) - 5, { align: 'center' }); 
    try {
        doc.addImage(icone, "PNG", x + (config.largura / 2) - 7.5, y + (config.altura / 2) - 20, 15, 15);
    } catch (e) { }
}


function desenhaLinhasCorte(doc, config) {
	doc.setDrawColor(200, 200, 200);
	doc.setLineWidth(0.1);

	const cartasPorLinha = Math.floor((210 - (config.margemX * 2)) / config.largura);
	const numLinhas = Math.ceil(config.cartasPorPagina / cartasPorLinha);

	// Linhas horizontais
	for (let i = 0; i <= numLinhas; i++) {
		let posY = config.margemY + (i * (config.altura + config.gap));
		if (i > 0) posY -= config.gap;
		doc.line(5, posY, 205, posY);
	}

	// Linhas verticais
	for (let i = 0; i <= cartasPorLinha; i++) {
		let posX = config.margemX + (i * (config.largura + config.gap));
		if (i > 0) posX -= config.gap;
		doc.line(posX, 5, posX, 292);
	}
}

// Formata o texto (removemos a lógica de underline)
function formataTexto(texto, doc, larguraMax) {
    texto = texto.replace(/<</g, '\n').replace(/>>/g, '\n');
    let linhas = texto.split(/\\n|\n/);
    let textoFinal = [];

    linhas.forEach(linha => {
        linha = linha.trim();
        if (linha) {
            doc.splitTextToSize(linha, larguraMax).forEach(l => textoFinal.push(l));
        }
    });
    return textoFinal;
}