/*
lista 
1)
[ 1,6,2,4,0,3,7,5,8 ]
*/

let best_sequence = [];

function CalculaPassos() {
    let caminho = new Array();
    buscaRota(list, gabarito, caminho);
    // console.log(caminho);
    caminho.forEach((item) => {
        setTimeout(() => { fillGrid(item) }, 2000);
    })
}

//retorna indice da caixa vazia
function getEmptyBox(list) {
    let index = 0;

    list.forEach((item, i) => {
        if(item == 0) index = i;
    });
    return index;
}

function possibilidade(lista, passoAnterior = []) {
    let possibilidades = [];
    let indexEmptyBox = getEmptyBox(lista);

    console.log(lista);
    // console.log(indexEmptyBox);

    moves[indexEmptyBox].forEach((val, i) => {
        let listaTemp = new Array(...lista);

        listaTemp[indexEmptyBox] = lista[val];
        listaTemp[val] = 0;
        console.log(listaTemp);
        if(!isEqual(passoAnterior, listaTemp))
            possibilidades[i] = listaTemp;
        listaTemp = [];
    });
    return possibilidades;
}

function buscaRota(lista, gabarito, caminho, count = 4) {

    if(!isEqual(lista, gabarito) && count > 0)
    {
        let maior = [0, 0];

        let possibilidades = possibilidade(lista, caminho[caminho.length-1]);
        console.log(possibilidades);

        let melhor_filho = possibilidades
        .forEach((item, i) => {
            let num = getNumOfBoxesInPlace(item, gabarito);
            if(item > maior[1])
                maior = [i, item];
        });

        buscaRota(possibilidades[maior[0]], gabarito, caminho, count-1);
        caminho.push(possibilidades[maior]);
    }
}

function isEqual(lista1, lista2) {
    return lista1 && lista2 && lista1.length == lista2.length && 
    lista1.filter((val, i) => {
        lista2[i] == val
    }).length == lista2;
}

function getNumOfBoxesInPlace(lista, gabarito) {
    return lista.filter((item, index) => {
        return item == gabarito[index]
    }).length;
}