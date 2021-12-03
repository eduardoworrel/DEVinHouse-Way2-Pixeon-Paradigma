function salvaAtualizacoesNoLocalStorage(func) {

    let container = document.querySelector(".flex-container");
    let objetoASerSalvoNoStorage = {
        itemsESuasCaracteristicas:[],
        caracteristicasDoContainer: {
            justificacao: getCSSProperty(container,"justify-content"),
            direcao: container.style.flexDirection,
            quebraLinha: container.style.flexWrap
        }
    };

    let todosOsItes = document.querySelectorAll(".flex-item");
    for(let item of todosOsItes){
        let jsonDasCaracteristicasDesseItem = {
            ordemFlexivel :getCSSProperty(item,"order"),
            corDeFundo: item.style.backgroundColor,
            conteudo: item.textContent
        };
        objetoASerSalvoNoStorage.itemsESuasCaracteristicas.push(jsonDasCaracteristicasDesseItem)
    }
    console.log(objetoASerSalvoNoStorage);
}




let EstaInvertido = true;
const filhos = document.querySelectorAll(".flex-item");
for (let filho of filhos) {

    let color = document.createElement("input");
    color.type = "color";

    color.addEventListener("change", function (e) {
        let EsseElemento = e.srcElement;
        let PaiDele = EsseElemento.parentElement;
        PaiDele.style.backgroundColor = EsseElemento.value;
    });
    filho.appendChild(color);
    let corSelecionada = document.getElementById("corItens").value;


    filho.addEventListener("click", function (e) {
        alteraACorDoItem(e, corSelecionada);

    });
    filho.addEventListener("dblclick", function (e) {
        alteraAOrdemDoItem(e);
    });
}

function alteraAOrdemDoItem(e) {
    let numeroEscolhidoPeloUsuario = window.prompt("Qual valor em ordem esse item deve ter?");
    let elementoHtml = e.srcElement;
    elementoHtml.style.order = numeroEscolhidoPeloUsuario;
    salvaAtualizacoesNoLocalStorage();
}

function alteraACorDoItem(e, corSelecionada) {
    let itemClicado = e.srcElement;

    let corComputada = getCSSProperty(itemClicado,"background-color");
    if (corComputada == "rgb(255, 99, 71)") {
        itemClicado.style.backgroundColor = "black";
    }
    salvaAtualizacoesNoLocalStorage();
}

function mudaCorDosItens() {
    //recupera cor escolhida
    let corSelecionada = document.getElementById("corItens").value;
    let itens = document.getElementsByClassName("flex-item");
    for (let item of itens) {
        item.style.background = corSelecionada;
    }
}

function mudaJustificacao() {
    let container = document.getElementsByClassName("flex-container")[0];

    let justificacaoSelecionadaPeloUsuario = document.getElementById("possiveisJustificacoes").value;

    document.getElementsByClassName("flex-container")[0].style.justifyContent = justificacaoSelecionadaPeloUsuario;
    salvaAtualizacoesNoLocalStorage();
}

function inverte() {
    let container = document.getElementsByClassName("flex-container")[0];

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
    let quantidadeDeItens = document.getElementsByClassName("flex-item").length;
    let ultimoElemento = document.getElementsByClassName("flex-item")[quantidadeDeItens - 1];
    let numero = +ultimoElemento.textContent + 1;

    //criar a tag, preencher com valor
    let novoLI = document.createElement("li");
    novoLI.classList.add("flex-item");
    novoLI.textContent = numero;

    //injeto um input color
    let color = document.createElement("input");
    color.type = "color";

    color.addEventListener("change", function (e) {
        let EsseElemento = e.srcElement;
        let PaiDele = EsseElemento.parentElement;
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
    let itens = document.getElementsByClassName("flex-container")[0].appendChild(novoLI);
    salvaAtualizacoesNoLocalStorage();
}


function getCSSProperty(elemento,propriedade){
    return  window.getComputedStyle(elemento).getPropertyValue(propriedade);
}