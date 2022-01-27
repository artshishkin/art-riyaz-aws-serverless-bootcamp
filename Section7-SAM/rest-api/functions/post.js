const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

const uuid = require('uuid');

exports.handler = async(event) => {

    // let userid = event.pathParameters.userid;
    let userid = uuid.v4().toString();
    let {firstName, lastName, email, website} = JSON.parse(event.body);

    let item = {
        userId: userid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        website: website
    }

    let data = await dynamodb.put({
        TableName: tableName,
        Item: item
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            userId: userid
        })
    };
}