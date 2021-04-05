/*
lista 
1)
[ 1,6,2,4,0,3,7,5,8 ]
*/

//retorna indice da caixa vazia
function getEmptyBox(matriz) {
    let index = 0;
    matriz.forEach((item, i) => {
        if(item == 0) index = i;
    });
    return index;
}


function possibilidade(lista) {
    let possibilidades = [];
    let indexEmptyBox = getEmptyBox(lista);

    //console.log(lista);
    // console.log(indexEmptyBox);

    moves[indexEmptyBox].forEach((val, i) => {
        let listaTemp = new Array(...lista);

        listaTemp[indexEmptyBox] = lista[val];
        listaTemp[val] = 0;
        possibilidades.push(listaTemp);
        listaTemp = [];
    });
    return possibilidades;
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

    for (let i = 0; i < gabarito.length; i++) {
            pos = busca(gabarito, userList[i]);

            x1 = (Math.floor(i / 3)) + 1;
            y1 = (i % 3) + 1;

            x2 = (Math.floor(pos / 3)) + 1; 
            y2 = (pos % 3) + 1;

            manhattanDistance = Math.abs(x2 - x1) + Math.abs(y2 - y1);

            sum = sum + manhattanDistance;
    }

    return sum;
}

function bestFirst(gabarito, listaInicial, apenasManhattan = false)
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
    
    console.log(estadosPercorridos);

    while(!pq.isEmpty())
    {
        contAux++;
    
        console.log(contAux + "ª iteração");
        elemento = pq.rear();
        console.log("Custo do elemento retirado: " + elemento.custo);

        caminhoPercorrido = elemento.caminho;

        console.log("Caminho percorrido");
        console.log(elemento.caminho);

        ultimoEstado = caminhoPercorrido[caminhoPercorrido.length - 1].vetor;

        console.log(ultimoEstado);

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

            possibilidades = possibilidade(ultimoEstado);

            console.log("Possibilidades geradas:");
            console.log(possibilidades);

            if(apenasManhattan)
            {
                for(let i = 0; i < possibilidades.length; i++)
                {
                    let pos = 0;



                    while(pos < estadosPercorridos.length && !eIgual(possibilidades[i], estadosPercorridos[pos].vetor))
                    {
                        pos++;
                    }

                    if(i == 0)
                    {
                        menorCustoPossibilidades = calculateSumManhattanDIstance(possibilidades[i], gabarito);
                    }

                    if(pos == estadosPercorridos.length)
                    {
                       custo = calculateSumManhattanDIstance(possibilidades[i], gabarito);

                       if(custo < menorCustoPossibilidades)
                       {
                           menorCustoPossibilidades = custo;
                           melhorPossibilidade = possibilidades[i];
                       }
                    }
                }
            }
            else
            {
                for(let i = 0; i < possibilidades.length; i++)
                {
                    
                    let pos = 0;

                    while(pos < estadosPercorridos.length && !eIgual(possibilidades[i], estadosPercorridos[pos].vetor))
                    {
                        pos++;
                    }

                    custo = numeroPecasForaDoLugar(possibilidades[i], gabarito);

                    if(pos == estadosPercorridos.length)
                    {
                        
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
            }



            console.log("Menor custo: " + menorCustoPossibilidades);

            let listaSeraInserida = caminhoPercorrido.slice(0);
            console.log("Melhor possibilidade: " + melhorPossibilidade);
            //console.log("Melhor possibilidade:");
            //console.log(melhorPossibilidade);
            listaSeraInserida.push({vetor: melhorPossibilidade});
            estadosPercorridos.push({vetor: melhorPossibilidade});
            pq.enqueue(listaSeraInserida, menorCustoPossibilidades);

            if(contAux > 1500)
                throw "Loop";
        }
    }
    return null;
}

let estadosPercorridosHC;

function hillClimbing(gabarito, estadoInicial, apenasManhattan = false)
{
    estadosPercorridosHC = [];
    let listaCaminho = [];

    listaCaminho.push({vetor: estadoInicial});
    estadosPercorridosHC.push({vetor: estadoInicial});

    let obj = {caminho: listaCaminho, custo: numeroPecasForaDoLugar(estadoInicial, gabarito)};

    return hillClimbingAux(gabarito, obj, apenasManhattan, 0);
}

function hillClimbingAux(gabarito, estadoAtual, apenasManhattan, cont)
{
    //Critério de parada
    if(estadoAtual.custo == 0)
    {
        console.log("CUSTO ZERO: " + estadoAtual.custo);
        console.log(estadoAtual.caminho);
        return estadoAtual.caminho;
    }
    else //Passo recursivo
    {

        let caminhoPercorrido = estadoAtual.caminho;
        let ultimoEstado = caminhoPercorrido[caminhoPercorrido.length - 1].vetor;
        let menorCustoPossibilidades = 100;

        let possibilidades;

        possibilidades = possibilidade(ultimoEstado);

        console.log("Possibilidades geradas:");
        console.log(possibilidades);

        if(apenasManhattan)
            {
                for(let i = 0; i < possibilidades.length; i++)
                {
                    let pos = 0;



                    while(pos < estadosPercorridosHC.length && !eIgual(possibilidades[i], estadosPercorridosHC[pos].vetor))
                    {
                        pos++;
                    }

                    if(pos == estadosPercorridosHC.length)
                    {
                       custo = calculateSumManhattanDIstance(possibilidades[i], gabarito);

                       if(custo < menorCustoPossibilidades)
                       {
                           menorCustoPossibilidades = custo;
                           melhorPossibilidade = possibilidades[i];
                       }
                    }
                }
            }
            else
            {
                for(let i = 0; i < possibilidades.length; i++)
                {
                    let pos = 0;

                    while(pos < estadosPercorridosHC.length && !eIgual(possibilidades[i], estadosPercorridosHC[pos].vetor))
                    {
                        pos++;
                    }

                    custo = numeroPecasForaDoLugar(possibilidades[i], gabarito);


                    if(pos == estadosPercorridosHC.length)
                    {
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
            }


            //console.log("Menor custo: " + menorCustoPossibilidades);

            let listaSeraInserida = caminhoPercorrido.slice(0);
            console.log("Melhor possibilidade: " + melhorPossibilidade);
            //console.log("Melhor possibilidade:");
            //console.log(melhorPossibilidade);
            listaSeraInserida.push({vetor: melhorPossibilidade});
            estadosPercorridosHC.push({vetor: melhorPossibilidade});

            let obj = {
                caminho: listaSeraInserida,
                custo: menorCustoPossibilidades
            };

            if(cont > 2000)
              throw "Loop infinito";

            return hillClimbingAux(gabarito, obj, apenasManhattan, cont + 1);
    }
}