const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const s3 = new AWS.S3();

exports.handler = async (event) => {

    const bucket = event.Bucket;
    const filename = event.Key;

    // Copy the file from S3 /original folder to /destination folder
    const copyKey = filename.replace('original/', 'destination/');
    const params = {
        Bucket: bucket,
        CopySource: encodeURI(`/${bucket}/${filename}`),
        Key: copyKey
    };

    const result = await s3.copyObject(params).promise();

    return {
        region: 'eu-north-1',
        bucket: bucket,
        key: copyKey
    };
}
