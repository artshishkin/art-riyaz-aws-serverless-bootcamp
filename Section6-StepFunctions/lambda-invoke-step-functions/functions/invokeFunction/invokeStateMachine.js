const AWS = require('aws-sdk');
AWS.config.update({region: "eu-north-1"});

const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event) => {

    const input = event.input;

    const params = {
        stateMachineArn: process.env.STATE_MACHINE_ARN, /* required */
        input: JSON.stringify(input)
    };

    const result = await stepFunctions.startExecution(params).promise();
    console.log(JSON.stringify(result));

    return result;
}
