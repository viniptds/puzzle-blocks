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
function getEmptyBox(matriz) {
    let index = 0;

    matriz.forEach((item, i) => {
        if(item == 0) index = i;
    });
    return index;
}

function possibilidade(lista, passoAnterior = []) {
    let possibilidades = [];
    console.log("Lista atual:")
    console.log(lista);
    let indexEmptyBox = getEmptyBox(lista);

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

function getNumOfBoxesOutsidePlace(lista, gabarito) {
    return lista.filter((item, index) => {
        return item != gabarito[index]
    }).length;
}

function calculateSumOfManhattanDistances(userList, gabarito) {
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

function bestFirst(gabarito, listaInicial){
    inicializa();
    let contAux = 0;

    inserir(listaInicial, getNumOfBoxesOutsidePlace(listaInicial, gabarito));

    while(!isEmpty()){
        elemento = remove();

        contAux++;

        console.log("Iteração")
        console.log(contAux);

        caminhoPercorrido = elemento.caminho;
        ultimoEstado = caminhoPercorrido[caminhoPercorrido.length - 1];

        if(ultimoEstado == gabarito)
            return caminhoPercorrido;
        else{
            let possibilidades;
            let possibilidadesSeraoInseridas = [];

            if(caminhoPercorrido.length > 1){
                possibilidades = possibilidade(ultimoEstado, caminhoPercorrido[caminhoPercorrido.length - 2]);

                for(let i = 0; i < possibilidades; i++){
                    let pos = 0;

                    while(pos < caminhoPercorrido.length && !isEqual(possibilidades[i], caminhoPercorrido[pos]))
                        pos++;

                    if(pos == caminhoPercorrido.length){
                        possibilidadesSeraoInseridas.push(possibilidades[i]);
                    }
                }
            }else{
                possibilidades = possibilidade(ultimoEstado);
                possibilidadesSeraoInseridas = possibilidades;
            }

            console.log("Possibilidades");
            console.log(possibilidades)
            console.log("Caminho percorrido");
            console.log(caminhoPercorrido);
            console.log("Último estado");
            console.log(ultimoEstado);


            for(let i = 0; i < possibilidadesSeraoInseridas.length; i++){
                inserir(caminhoPercorrido.push(possibilidadesSeraoInseridas[i]),
                                               getNumOfBoxesOutsidePlace(possibilidadesSeraoInseridas[i], gabarito));                     
            }
        }
    }
}