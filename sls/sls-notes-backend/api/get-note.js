'use strict';

'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require('./util');

exports.handler = async (event) => {

    try {

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify('')
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

