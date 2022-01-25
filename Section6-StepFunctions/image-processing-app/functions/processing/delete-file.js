const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const s3 = new AWS.S3();

exports.handler = async (event) => {

    const bucket = event.Bucket;
    const filename = event.Key;

    const params = {
        Bucket: bucket,
        Key: filename
    };

    const result = await s3.deleteObject(params).promise();

    return true;
}
