function salvaAtualizacoesNoLocalStorage(func) {

    var container = document.querySelector(".flex-container");
    var objetoASerSalvoNoStorage = {
        itemsESuasCaracteristicas:[],
        caracteristicasDoContainer: {
            justificacao: getCSSProperty(container,"justify-content"),
            direcao: container.style.flexDirection,
            quebraLinha: container.style.flexWrap
        }
    };

    var todosOsItes = document.querySelectorAll(".flex-item");
    for(var item of todosOsItes){
        var jsonDasCaracteristicasDesseItem = {
            ordemFlexivel :getCSSProperty(item,"order"),
            corDeFundo: item.style.backgroundColor,
            conteudo: item.textContent
        };
        objetoASerSalvoNoStorage.itemsESuasCaracteristicas.push(jsonDasCaracteristicasDesseItem)
    }
    console.log(objetoASerSalvoNoStorage);
}




var EstaInvertido = true;
const filhos = document.querySelectorAll(".flex-item");
for (var filho of filhos) {

    var color = document.createElement("input");
    color.type = "color";

    color.addEventListener("change", function (e) {
        var EsseElemento = e.srcElement;
        var PaiDele = EsseElemento.parentElement;
        PaiDele.style.backgroundColor = EsseElemento.value;
    });
    filho.appendChild(color);
    var corSelecionada = document.getElementById("corItens").value;


    filho.addEventListener("click", function (e) {
        alteraACorDoItem(e, corSelecionada);

    });
    filho.addEventListener("dblclick", function (e) {
        alteraAOrdemDoItem(e);
    });
}

function alteraAOrdemDoItem(e) {
    var numeroEscolhidoPeloUsuario = window.prompt("Qual valor em ordem esse item deve ter?");
    var elementoHtml = e.srcElement;
    elementoHtml.style.order = numeroEscolhidoPeloUsuario;
    salvaAtualizacoesNoLocalStorage();
}

function alteraACorDoItem(e, corSelecionada) {
    var itemClicado = e.srcElement;

    var corComputada = getCSSProperty(itemClicado,"background-color");
    if (corComputada == "rgb(255, 99, 71)") {
        itemClicado.style.backgroundColor = "black";
    }
    salvaAtualizacoesNoLocalStorage();
}

function mudaCorDosItens() {
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
    salvaAtualizacoesNoLocalStorage();
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
    salvaAtualizacoesNoLocalStorage();
}

function adiciona() {
    //criar elemento
    var quantidadeDeItens = document.getElementsByClassName("flex-item").length;
    var ultimoElemento = document.getElementsByClassName("flex-item")[quantidadeDeItens - 1];
    var numero = +ultimoElemento.textContent + 1;

    //criar a tag, preencher com valor
    var novoLI = document.createElement("li");
    novoLI.classList.add("flex-item");
    novoLI.textContent = numero;

    //injeto um input color
    var color = document.createElement("input");
    color.type = "color";

    color.addEventListener("change", function (e) {
        var EsseElemento = e.srcElement;
        var PaiDele = EsseElemento.parentElement;
        PaiDele.style.backgroundColor = EsseElemento.value;
    });
    novoLI.appendChild(color);

    //adiciono os comportamentos esperados
    novoLI.addEventListener("click", function (e) {
        alteraACorDoItem(e, corSelecionada);
    });


    novoLI.addEventListener("dblclick", function (e) {
        alteraAOrdemDoItem(e);
    });

    // inserir elemento
    var itens = document.getElementsByClassName("flex-container")[0].appendChild(novoLI);
    salvaAtualizacoesNoLocalStorage();
}


function getCSSProperty(elemento,propriedade){
    return  window.getComputedStyle(elemento).getPropertyValue(propriedade);
}