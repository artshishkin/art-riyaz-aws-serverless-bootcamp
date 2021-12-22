function doStuff(data) {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            if (typeof data == 'number') {
                resolve(data * data)
            } else {
                reject("Please provide a number");
            }
        }, 1000);
    }));
}

//chaining
doStuff(2)
    .then(result => {
        console.log(result);
        return doStuff(result);
    })
    .then(result => {
        console.log(result);
        return doStuff(result);
    })
    .then(result => console.log(result))
    .catch(error => console.log(error));





