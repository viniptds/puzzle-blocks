//grid layout
let grid = document.querySelector("#grid");

//lista de elementos
var listaLayout = [];


//inicia a aplicacao
function init(e)
{
    //acoes disparadas
    switchActions(true);

    if(e.type == 'click')
    {
        //embaralha
        mixGrid();
    }
    
    setUserMove(0);
    listaLayout = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    //[1,6,2,4,0,3,7,5,8];

    if(e.type == 'click')
        mixGrid();

    fillGrid(listaLayout);

    //calculo de passos
    // CalculaPassos();

}

function solve() {

    setUserMove(0);
    switchActions(false);

    let canGo = true;
    let selected_algorithm = document.querySelector("#search_algorithm");
    let algoritmo_busca = '';
    
    let selected_fator = document.querySelector("#search_factor");
    let fator_busca = '';

    if(!selected_algorithm || !algoritmos_busca.includes(selected_algorithm.value)) {
        alert("Selecione algoritmo de busca");
        canGo = false;
    } else {
        algoritmo_busca = selected_algorithm.value;

        if(!selected_fator || !fatores_busca.includes(selected_fator.value)) {
            alert("Selecione função de avaliação");
            canGo = false;
        } else {
            fator_busca = selected_fator.value;
            let caminho = [];

            let apenasManhattan = (fator_busca == 'distanciaManhattan');
            console.log(apenasManhattan);
            if(algoritmo_busca == 'bestFirst') {
                caminho = bestFirst(gabarito, listaLayout, apenasManhattan);
                console.log("Caminho Best First");
            }
            else if(algoritmo_busca == 'hillClimbing') {
                caminho = hillClimbing(gabarito, listaLayout, apenasManhattan);
                console.log("Caminho HillClimbing");
            }
            console.log(caminho);
            showSteps(caminho);
            animateCaminho(caminho);
            switchActions(true);
        }
    }
    
    switchActions(true);
}

async function animateCaminho(caminho){

    if(caminho && caminho.length > 0)
    {
        listaLayout = caminho[0].vetor;
        fillGrid(caminho[0].vetor);
        caminho.splice(0, 1);

        setTimeout(() => {
            animateCaminho(caminho);
        }, 700);
    }else return true;
}

function showSteps(caminho){
    let div_box = document.querySelector('#report_matrizes');
    if(caminho && caminho.length > 0)
    {
        let child_box = document.querySelectorAll("#report_matrizes div");
        child_box.forEach((item) => {
            div_box.removeChild(item);
        });

        let count_caminho = document.createElement("h3");
        count_caminho.innerHTML = "Total de Iterações: " + caminho.length;
        div_box.append(count_caminho);

        div_box.classList.remove('display-none');
        caminho.forEach((item, i) => {
            let box_matrix = document.createElement("div");
            box_matrix = createMatrixFromList(item.vetor);
            // console.log(box_matrix);
            box_matrix.innerHTML = "Iteração "+ (i+1) + box_matrix.innerHTML;
            div_box.append(box_matrix);
        });
    }
    else
        div_box.classList.add('display-none');
}

function createMatrixFromList(list)
{
    let ret = document.createElement("div");
    ret.classList.add("report-box-matrix");

    for (let i = 0; i < list.length; i++) {
        if(i % 3 == 0) {
            ret.innerHTML += "<br>";
        }
        ret.innerHTML += " " +list[i];
    }
    return ret;
}


function switchActions(operation){
    if(operation){
        button_mix.addEventListener("click", init);
        buttons_move.forEach((button) => {
            button.addEventListener("click", handleClickBox);
        });

        button_solve.addEventListener("click", solve);
    }
    else{
        button_mix.onclick = false;
        buttons_move.forEach((button) => {
            button.onclick = false;
        })

        button_solve.onclick = false;
    }
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

// --------------------
// Operações do User
// --------------------

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