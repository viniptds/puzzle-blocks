//grid layout
let grid = document.querySelector("#grid");

//lista de elementos
var listaLayout = [];


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

//inicia a aplicacao
function init(e)
{
    //acoes disparadas
    button_mix.addEventListener("click", init);
    buttons_move.forEach((button) => {
        button.addEventListener("click", handleClickBox);
    })

    // button_solve.addEventListener("click", CalculaPassos);

    setUserMove(0);
    listaLayout = [4, 0, 1, 8, 3, 2, 7, 6, 5];//[1, 2, 3, 4, 5, 6, 7, 0, 8];

    if(e.type == 'click')
        mixGrid();

    let caminho = hillClimbing(gabarito, listaLayout);

    console.log("Caminho layout");
    console.log(caminho);

    listaLayout = caminho[caminho.length - 1].vetor;

    console.log("Profundidade = " + (caminho.length - 1))

    for(let i = 0; i < caminho.length; i++){
        elemento = caminho[i];
        
        fillGrid(elemento.vetor); 
        
    }
    
    //calculo de passos
    // CalculaPassos();
}

//clique na box para mexer
function handleClickBox(e)
{
    let elem = e.target.id;
    let box = elem.substr(3);

    if(moveBox(box))
        validateGrid();
}


//movimenta box atraves da edicao de list
function moveBox(boxIndex) {

    let box = document.querySelector("#tb_" + boxIndex);
    let destinyIndex = getFreeBox(boxIndex);
    let moved = false;

    if(destinyIndex !== false){
        listaLayout[destinyIndex] = parseInt(box.innerHTML);
        listaLayout[boxIndex] = 0;

        fillGrid(listaLayout);
        setUserMove(++user_moves);
        //console.log(list);
        moved = true;
    }

    return moved;
}


//preenche a grid com a sequencia de elementos
function fillGrid(list = [])
{
    [...grid.children].forEach(function(item, i) {
        if(list[i] > 0) {
            item.classList.add("bg-clear");
            item.classList.remove("bg-empty");
            item.innerHTML = list[i];
        }
        else {
            item.classList.add("bg-empty");
            item.classList.remove("bg-clear");
            item.innerHTML = "";
        }
    });
}


function mixGrid()
{
    // criar random
    listaLayout = shuffle(listaLayout);

}


//atribui valor as movimentos do jogador
function setUserMove(moves = 0) {
    user_moves = moves;
    let tentativas = document.querySelector("#user_moves");
    tentativas.innerHTML = moves;
}




let button_solve = document.querySelector('#btnSolve');
let button_mix = document.querySelector('#btnMix');
let buttons_move = document.querySelectorAll(".box");

//inicia toda aplicacao
window.addEventListener("load", init);