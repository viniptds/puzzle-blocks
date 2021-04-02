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
    // console.log("Lista atual:")
    // console.log(lista);
    let indexEmptyBox = getEmptyBox(lista);

    // console.log(indexEmptyBox);

    moves[indexEmptyBox].forEach((val, i) => {
        let listaTemp = new Array(...lista);

        listaTemp[indexEmptyBox] = lista[val];
        listaTemp[val] = 0;
        // console.log(listaTemp);
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
        return item != gabarito[index];
    }).length;
}

function bestFirst(gabarito, listaInicial){
    // console.log(gabarito);
    // console.log(listaInicial);
    
    let pri_q = new PriorityQueue();
    let contAux = 0;
    pri_q.inserir(listaInicial, getNumOfBoxesOutsidePlace(listaInicial, gabarito));
    console.log(pri_q.isEmpty());

    while(!pri_q.isEmpty()){
        let elemento = pri_q.remove();

            console.log("Fila as List: \n\n");
            console.log(pri_q.getAsList());
            
        // console.log(elemento);
        // throw false;
        contAux++;

        //break pois está em loop
        if(contAux > 10)
            throw "chega";

        // console.log("Iteração")
        // console.log(contAux);

        let caminhoPercorrido = elemento.caminho;
        let ultimoEstado = caminhoPercorrido[caminhoPercorrido.length - 1];

        if(ultimoEstado == gabarito)
            return caminhoPercorrido;
        else{
            let possibilidades;
            let possibilidadesSeraoInseridas = [];

            // console.log(caminhoPercorrido.length);
            if(caminhoPercorrido.length > 0){
                possibilidades = possibilidade(ultimoEstado, caminhoPercorrido[caminhoPercorrido.length - 2]);

                //percorre as possibilidade e ve viabilidade para inserir no caminho
                possibilidades.forEach((itemPoss, i) => {

                    let existeNoCaminho = caminhoPercorrido.filter((itemCaminho, i) => {
                        return isEqual(itemPoss, itemCaminho);
                    });

                    if(!existeNoCaminho || existeNoCaminho.length == 0)
                        possibilidadesSeraoInseridas.push(itemPoss);
                    
                });

            }else{
                possibilidades = possibilidade(ultimoEstado);
                possibilidadesSeraoInseridas = possibilidades;
            }

            console.log("Possibilidades");
            console.log(possibilidades);
            console.log("Caminho percorrido");
            console.log(caminhoPercorrido);
            // console.log("Último estado");
            // console.log(ultimoEstado);


            possibilidadesSeraoInseridas.forEach((itemToInsert, i) => {
                // console.log(itemToInsert);
                pri_q.inserir(itemToInsert, getNumOfBoxesOutsidePlace(itemToInsert, gabarito));
            });
        }
    }
}