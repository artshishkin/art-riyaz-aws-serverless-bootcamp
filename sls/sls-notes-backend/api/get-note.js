'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require('./util');
const _ = require('underscore');

exports.handler = async (event) => {

    try {

        const noteId = decodeURIComponent(event.pathParameters.note_id);
        const params = {
            TableName: tableName,
            IndexName: "note_id-index",
            KeyConditionExpression: "note_id = :nId",
            ExpressionAttributeValues: {
                ":nId": noteId
            },
            Limit: 1
        };
        const data = await dynamoDb.query(params).promise();

        if (!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data.Items[0])
            };
        } else {
            return {
                statusCode: 204,
                headers: util.getResponseHeaders(),
                body: JSON.stringify('')
            };
        }

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

