'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require('./util');
const uuid = require('uuid');
const moment = require('moment');

exports.handler = async (event) => {

    try {
        let item = JSON.parse(event.body).Item;
        item.user_id = util.getUserId(event.headers);
        item.user_name = util.getUserName(event.headers);

        item.note_id = item.user_id + ':' + uuid.v4();
        item.timestamp = moment().unix();
        item.expires = moment().add(90, 'days').unix();

        let data = await dynamoDb.put({
            TableName: tableName,
            Item: item
        }).promise();

        return {
            statusCode: 201,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
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

