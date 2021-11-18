
var lista = document.createElement("ul");
lista.setAttribute("id","listaNova");
document.getElementById("container").appendChild(lista);

var itemSalvosLS = localStorage;
var numeroDeItens = itemSalvosLS.getItem("numItens");
if (numeroDeItens == null){
    itemSalvosLS.setItem("numItens", 0);
    numeroDeItens= itemSalvosLS.getItem("numItens");
}


//recuperaItensLS();

function criaItem(){
    let quantItens = document.querySelectorAll(".itens").length;
    var elementoNovo = document.createElement("li");
    elementoNovo.setAttribute("class","itens");
    elementoNovo.setAttribute("name",quantItens);
    document.getElementById("listaNova").appendChild(elementoNovo); 
    var elemento = document.createElement("label");
    elemento.setAttribute("id","label"+quantItens); 
    elemento.textContent = quantItens;  
    elementoNovo.appendChild(elemento); 
    var elementoInputOrd = document.createElement("input");
    elementoInputOrd.setAttribute("id","ordem"+quantItens);
    elementoInputOrd.setAttribute("type","number");
    elementoNovo.appendChild(elementoInputOrd);
    var elementoCor = document.createElement("input");
    elementoCor.setAttribute("id","cor"+quantItens);
    elementoCor.setAttribute("type","color");
    elementoNovo.appendChild(elementoCor);  
    atualizaItens();

}

function atualizaItens(){
    var justificacaoItens = document.getElementById('jContent').value;
    var el = document.getElementById("listaNova");
    el.style.justifyContent = justificacaoItens;
    const filhos = document.querySelectorAll(".itens");

    for (var filho of filhos){
        var ordem = filho.childNodes[1].value;
        var cor = filho.childNodes[2].value;
        filho.setAttribute("style","background-color:"+cor+";order:"+ordem+";flex:"+ordem+";");
    }
    salvarLS()
}


function salvarLS(){
    var dadosItens = {};
    var listaItens = document.getElementsByClassName("itens");
    var numeroDeItens = listaItens.length;
    for (var i=0; i < listaItens.length; i++){

        dadosItens[listaItens[i].childNodes[0].textContent] =  {
            numero : listaItens[i].childNodes[0].textContent,
            corDoFundo : listaItens[i].style.backgroundColor,
            ordemItem : listaItens[i].style.order
        }
    }
    itemSalvosLS.setItem("numItens", numeroDeItens);
    itemSalvosLS.setItem("dadosSessao",JSON.stringify(dadosItens));
}

function recuperaItensLS(){
    var temElNaLista = document.getElementsByClassName("itens");
    if (temElNaLista.length != numeroDeItens){
        var listaItensRecup = JSON.parse(itemSalvosLS.getItem('dadosSessao'));
        
        for (var i=0; i < Object.keys(listaItensRecup).length; i++){
            var elementoNovo = document.createElement("li");
            elementoNovo.setAttribute("class","itens");
            document.getElementById("listaNova").appendChild(elementoNovo); 
            var elemento = document.createElement("label");
            elemento.setAttribute("id","label");
            elementoNovo.setAttribute("name",listaItensRecup[i]["numero"]);
            elemento.textContent = listaItensRecup[i]["numero"];
            elementoNovo.appendChild(elemento); 


            var elementoInputOrd = document.createElement("input");
            elementoInputOrd.setAttribute("id","ordem");
            elementoInputOrd.setAttribute("type","number");
            elementoNovo.appendChild(elementoInputOrd);
            elementoInputOrd.style.order = listaItensRecup[i]["ordemItem"];
            


            var elementoCor = document.createElement("input");
            elementoCor.setAttribute("id","cor");
            elementoCor.setAttribute("type","color");
            inputColor = elementoCor.getAttribute("type","color");
            elementoNovo.appendChild(elementoCor); 
            elementoCor.parentElement.style.backgroundColor = listaItensRecup[i]["corDoFundo"];


        }
    }
    
}
