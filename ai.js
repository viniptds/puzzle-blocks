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
            possibilidades.push(listaTemp);
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

    let i;
    /*
    console.log("L1");
    console.log(l1);
    console.log("L2");
    console.log(l2);
    */

    for(i = 0; i < l1.length; i++)
        if(l1[i] != l2[i])
            return false;

    return true;
}

function getNumOfBoxesOutsidePlace(lista, gabarito) {
    return lista.filter((item, index) => {
        return item != gabarito[index]
    }).length;
}

function numeroPecasForaDoLugar(matriz, gabarito)
{
    let pos = 0;
    let cont = 0;

    for(pos = 0; pos < matriz.length; pos++)
    {
        if(matriz[pos] != gabarito[pos])
        {
            cont++;
        }
    }

    return cont;
}

function busca(lista, numero)
{
    let pos = 0;

    while(pos < lista.length && lista[pos] != numero)
        pos++;

    return pos;
}

function calculateSumManhattanDIstance(userList, gabarito) {
    let perfectList = gabarito;
    let x1, x2, y1, y2;
    let sum = 0, manhattanDistance;
    let pos;

    for (let i = 0; i < 9; i++) {
            pos = busca(userList, perfectList[i]);

            x1 = Math.floor(i / 3);
            y1 = i % 3;

            x2 = Math.floor(pos / 3); 
            y2 = pos % 3;

            manhattanDistance = Math.abs(x1 - x2) + Math.abs(y1 - y2);

            sum = sum + manhattanDistance;
        
    }

    return sum;
}

function bestFirst(gabarito, listaInicial)
{
    pq = new PriorityQueue();

    let ultimoEstado = [];
    let caminhoPercorrido;
    let contAux = 0;
    let custo = numeroPecasForaDoLugar(listaInicial, gabarito);
    let listaCaminho = [];
    let estadosPercorridos = [];
    let melhorPossibilidade = []

    listaCaminho.push({vetor: listaInicial});
    estadosPercorridos.push({vetor: listaInicial});

    pq.enqueue(listaCaminho, custo);
    
    //console.log(estadosPercorridos);

    
    while(!pq.isEmpty())
    {
        contAux++;
    
        //console.log(contAux + "ª iteração");
        elemento = pq.rear();
        //console.log("Custo do elemento retirado: " + elemento.custo);

        caminhoPercorrido = elemento.caminho;
        ultimoEstado = caminhoPercorrido[caminhoPercorrido.length - 1].vetor;
        let menorCustoPossibilidades = 10;

        if(elemento.custo == 0)
        {
            //console.log(caminhoPercorrido);
            console.log((contAux - 1) + " iterações");
            return caminhoPercorrido.slice(0);
        }
        else
        {
            let possibilidades;

            if(caminhoPercorrido.length > 1)
            {
                possibilidades = possibilidade(ultimoEstado, caminhoPercorrido[caminhoPercorrido.length - 2].vetor);
            }
            else
            {
                possibilidades = possibilidade(ultimoEstado);
            }

            //console.log("Possibilidades geradas:");
            //console.log(possibilidades);

            for(let i = 0; i < possibilidades.length; i++)
            {
                let pos = 0;

                while(pos < estadosPercorridos.length && !eIgual(possibilidades[i], estadosPercorridos[pos].vetor))
                {
                    pos++;
                }

                if(pos == estadosPercorridos.length)
                {
                    custo = numeroPecasForaDoLugar(possibilidades[i], gabarito);

                    if(custo < menorCustoPossibilidades)
                    {
                        menorCustoPossibilidades = custo;
                        melhorPossibilidade = possibilidades[i];
                    }
                    else if(custo == menorCustoPossibilidades)
                    {
                        if(calculateSumManhattanDIstance(possibilidades[i], gabarito) <
                            calculateSumManhattanDIstance(melhorPossibilidade, gabarito)){
                                melhorPossibilidade = possibilidades[i];
                            }
                    }

                }
            }

            //console.log("Menor custo: " + menorCustoPossibilidades);

            let listaSeraInserida = caminhoPercorrido.slice(0);
            //console.log("Melhor possibilidade:");
            //console.log(melhorPossibilidade);
            listaSeraInserida.push({vetor: melhorPossibilidade});
            estadosPercorridos.push({vetor: melhorPossibilidade});
            pq.enqueue(listaSeraInserida, menorCustoPossibilidades);

        }
    }
   return null;
}