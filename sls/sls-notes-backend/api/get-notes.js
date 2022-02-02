'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require('./util');

exports.handler = async (event) => {

    try {

        const query = event.queryStringParameters;
        const limit = query?.limit || 5;
        const userId = util.getUserId(event.headers);

        const params = {
            TableName: tableName,
            KeyConditionExpression: 'user_id = :uId',
            ExpressionAttributeValues: {
                ':uId': userId
            },
            Limit: limit,
            ScanIndexForward: false
        };

        const startTimestamp = +query?.start || 0;

        if (startTimestamp > 0) {
            params.ExclusiveStartKey = {
                user_id: userId,
                timestamp: startTimestamp
            }
        }

        console.log(JSON.stringify(params));

        const data = await dynamoDb.query(params).promise();

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(data)
        };

    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(
                {
                    error: err.name ? err.name : "Exception",
                    message: err.message ? err.message : "Unknown error"
                }
            )
        };
    }
};

