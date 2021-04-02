let lista = []

function inserir(caminhoPercorrido, funcaoAvaliacao){
    let obj = {
        caminho: [caminhoPercorrido],
        custo: funcaoAvaliacao
    };

    //console.log("Caminho percorrido: " )
    //console.log(obj.caminho);

    lista.push(obj);
    lista.sort((ant, atual) => {return ant.custo > atual.custo})
}

function remove(){
    return lista.shift();
}


function inicializa(){
    lista = []
}

function isEmpty(){
    return lista.length == 0;
}