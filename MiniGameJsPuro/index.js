const constantes = {
    tamanhoDaDiminuicao: 0,
    perdeu : false,
    PixelAumentadoPorClick : 75,
    PixelDiminuidoPorClick : 2,
    tamanhoMaximo : 330,
    tamanhoMinimo : 25,
    tamanhoInicial: 190
};

//muda cor do circulo aleatoriamente com linear gradient a cada clique

const $circuloPrincipal = document.querySelector("#circuloPrincipal")
const $pontuacao = document.querySelector("#ponto")


setInterval(()=>{
    const ObjetoComDimensoes = recuperaDimensaoDoCirculo();
    let largura = ObjetoComDimensoes.largura ;
    let altura = ObjetoComDimensoes.altura;

    $circuloPrincipal.style.width = 
    (largura - constantes.tamanhoDaDiminuicao < 0)
    ? 0 + "px" 
    : (largura - constantes.tamanhoDaDiminuicao) + "px";

    $circuloPrincipal.style.height =
     (altura - constantes.tamanhoDaDiminuicao < 0)
    ? 0 + "px" 
    : (altura - constantes.tamanhoDaDiminuicao) + "px";

    if(!constantes.perdeu){
        validaSePerdeu();
    }
},100);

function mudaCor(){
    $circuloPrincipal.style.backgroundImage = `linear-gradient(to right, rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}), rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}))`;
}


$circuloPrincipal.addEventListener("click", e =>{


    mudaCor();
    const ObjetoComDimensoes = recuperaDimensaoDoCirculo();
    let largura = ObjetoComDimensoes.largura ;
    let altura = ObjetoComDimensoes.altura;
    $circuloPrincipal.style.width = (largura + constantes.PixelAumentadoPorClick) + "px";
    $circuloPrincipal.style.height = (altura + constantes.PixelAumentadoPorClick) + "px";
    constantes.tamanhoDaDiminuicao = Math.floor(Math.random()*45) + 1;
    if(!constantes.perdeu){
        validaSePerdeu();
        SomaPontos()
    }else{
        constantes.perdeu = false;
    }
});

function SomaPontos(){
    let pontucaoAtual =  parseFloat($pontuacao.textContent)
    $pontuacao.textContent = (pontucaoAtual + parseFloat(1 + constantes.tamanhoDaDiminuicao * 10)).toFixed(2);
}

function validaSePerdeu(){

    const ObjetoComDimensoes = recuperaDimensaoDoCirculo();
    if(ObjetoComDimensoes.altura < constantes.tamanhoMinimo || ObjetoComDimensoes.altura > constantes.tamanhoMaximo
        || ObjetoComDimensoes.largura < constantes.tamanhoMinimo || ObjetoComDimensoes.largura > constantes.tamanhoMaximo){
            constantes.perdeu = true


            const result = confirm("Game-Over meu patrão ou minha patroa. Deseja jogar novamente?");
            if(result){
                    $circuloPrincipal.style.width =  constantes.tamanhoInicial + "px";
                    $circuloPrincipal.style.height = constantes.tamanhoInicial + "px";
                    constantes.tamanhoDaDiminuicao = 0; 
                    $pontuacao.textContent = 0;
            }else{
                constantes.tamanhoDaDiminuicao = 0;   
            }
        }
}

function recuperaDimensaoDoCirculo(){
    return {
        largura : $circuloPrincipal.getBoundingClientRect().width,
        altura : $circuloPrincipal.getBoundingClientRect().height
    }
}