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

//
// doStuffPromise(false).then(
//     successMess => console.log(successMess),
//     errorMess => console.log(errorMess)
// );

// console.log("-------error occurred-----");
// doStuffPromise(false)
//     .then(
//         () => {
//             console.log("First doStuff resolved");
//             return doStuffPromise(true);
//         }
//     )
//     .then(
//         () => {
//             console.log("Second doStuff resolved");
//         },
//         () => {
//             console.log("Second doStuff rejected");
//         }
//     );

//with catch
console.log("-------with catch-----");
doStuffPromise(true)
    .then(
        () => {
            console.log("First doStuff resolved");
            return doStuffPromise(false);
        }
    )
    .then(
        () => {
            console.log("Second doStuff resolved");
        }
    )
    .catch(
        () => {
            console.log("An error occurred");
        }
    );
