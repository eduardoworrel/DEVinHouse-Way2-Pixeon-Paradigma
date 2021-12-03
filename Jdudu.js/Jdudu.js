// Author: Eduardo Worrel
// Helper functions
// 17/11/2021

const $ = {
    get : function (seletor){
        const elemento = document.querySelector(seletor);
        if(elemento == null){
            throw new Error('O seletor "'+seletor+'" não foi encontrado')
        }
        return elemento
    },
        
    //------------Exemplo de uso do "modificaCSS()"
    
    // modificaCSS("footer", function(styleOfElement){
    //     styleOfElement.background = "cyan";
    //     styleOfElement.color = "black";
    // });

    //modificaCSS("footer", "background:black; color: white;");

    //modificaCSS("footer", {background: "cyan", color: "black"});


    modificaCSS : function (seletor, ajudante){

        const element = this.get(seletor);
    
        if(typeof ajudante == 'function'){
         
            ajudante(element.style);
    
        }else if(typeof ajudante == 'string'){
    
            element.style.cssText = ajudante;
    
        }else if(typeof ajudante == 'object'){
    
            for(let atributo in ajudante){
                element.style[atributo] = ajudante[atributo]
            }
    
        }else{
            throw new Error('O objeto "ajudante" não é de um tipo apropriado.')
        }
    },
    addClickAction: function (seletor, callback){
        const element = this.get(seletor);
        element.addEventListener("click", callback)
    } ,
    addGenericAction : function (seletor, event, callback){
        const element = this.get(seletor);
        element.addEventListener(event, callback)
    },
    //TO-DO: get css async
    getCSSAsync : (url)=>{
        const head = document.querySelector("head");
        return new Promise(function (resolve, reject){
            
            const style = document.createElement("link");
            style.href = url;
            style.rel  = 'stylesheet';
            style.type = 'text/css';
            style.media = 'all';
            head.appendChild(style);
            resolve();
        });
    },
 
    //TO-DO: get js async
    
    //TO-DO: get js and do async
    getJSAndDoAsync : (url,callback)=>{
        const head = document.querySelector("head");
        return new Promise(function (resolve, reject){
            const style = document.createElement("link");
            style.href = url;
            head.appendChild(style);
            callback()
            resolve();
        });
    }


    //TO-DO: get html async

    //TO-DO: get html and do async

} 


