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

    const filesProcessed = event.Records.map(async (record) => {
        const bucket = record.s3.bucket.name;
        const filename = record.s3.object.key;
        try {

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
                width: 128
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

            console.debug(JSON.stringify(savedResizedImageData));

            return await unlinkAsync(tempFile);

        } catch (err) {
            console.error("Error calling S3 getObject:", err);
            return Promise.reject(err);
        }
    });

    await Promise.all(filesProcessed);
    console.debug('Done!');
    return "Done!";
};
