const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {

    let userId = event.pathParameters.userId;
    let {firstName, lastName, email, website} = JSON.parse(event.body);

    let item = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        website: website
    }

    let data = await dynamodb.put({
        TableName: tableName,
        Item: item
    }).promise();

    console.log(data);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data updated successfully."
        })
    };
}