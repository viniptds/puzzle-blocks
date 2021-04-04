//objeto para controle da fila de prioridade e suas operações
/*var PriorityQueue = function() {
    
    var that = {};

    let __prioriQueue;

    that.init = function() {
        __prioriQueue = new Array();
    };

    that.inserir = function(caminhoPercorrido, funcaoAvaliacao){
        let obj = {
            caminho: caminhoPercorrido,
            custo: funcaoAvaliacao
        };

        let pos = 0;
        
        while(pos < __prioriQueue.length && __prioriQueue[pos].custo < obj.custo)
        {
            pos++;
        }
        
        console.log(pos);

        __prioriQueue.splice(pos, 0, obj);
        console.log(__prioriQueue);
    };

    that.remove = function(){
        return __prioriQueue.shift();
    };

    that.vazia = function(){
        return __prioriQueue.length == 0;
    };

    that.getFirst = function(){
        return __prioriQueue[__prioriQueue.length-1] || false;
    }

    that.getAsList = function(){
        return __prioriQueue;
    }

    that.init();

    return that;
}

// q = new PriorityQueue();
// console.log(q);sl()ss
*/