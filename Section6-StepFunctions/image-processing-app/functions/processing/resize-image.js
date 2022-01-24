const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const {promisify} = require('util');

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const s3 = new AWS.S3();

exports.handler = async (event, context) => {

    const bucket = event.Bucket;
    const filename = event.Key;

    // Get the file from S3
    const params = {
        Bucket: bucket,
        Key: filename
    };

    const data = await s3.getObject(params).promise();
    console.log(JSON.stringify({...data, Body: []}));

    // Resize the file
    let tempFile = os.tmpdir() + '/' + uuid.v4() + '.png';
    let resizeArgs = {
        srcData: data.Body,
        dstPath: tempFile,
        width: process.env.IMAGE_WIDTH_PX
    };
    await resizeAsync(resizeArgs);

    // Read the resized file
    const resizedData = await readFileAsync(tempFile);

    // Upload the new file to S3
    const targetFilename = filename.replace("original/", "thumbnail/");

    const putParams = {
        Bucket: bucket,
        Key: targetFilename,
        Body: new Buffer(resizedData),
        ContentType: 'image/png'
    };

    const savedResizedImageData = await s3.putObject(putParams).promise();

    await unlinkAsync(tempFile);

    return {
        region: 'eu-north-1',
        bucket: bucket,
        key: targetFilename
    };
};
