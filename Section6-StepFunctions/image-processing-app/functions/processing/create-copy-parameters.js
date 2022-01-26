exports.handler = async (event) => {

    const bucket = event.Bucket;
    const filename = event.Key;

    // Copy the file from S3 /original folder to /destination folder
    const copyKey = filename.replace('original/', `${process.env.DESTINATION_FOLDER}/`);
    const params = {
        Bucket: bucket,
        CopySource: encodeURIComponent(`/${bucket}/${filename}`),
        Key: copyKey
    };

    console.log(JSON.stringify(params));

    return {
        copyParams: params
    };
}
