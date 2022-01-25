const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

exports.handler = async (event, context) => {

    const images = {
        ...event[0],
        ...event[1]
    };
    const item = {
        ...images,
        id: `${images.original.region}|${images.original.bucket}|${images.original.key}`,
        timestamp: new Date().getTime()
    };

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: item
    };
    const result = await docClient.put(params).promise();

    return true;
}



