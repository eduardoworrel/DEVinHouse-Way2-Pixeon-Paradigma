function AddItem(){

    let itens = document.getElementsByClassName("flex-item");
    let newLi = document.createElement("li");
    newLi.className = "flex-item";

    let newNumb;
    if(itens.length == 0){
        newNumb = document.createTextNode(`1`);
    }
    else {
        newNumb = document.createTextNode(`${itens.length+1}`);
    }    

    let newInputNumb = document.createElement("input");
    newInputNumb.className = "order";
    newInputNumb.type = "number";
    let newInputColor = document.createElement("input");
    newInputColor.className = "s-color";
    newInputColor.type = "color";
    newInputColor.value = "#ff6347";

    newLi.appendChild(newNumb);
    newLi.appendChild(newInputNumb);
    newLi.appendChild(newInputColor);
    document.getElementsByClassName("flex-container")[0].appendChild(newLi);

    //ChangeSingleBlockRandom();
    ChangeSingleBlockColor();
    ChangeSingleBlockOrder();

    return newLi;
}

function DeleteItem(){
    
    let container = document.getElementsByClassName("flex-container")[0];
    container.removeChild(container.lastChild);
}

function InvertOrder(){

    let container = document.getElementsByClassName("flex-container")[0];

    if (container.style.flexFlow == "row wrap"){
        container.style.flexFlow = "row-reverse wrap-reverse";
    }

    else {
        container.style.flexFlow = "row wrap";
    }
}

//change justify-content
function ChangeJustify(){
    let container = document.getElementsByClassName("flex-container")[0];
    let justify = document.getElementById("justify");
    
    container.style.justifyContent = justify.value;
}


//change all flex-item's colors
function ChangeColor(){

    let color = document.getElementById("color");
    let itens = document.getElementsByClassName("flex-item");
    
    for(let i=0; i<itens.length; i++){
        itens[i].style.backgroundColor = color.value;
    }
}

//change a single flex-item color
window.onload = ChangeSingleBlockColor();
function ChangeSingleBlockColor(){

    document.querySelectorAll('.flex-item').forEach(item => {
        item.children[1].addEventListener("change", () => {
            item.style.backgroundColor = item.children[1].value;
        });
    });
}

window.onload = SetGlobalFlexOrder();
function SetGlobalFlexOrder(){
    document.querySelectorAll('.flex-item').forEach(item => {
        item.style.order = 1;
    })
}

window.onload = ChangeSingleBlockOrder();
function ChangeSingleBlockOrder(){
    document.querySelectorAll('.flex-item').forEach(item => {
        item.children[0].addEventListener("change", () => {
            item.style.order = item.children[0].value;
        });
    });
}

window.onload = SaveOnPageChange();
function SaveOnPageChange(){
    document.querySelectorAll(".flex-container")[0].addEventListener("change", () => {
        SaveLayoutToLocalStorage();
    })

    document.querySelectorAll(".click-btn").forEach(element => {
        element.addEventListener("click", () => {
            SaveLayoutToLocalStorage();
        })
    })

    document.querySelectorAll(".input-btn").forEach(element => {
        element.addEventListener("change", () => {
            SaveLayoutToLocalStorage();
        })
    })
}


//window.onresize = SaveLayoutToLocalStorage();
function SaveLayoutToLocalStorage(){

    let container = document.querySelectorAll(".flex-container");
    let itens = document.querySelectorAll(".flex-item");
    let data = {};

    let containerData = {
        len : itens.length,
        flow : getCSSProperty(container[0], "flex-flow"),
        justify: getCSSProperty(container[0], "justify-content"),
        color : document.getElementById("color").value
    }
    
    let itensData = [];
    for(let i=0; i<itens.length; i++){
        
        let itemInfo = {
            text : itens[i].innerText,
            inputOrder : getCSSProperty(itens[i], "order"),
            color : getCSSProperty(itens[i], "background-color")
        };

        itensData.push(itemInfo);
    }

    data.containerData = containerData;
    data.itensData = itensData;

    localStorage.setItem("pageData", JSON.stringify(data));
}

LoadLocalStorage();
function LoadLocalStorage(){

    let data = JSON.parse(localStorage.getItem("pageData"));
    if(data == null){
        return;
    }
    let container = document.querySelectorAll(".flex-container");
    let itensData = data.itensData; 
    

    container[0].style.flexFlow = data.containerData.flow;
    container[0].style.justifyContent = data.containerData.justify;

    for(i=0; i<data.itensData.length; i++){
        
        AddItem();
        let item = document.querySelectorAll(".flex-item")[i];
        item.textContet = itensData[i].text;
        item.style.order = itensData[i].inputOrder;
        item.style.backgroundColor = itensData[i].color;
        item.children[1].value = itensData[i].color;
    }
}

function getCSSProperty(element, property){
    return window.getComputedStyle(element).getPropertyValue(property);
}

/*
function Clear(){

}

//from stackoverflow
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  */
/*

window.onload = ChangeSingleBlockRandom();
function ChangeSingleBlockRandom(){

    document.querySelectorAll('.flex-item').forEach(item => {
        item.addEventListener("click", () => {
                lista.push(item);
                let rc = [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.    random()*256)];
                item.style.backgroundColor = `rgb(${rc[0]}, ${rc[1]}, ${rc[2]})`
        })
    })
}
*/