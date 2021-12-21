//using callback
function doStuff(data, callback) {
    callback("Done");
}

doStuff(true, result => console.log(result));

//using promises
function doStuffPromise(data) {
    return new Promise((resolse, reject) => {
        let successMessage = {
            status: 'success',
            message: 'All is well!'
        };

        let errorMessage = {
            status: 'error',
            message: 'Oops! There was an error!'
        };
        if (typeof data === "boolean" && data === true) {
            resolse(successMessage);
        } else {
            reject(errorMessage);
        }
    });
}


doStuffPromise(false).then(
    successMess => console.log(successMess),
    errorMess => console.log(errorMess)
);


