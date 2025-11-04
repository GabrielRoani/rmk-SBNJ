// js/script.js (Versão limpa e funcional)

var impressao = {
    cor: null,
    verso: "padrao",
    tamanho: "padrao",
    textoPers: "Se beber, Não jogue!",
    expansoes: {}
};
var dbCartas = []; // Será populado por pegaDadosBD()
var filtrosAtivos = {
    expansoes: []
};

// Carrega o jsPDF do window
const { jsPDF } = window.jspdf;

// Dispara quando o HTML estiver pronto (mais rápido que o window.load)
$(document).ready(function () {
    pegaDadosBD();
});

function pegaDadosBD() {
    // 1. Carrega Expansões da variável 'localExpansoesDB' (definida em cartas-db.js)
    for (const key in localExpansoesDB) {
        impressao.expansoes[key] = localExpansoesDB[key];
    }
    adicionaExpansoes(); // Cria os botões de expansão

    // 2. Carrega Cartas da variável 'localCartasDB' (definida em cartas-db.js)
    dbCartas = localCartasDB;
    
    // 3. Atualiza a tabela (agora que os botões e os dados existem)
    atualizaFiltroCartas();

    // 4. Seleciona todas as cartas carregadas por padrão
    selecionaTodas();
}

// Adiciona botões de expansão
function adicionaExpansoes() {
    for (key in impressao.expansoes) {
        const icone = impressao.expansoes[key];
        
        // CORRIGIDO: A contagem agora funciona pois as chaves batem (ex: "JOGO BASE" === "JOGO BASE")
        const count = localCartasDB.filter(c => c.expansao === key).length;
        
        // CORRIGIDO: Adiciona 'checked' diretamente no HTML para evitar "race conditions"
        $("#botoes-expansoes").append(
            `<div class="btn-categoria-wrap">
				<input type="checkbox" class="btn-check btn-filtro" id="btn-exp-${normaliza(key)}" autocomplete="off" value="${key}" checked> 
				<label class="btn btn-outline-secondary" for="btn-exp-${normaliza(key)}">${icone?'<img src="./imgs/icones/' + icone + '-preto.png" width="30" height="30" class="align-text-bottom me-2" imagem="' + icone + '">':''}${key} <span class="badge bg-dark qtd ms-1">${count}</span></label>
			</div>`
        );
    }
}

function normaliza(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Listener unificado para filtros
$(document).on("change", ".btn-filtro", (e) => {
    atualizaFiltroCartas();
});

// Lógica de filtro
function atualizaFiltroCartas() {
    $("#corpo-tabela-desafios").empty();
    
    // Obtém filtros de expansão ativos
    filtrosAtivos.expansoes = $("#botoes-expansoes .btn-filtro:checked").map(function() { return $(this).val(); }).get();

    // Filtra o DB de cartas (agora funciona pois os nomes batem)
    const cartasFiltradas = dbCartas.filter(carta => {
        return filtrosAtivos.expansoes.includes(carta.expansao);
    });

    // Constrói e insere o HTML da tabela
    let cartasHTML = "";
    cartasFiltradas.forEach(carta => {
        cartasHTML += novaLinhaTabela(carta, false); // Inicia desmarcado
    });
    $("#corpo-tabela-desafios").append(cartasHTML);
    
    atualizaQtd(); // Atualiza a contagem total
    selecionaTodas(); // Marca todas as cartas filtradas
}

// Formata a linha da tabela
function novaLinhaTabela(carta, marcado) {
    return `<tr class="${marcado ? "marcado" : ""}" 
                tipo="${carta.tipo}" 
                texto="${carta.texto}" 
                tipoCarta="${carta.tipoCarta}" 
                expansao="${carta.expansao}"
                ${carta.id ? "id=" + carta.id : ""}>
                    <td class="carta-texto">${carta.texto}</td>
                    <td class="carta-categoria">${carta.tipoCarta}</td> 
                    <td class="btns">${
									marcado ? `<span class="btn-remover">remover</span>` : ""
								}</td>
            </tr>
            `;
}

// --- Funções de Interação com a Tabela ---

$("tbody").on("click", "tr", function (e) {
	let dados = $(e.currentTarget);
	marca(dados);
});

$("tbody").on("click", ".btn-remover", function (e) {
    e.stopPropagation(); 
	$(e.currentTarget).parents("tr").remove();
    atualizaQtd();
});

function marca(e) {
	e.toggleClass("marcado");
	atualizaQtd();
}

function atualizaQtd() {
    // Atualiza o contador "Total"
	$(".qtd-desafios > .qtd-total").text($("#corpo-tabela-desafios > tr").length);
    // Atualiza o contador "Selecionadas"
	$(".qtd-desafios > .qtd-selec").text(
		$("#corpo-tabela-desafios > .marcado").length
	);
}

function selecionaTodas() {
	$.each(
		$("#corpo-tabela-desafios")
			.children("tr")
			.not(".marcado"), // Pega só as que não estão marcadas
		(i, v) => {
			marca($(v)); // Marca elas
		}
	);
}

function desselecionaTodas() {
	$.each($("#corpo-tabela-desafios").children("tr.marcado"), (i, v) => {
		marca($(v)); // Desmarca
	});
}

// --- Adicionar Cartas Personalizadas ---

async function adicionaDesafioPersonalizado() {
	if (!$("#texto-personalizacao-desafios").val()){
		Swal.fire({ 
			icon: 'error',
			title: 'Cabeção!',
			text: 'Você não inseriu nenhuma carta!'
		});
        return;
	}
    
    const { value: tipoCarta } = await Swal.fire({
        title: 'Tipo da Carta',
        input: 'text',
        inputLabel: 'Qual é o cabeçalho desta(s) carta(s)? (ex: DESAFIO, REGRA, VOTE)',
        inputValue: 'DESAFIO',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa definir um tipo!';
            }
        }
    });

    if (tipoCarta) {
		let campo = $("#texto-personalizacao-desafios");
		let textos = campo.val().split("\n");
	
        // Filtra linhas vazias
		textosCorrigidos = textos.filter(texto => texto.trim() !== "");
	
		adicionaCartaNaTabela(textosCorrigidos, 'p', tipoCarta.toUpperCase()); 
		campo.val("");
    }
}

function adicionaCartaNaTabela(textos, tipo, tipoCarta) {
	let items = "";
	for (key in textos) {
        const carta = {
            texto: textos[key],
            tipo: tipo,
            tipoCarta: tipoCarta,
            expansao: 'PERSONALIZADO' // Expansão especial para cartas do usuário
        };
		items = items + novaLinhaTabela(carta, true); // 'true' para já vir marcado
	}
	$("#corpo-tabela-desafios").append(items);
	atualizaQtd();
}


// --- Funções de Personalização e PDF ---

$("#cor-fundo").change((e) => {
	impressao.cor = $(e.currentTarget).val();
	trocaCorPreta();
});

$("#tipo-fundo .form-check-input").on("change", () => {
	impressao.verso = $("input[name=tipo-fundo]:checked").val();
	$(".carta-exemplo.preta").toggleClass("economico");
	trocaCorPreta();
});

$("#tamanho-carta .form-check-input").on("change", () => {
	impressao.tamanho = $("input[name=tamanho-carta]:checked").val();
});

function trocaCorPreta() {
    const cor = impressao.cor || '#000';
	if (impressao.verso == "padrao") {
		$(".fundo-preta-exemplo").css("background-color", cor);
        $(".exemplo-header").css("background-color", "#fff").css("color", cor);
	} else {
		$(".fundo-preta-exemplo").css("background-color", "#fff");
		$(".rodape-economico").css("background-color", cor);
		$(".fundo-economico").css("background-color", cor);
        $(".exemplo-header").css("background-color", cor).css("color", "#fff");
	}
}

$("#texto-rodape").on("input", (e) => {
	impressao.textoPers = $(e.currentTarget).val() || "Se beber, Não jogue!";
    $(".fundo-carta-logo .texto-cartas").html(impressao.textoPers.split(' ').join('<br />'));
});

// Gerar PDF
function gerarPDF() {
	if ($("tr.marcado").length == 0) {
		Swal.fire({
			icon: "error",
			title: "Ops...",
			text: "Você se esqueceu de selecionar as cartas para impressão!",
		});
		return;
	}
    // Mostra o modal de "Aguarde" ANTES de começar o processamento pesado
    $("#modal-aguarde").modal('show');

    // Usa um setTimeout de 10ms para dar tempo do modal aparecer na tela
    // antes que o processador seja bloqueado pela geração do PDF.
    setTimeout(() => {
        montaPDF();
        $("#modal-aguarde").modal('hide'); // Esconde o modal quando terminar
    }, 10);
}

// --- Funções de BD e Mensagens (Removidas/Desativadas) ---

// function salvaCartasBD() { ... } // Removido
// $("#mensagem").on("submit", ...) // Removido