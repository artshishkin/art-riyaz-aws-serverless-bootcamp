/*
 *  DELETE /notes/t/{timestamp}
 */
'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require('./util');

exports.handler = async (event) => {

    try {
        const user_id = util.getUserId(event.headers);
        const timestamp = parseInt(event.pathParameters.timestamp);

        const data = await dynamoDb.delete({
            TableName: tableName,
            Key: {
                user_id: user_id,
                timestamp: timestamp
            }
        }).promise();

        return {
            statusCode: 200,
            headers: util.getResponseHeaders()
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

