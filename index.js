//movimentos disponiveis para cada box - nao mexer
let moves =[
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4, 6],
    [1, 3, 5, 7],
    [4, 2, 8],
    [7, 3],
    [6, 4, 8],
    [7, 5]
];

//gabarito - nao mexer
let gabarito = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// console.log(moves);

//contador de movimentos do user
let user_moves = 0;

//grid layout
let grid = document.querySelector("#grid");

//lista de elementos
var list = [];

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
    list = [1,6,2,4,0,3,7,5,8];//[1, 2, 3, 4, 5, 6, 7, 0, 8];

    if(e.type == 'click')
        mixGrid();

    let caminho = bestFirst(gabarito, list);

    list = caminho[caminho.length - 1];

    fillGrid(list);
    
    //calculo de passos
    // CalculaPassos();
}

function mixGrid()
{
    // criar random
    list = shuffle(list);

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
        list[destinyIndex] = parseInt(box.innerHTML);
        list[boxIndex] = 0;

        fillGrid(list);
        setUserMove(++user_moves);
        //console.log(list);
        moved = true;
    }

    return moved;
}

//verifica se chegou a resposta final
function validateGrid() {

    let success = true;

    success = list.filter((val, index) => {
        if(val.length == 0)
            val = 0;
        return val == parseInt(gabarito[index]);
    }).length == gabarito.length;

    if(success)
        alert("Parabéns, você completou o puzzle após " + user_moves + " tentativas");
}

//busca box vazia ao redor da box clicada
function getFreeBox(box){

    let ret = moves[box].filter((item, index) => {
        let destiny = document.querySelector("#tb_" + item);
        return destiny.innerHTML.length == 0;
    });

    if(ret.length)
        return ret[0];
    return false;
}

//gera lista aleatoria
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//atribui valor as movimentos do jogador
function setUserMove(moves = 0) {
    user_moves = moves;
    let tentativas = document.querySelector("#user_moves");
    tentativas.innerHTML = moves;
}

//calcula a quantidade de peças fora do lugar
function calculateNumberOfMisplacedPieces(userList) {
    let perfectList = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let cont = 0;

    for (var i = 0; i < 9; i++) {
        if (userList[i] != perfectList[i]) {
            cont++;
        }
    }

    return cont;
}

//busca exaustiva para a distância Manhattan
function searchNumberInsideGrid(list, number) {
    let pos = 0;

    while (pos < 9 && list[i] != number) {
        pos++;
    }

    if (pos < 9) {
        return pos;
    } else {
        return -1;
    }
}

//calcula a soma das Distâncias Manhattan entre a matriz atual e a matriz necessária para o usuário ganhar
function calculateSumOfManhattanDistances(userList) {
    let perfectList = gabarito;
    let x1, x2, y1, y2;
    let sum = 0, manhattanDistance;

    for (var i = 0; i < 9; i++) {
        pos = searchNumberInsideGrid(userList, perfectList[i]);

        x1 = Math.floor(i / 3);
        y1 = i % 3;

        x2 = Math.floor(pos / 3);
        y2 = pos % 3;

        manhattanDistance = Math.abs(x1 - x2) + Math.abs(y1 - y2);

        sum = sum + manhattanDistance;
    }

    return sum;
}

let button_solve = document.querySelector('#btnSolve');
let button_mix = document.querySelector('#btnMix');
let buttons_move = document.querySelectorAll(".box");

//inicia toda aplicacao
window.addEventListener("load", init);