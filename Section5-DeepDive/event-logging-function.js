const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-north-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
const encrypted = process.env['APP_SECRET'];
let decrypted;

function processEvent(event, context) {
    let log = event;
    log.lambdaFunction = context.functionName;
    log.lambdaVersion = context.functionVersion;

    log.appName = process.env.APP_NAME;
    log.appSecret = process.env.APP_SECRET;
    log.appSecretDecrypted = decrypted;

    return log;
}

exports.handler = async (event, context) => {
    if (!decrypted) {
        // Decrypt code should run once and variables stored outside of the
        // function handler so that these are decrypted once per container
        const kms = new AWS.KMS();
        try {
            const req = {
                CiphertextBlob: Buffer.from(encrypted, 'base64'),
                EncryptionContext: { LambdaFunctionName: functionName },
            };
            const data = await kms.decrypt(req).promise();
            decrypted = data.Plaintext.toString('ascii');
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
    }
    return processEvent(event, context);
};

