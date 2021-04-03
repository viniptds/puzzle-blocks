/*
lista 
1)
[ 1,6,2,4,0,3,7,5,8 ]
*/

let best_sequence = [];

function CalculaPassos() {
    let caminho = new Array();
    buscaRota(list, gabarito, caminho);
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
    
    let indexEmptyBox = getEmptyBox(lista);


    moves[indexEmptyBox].forEach((val, i) => {
        let listaTemp = new Array(...lista);

        listaTemp[indexEmptyBox] = lista[val];
        listaTemp[val] = 0;
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

function eIgual(l1, l2)
{
    if(!l1 || !l2)
        return false;

    if(l1.length != l2.length)
        return false;

    let contIguais = 0;

    console.log("L1");
    console.log(l1);
    console.log("L2");
    console.log(l2);

    while(contIguais < l1.length && l1[contIguais] == l2[contIguais])
    {
        contIguais++;
    }

    return contIguais == l1.length;
}

function getNumOfBoxesOutsidePlace(lista, gabarito) {
    return lista.filter((item, index) => {
        return item != gabarito[index]
    }).length;
}

function numeroPecasForaDoLugar(matriz, gabarito){
    let pos = 0;
    let cont = 0;
    /*
    console.log("Possibilidade")
    console.log(matriz);
    console.log("Gabarito");
    console.log(gabarito);
    */
    for(pos = 0; pos < matriz.length; pos++){
        if(matriz[pos] != gabarito[pos]){
            cont++;
        }
    }

    return cont;
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
    pq = new PriorityQueue();

    let ultimoEstado = [];
    let caminhoPercorrido;
    let contAux = 0;
    let custo = numeroPecasForaDoLugar(listaInicial, gabarito);
    let listaCaminho = [];

    listaCaminho.push({vetor: listaInicial});

    pq.inserir(listaCaminho, custo);
    
    while(!pq.isEmpty()){
        elemento = pq.remove();

        contAux++;
    
        caminhoPercorrido = elemento.caminho;
        ultimoEstado = caminhoPercorrido[caminhoPercorrido.length - 1].vetor;

        if(ultimoEstado == gabarito)
        {
            return caminhoPercorrido;
        }
        else{
            //console.log("ultimoEstado");
            //console.log(ultimoEstado);

            let possibilidades;
            let possibilidadesSeraoInseridas = [];

            if(caminhoPercorrido.length > 1){
                possibilidades = possibilidade(ultimoEstado, caminhoPercorrido[caminhoPercorrido.length - 1].vetor);

                for(let i = 0; i < possibilidades.length; i++){
                    let pos = 0;

                    console.log("Possibilidade");
                    console.log(possibilidades[i]);
                    console.log("Gabarito");
                    console.log(gabarito);
                    console.log(eIgual(possibilidades[i], gabarito));

                    while(pos < caminhoPercorrido.length && !eIgual(possibilidades[i], caminhoPercorrido[pos].vetor))
                    {
                        /*console.log("Caminho percorrido");
                        console.log(caminhoPercorrido[pos].vetor);*/
                        pos++;
                    }

                    if(pos == caminhoPercorrido.length){
    
                        custo = numeroPecasForaDoLugar(possibilidades[i], gabarito);
                        //console.log("Esta possibilidade será inserida, com o custo: " + custo)
                        //console.log(possibilidades[i]);
                        if(custo < numeroPecasForaDoLugar(ultimoEstado, gabarito)){
                            possibilidadesSeraoInseridas.push(possibilidades[i]);
                        }
                    }
                }
            }else{
                possibilidades = possibilidade(ultimoEstado);
                possibilidadesSeraoInseridas = possibilidades;

            }

            for(let i = 0; i < possibilidadesSeraoInseridas.length; i++){
                let listaSeraInserida = caminhoPercorrido.slice(0);
                listaSeraInserida.push({vetor: possibilidadesSeraoInseridas[i]});
                
                if(isEqual(possibilidadesSeraoInseridas[i], gabarito))
                    {
                        console.log("aaaaaa");
                        return listaSeriaInserida;
                    }

                custo = numeroPecasForaDoLugar(possibilidadesSeraoInseridas[i], gabarito);
                pq.inserir(listaSeraInserida, custo);                     
                
            }

            console.log(contAux);
        }
    }

    console.log("ULTIMO ESTADO");
    console.log(ultimoEstado);
    let retorno = caminhoPercorrido.slice(0);
    retorno.push({vetor: ultimoEstado});

    return retorno;
}