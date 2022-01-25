const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

exports.handler = async (event, context) => {

    const eventWithId = {
        ...event,
        id: uuid.v4().toString()
    };

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: eventWithId
    };
    const result = await docClient.put(params).promise();

    return result;
}



