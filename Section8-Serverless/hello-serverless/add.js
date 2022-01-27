'use strict';

module.exports.handler = async (event) => {

    const bodyString = event.body;
    const body = JSON.parse(bodyString);

    let {number1, number2} = body;

    const result = number1 + number2;
    const output = {
        number1: number1,
        number2: number2,
        result: result
    };
    console.log(output);

    return {
        statusCode: 200,
        body: JSON.stringify(
            output,
            null,
            2
        ),
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
