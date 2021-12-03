
function fazComQueTodosOsItensSejamClicaveis() {
    const filhos = document.querySelectorAll(".flex-item");
    var corSelecionada = document.getElementById("corItens").value;
    filhos.forEach((filho) => {

        filho.addEventListener("click", (e) => {
            alteraACorDoItem(e, filho, corSelecionada);
            alteraAOrdemDoItem(e);
        });
    });
}

fazComQueTodosOsItensSejamClicaveis()

function alteraAOrdemDoItem() {
    var numeroEscolhidoPeloUsuario = window.prompt("Qual valor em ordem esse item deve ter?");
    var elementoHtml = e.srcElement;
    elementoHtml.style.order = numeroEscolhidoPeloUsuario;
}

var EstaInvertido = true;

function alteraACorDoItem() {
    //recupera cor escolhida
    var corSelecionada = document.getElementById("corItens").value;
    var itens = document.getElementsByClassName("flex-item");
    for (var item of itens) {
        item.style.background = corSelecionada;
    }
}

function mudaJustificacao() {
    var container = document.getElementsByClassName("flex-container")[0];

    var justificacaoSelecionadaPeloUsuario = document.getElementById("possiveisJustificacoes").value;

    document.getElementsByClassName("flex-container")[0].style.justifyContent = justificacaoSelecionadaPeloUsuario;
}


function inverte() {
    var container = document.getElementsByClassName("flex-container")[0];

    if (EstaInvertido) {
        document.getElementsByClassName("flex-container")[0].style.flexDirection = "row";
        document.getElementsByClassName("flex-container")[0].style.flexWrap = "wrap";
        EstaInvertido = false;

    } else {
        document.getElementsByClassName("flex-container")[0].style.flexDirection = "row-reverse"
        document.getElementsByClassName("flex-container")[0].style.flexWrap = "wrap-reverse"
        EstaInvertido = true;
    }
}

function adiciona() {
    //criar elemento
    var quantidadeDeItens = document.getElementsByClassName("flex-item").length;
    var ultimoElemento = document.getElementsByClassName("flex-item")[quantidadeDeItens - 1];
    var numero = +ultimoElemento.textContent + 1;

    //criar a tag, preencher com valor
    var novoItem = `<li class="flex-item">${numero}</li>`;


    // inserir elemento
    var itens = document.getElementsByClassName("flex-container")[0].innerHTML;
    itens += novoItem;
    document.getElementsByClassName("flex-container")[0].innerHTML = itens;

    fazComQueTodosOsItensSejamClicaveis()

}