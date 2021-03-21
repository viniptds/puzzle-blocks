//movimentos disponiveis para cada box - nao mexer
let moves = {
    tb_0: ['tb_1', 'tb_3'],
    tb_1: ['tb_0', 'tb_2', 'tb_4'],
    tb_2: ['tb_1', 'tb_5'],
    tb_3: ['tb_0', 'tb_4', 'tb_6'],
    tb_4: ['tb_1', 'tb_3', 'tb_5', 'tb_7'],
    tb_5: ['tb_4', 'tb_2', 'tb_8'],
    tb_6: ['tb_7', 'tb_3'],
    tb_7: ['tb_6', 'tb_4', 'tb_8'],
    tb_8: ['tb_7', 'tb_5']
};

//contador de movimentos do user
let user_moves = 0;

//grid layout
let grid = document.querySelector("#grid");

//lista de elementos
let list = [];

//inicia a aplicacao
function init(e)
{
    //acoes disparadas
    button_mix.addEventListener("click", init);
    buttons_move.forEach((button) => {
        button.addEventListener("click", handleClickBox);
    })

    setUserMove(0);
    list = [1, 2, 3, 4, 5, 6, 7, 0, 8];
    
    mixGrid();
    fillGrid();

    //calculo de passos

}

function mixGrid()
{
    // criar random
    list = shuffle(list);

    fillGrid();
}

//preenche a grid com a sequencia de elementos
function fillGrid()
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
    let elem = e.target;

    if(moveBox(elem))
        validateGrid();
}

//movimenta box atraves da edicao de list
function moveBox(box) {

    let boxIndex = box.id.substr(3);
    let destinyBox = getFreeBox(box.id);
    let moved = false;

    if(destinyBox){
        let destinyIndex = destinyBox.substr(3);
        list[destinyIndex] = parseInt(box.innerHTML);
        list[boxIndex] = 0;

        fillGrid();
        setUserMove(++user_moves);
        console.log(list);
        moved = true;
    }

    return moved;
}

//verifica se chegou a resposta final
function validateGrid() {
    //gabarito - nao mexer
    let gabarito = [1, 2, 3, 4, 5, 6, 7, 8, 0];
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

    let ret = moves[box].filter((item) => {
        let destiny = document.querySelector("#" + item);
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


let button_solve = document.querySelector('#btnSolve');
let button_mix = document.querySelector('#btnMix');
let buttons_move = document.querySelectorAll(".box");


//inicia toda aplicacao
window.addEventListener("load", init);