const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {

    let userId = event.pathParameters.userId;

    let data = await dynamodb.get({
        TableName: tableName,
        Key: {
            userId: userId
        }
    }).promise();

    if (data.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "User not found"
            })
        };
    }
}