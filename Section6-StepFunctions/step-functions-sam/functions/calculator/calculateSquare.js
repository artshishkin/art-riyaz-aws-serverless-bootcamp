const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-north-1' });

var lambda = new AWS.Lambda();

exports.lambdaHandler = async (event, context) => {
    let number = event.number;
    let payload = JSON.stringify({
        operation: "multiply",
        input: {
            operand1: number,
            operand2: number
        }
    });

    let params = {
        FunctionName: process.env.CALCULATOR_FUNCTION_NAME,
        InvocationType: "RequestResponse",
        Payload: payload
    }

    let data = await lambda.invoke(params).promise();

    let result = JSON.parse(data.Payload);

    return result.body;
};
