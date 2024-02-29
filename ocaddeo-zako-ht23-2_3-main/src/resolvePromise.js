
export default function resolvePromise(prms, promiseState) { 
    
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    function dataACB(data) {
        if(promiseState.promise == prms){
            promiseState.data = data;
        }
        
    }

    function errorACB(error) {
        if(promiseState.promise == prms){
            promiseState.error = error;
        }
    }


    /*In a first version, the dataACB  (give it your own name!) 
    simply needs to save its parameter (the promise result!) 
    into promiseState.data. Similarly errorACB will save its parameter into promiseState.error .
    To have access to promiseState, the ACBs must be defined nested into resolvePromise , 
    in order to have access to the promiseState parameter, and (in the next step) to prms.*/
    
    if(promiseState.promise) {
        prms.then(dataACB).catch(errorACB)
    }

    


}


