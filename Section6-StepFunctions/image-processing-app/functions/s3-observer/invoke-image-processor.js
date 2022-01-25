const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event, context) => {

    const filesProcessed = event.Records.map(async (record) => {
        const bucket = record.s3.bucket.name;

        // Solution from the [Official Sample](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-tutorial.html#with-s3-tutorial-create-function-code)
        const filename = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
        console.log(filename);

        try {

            const s3ObjectParams = {
                Bucket: bucket,
                Key: filename
            };

            const params = {
                stateMachineArn: process.env.STATE_MACHINE_ARN, /* required */
                input: JSON.stringify(s3ObjectParams)
            };

            const data = await stepFunctions.startExecution(params).promise();
            console.log(data);
            return data;

        } catch (err) {
            console.error("Error calling S3 getObject:", err);
            return Promise.reject(err);
        }
    });

    let results = await Promise.all(filesProcessed);
    return results;
};
