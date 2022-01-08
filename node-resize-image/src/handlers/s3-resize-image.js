const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
// const uuidv4 = require('uuid/v4');
const {promisify} = require('util');

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const s3 = new AWS.S3();

exports.handler = async (event, context) => {

    const filesProcessed = event.Records.map(async (record) => {
        const params = {
            Bucket: record.s3.bucket.name,
            Key: record.s3.object.key
        };
        try {
            const data = await s3.getObject(params).promise();
            const modifiedData = {
                ...data,
                "Body": []
            };
            console.info(JSON.stringify(modifiedData));
        } catch (err) {
            console.error("Error calling S3 getObject:", err);
            return Promise.reject(err);
        }
    });

    await Promise.all(filesProcessed);
    console.debug('Done!');
    return "Done!";
};
