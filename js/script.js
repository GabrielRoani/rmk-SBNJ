// js/script.js (Refatorado para filtro único de expansão)

var impressao = {
    cont: 1,
    acumulador: 1,
    cor: null,
    verso: "padrao",
    tamanho: "padrao",
    textoPers: "Se beber, Não jogue!",
    expansoes: {} // Apenas expansões
};
var dbCartas = []; // Array plano de cartas
var filtrosAtivos = {
    expansoes: [] // Apenas expansões
};

const { jsPDF } = window.jspdf;

$(document).ready(() => {
    $("#modal-aguarde").modal('show');
    pegaDadosBD();
});

function pegaDadosBD() {
    // 1. Carrega Expansões
    for (const key in localExpansoesDB) {
        impressao.expansoes[key] = localExpansoesDB[key];
    }
    adicionaExpansoes();

    // 2. Carrega Cartas
    dbCartas = localCartasDB;
    
    $("#modal-aguarde").modal('hide');
    // Seleciona todas as expansões por padrão
    $("#botoes-expansoes .btn-check").prop("checked", true);
    
    atualizaFiltroCartas();
}

// Adiciona botões de expansão
function adicionaExpansoes() {
    for (key in impressao.expansoes) {
        const icone = impressao.expansoes[key];
        const count = localCartasDB.filter(c => c.expansao === key).length;
        $("#botoes-expansoes").append(
            `<div class="btn-categoria-wrap">
				<input type="checkbox" class="btn-check btn-filtro" id="btn-exp-${normaliza(key)}" autocomplete="off" value="${key}">
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

// Lógica de filtro (simplificada)
function atualizaFiltroCartas() {
    $("#corpo-tabela-desafios").empty();
    
    // Obtém filtros de expansão ativos
    filtrosAtivos.expansoes = $("#botoes-expansoes .btn-filtro:checked").map(function() { return $(this).val(); }).get();

    // Filtra o DB de cartas
    const cartasFiltradas = dbCartas.filter(carta => {
        return filtrosAtivos.expansoes.includes(carta.expansao);
    });

    // Constrói e insere o HTML da tabela
    let cartasHTML = "";
    cartasFiltradas.forEach(carta => {
        cartasHTML += novaLinhaTabela(carta);
    });
    $("#corpo-tabela-desafios").append(cartasHTML);
    
    atualizaQtd();
}

// Formata a linha da tabela (com novos atributos)
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

$("tbody").on("click", "tr", function (e) {
	let dados = $(e.currentTarget);
	marca(dados);
});

function marca(e) {
	e.toggleClass("marcado");
	atualizaQtd();
}

function atualizaQtd() {
	$(".qtd-desafios > .qtd-total").text($("#corpo-tabela-desafios > tr").length);
	$(".qtd-desafios > .qtd-selec").text(
		$("#corpo-tabela-desafios > .marcado").length
	);
}

// Adiciona cartas personalizadas
async function adicionaDesafioPersonalizado() {
	if (!$("#texto-personalizacao-desafios").val()){
		Swal.fire({ 
			icon: 'error',
			title: 'Cabeção!',
			text: 'Você não inseriu nenhuma carta!'
		});
        return;
	}
    
    // PERGUNTA O TIPO DE CARTA (CABEÇALHO)
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

    // Se o usuário inseriu um tipo
    if (tipoCarta) {
		let campo = $("#texto-personalizacao-desafios");
		let textos = campo.val().split("\n");
	
		textosCorrigidos = textos.map((texto) => {
			return texto.replace(!/[()\w+]/g, "");
		});
	
        // Adiciona as cartas com o tipo definido
		adicionaCartaNaTabela(textosCorrigidos, 'p', tipoCarta.toUpperCase()); 
		campo.val("");
    }
}

// Adiciona as cartas personalizadas na tabela
function adicionaCartaNaTabela(textos, tipo, tipoCarta) {
	let items = "";
	for (key in textos) {
        const carta = {
            texto: textos[key],
            tipo: tipo, // Cor padrão
            tipoCarta: tipoCarta, // Cabeçalho
            expansao: 'PERSONALIZADO' // Rodapé
        };
		items = items + novaLinhaTabela(carta, true); // 'true' para já vir marcado
	}
	$("#corpo-tabela-desafios").append(items);
	atualizaQtd();
}

$("tbody").on("click", ".btn-remover", function (e) {
	$(e.currentTarget).parents("tr").remove();
    atualizaQtd();
});

function selecionaTodas() {
	$.each(
		$("#corpo-tabela-desafios")
			.children("tr")
			.not(".marcado"),
		(i, v) => {
			marca($(v));
		}
	);
}

function desselecionaTodas() {
	$.each($("#corpo-tabela-desafios").children("tr.marcado"), (i, v) => {
		marca($(v));
	});
}

// --- Funções de personalização e PDF ---

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

// Atualiza o exemplo de carta
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
    // Atualiza o texto do verso no exemplo
	$(".fundo-carta-logo .texto-cartas").html(impressao.textoPers.split(' ').join('<br />'));
});

// Função de salvar desativada
function salvaCartasBD() {
    console.log("Modo estático: A função 'salvaCartasBD' foi ignorada.");
}

// Gerar PDF (agora verifica 'expansao' para personalizadas)
function gerarPDF() {
	if ($("tr.marcado").length == 0) {
		Swal.fire({
			icon: "error",
			title: "Ops...",
			text: "Você se esqueceu de selecionar as cartas para impressão!",
		});
		return;
	}

	if ($("tr[expansao='PERSONALIZADO']").length > 0) {
		Swal.fire({
			title: "Gerar PDF com cartas personalizadas?",
			html: 'As suas cartas personalizadas serão incluídas neste PDF.<br><span class="fs-6 text-black-50"><em>(A opção de salvar cartas está desativada no modo estático.)</em></span>',
			icon: "question",
			showCancelButton: true,
			confirmButtonText: `Gerar PDF`,
			cancelButtonText: `Cancelar`,
		}).then((result) => {
			if (result.isConfirmed) {
				montaPDF();
			} else if (result.isDismissed) {
				return;
			}
		});
	} else {
		montaPDF();
	}
}

// Formulário de mensagem desativado
$("#mensagem").on("submit", function (e) {
	e.preventDefault();
    Swal.fire({ 
        icon: 'error',
        title: 'Função desativada',
        text: 'O formulário de mensagem não funciona no modo estático (sem servidor).'
    });
});