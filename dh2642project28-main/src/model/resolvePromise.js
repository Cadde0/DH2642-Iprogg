function resolvePromise(prms, promiseState) {
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    // Return a new promise
    return new Promise(function(resolve, reject) {
        if (prms !== null) {
            prms.then(dataACB).catch(errorACB);
        }

        // Handles successful promise, updates data property
        function dataACB(result) {
            if (promiseState.promise !== prms) return;
            promiseState.data = result;
            resolve(result); // Resolve the new promise
        }
    
        // Handles rejected promise, updates error property
        function errorACB(error) {
            if (promiseState.promise !== prms) return;
            promiseState.error = error;
            reject(error); // Reject the new promise
        }
    });
}

export default resolvePromise;

