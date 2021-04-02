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

//algoritmo de busca
let algoritmo_busca = "";

//fator de busca
let fator_busca = "";

//verifica se chegou a resposta final
function validateGrid() {

    let success = true;

    success = listaLayout.filter((val, index) => {
        if(val.length == 0)
            val = 0;
        return val == parseInt(gabarito[index]);
    }).length == gabarito.length;

    if(success)
        setTimeout(() => {
            alert("Parabéns, você completou o puzzle após " + user_moves + " tentativas");
        });
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

    for (let i = 0; i < 9; i++) {
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
