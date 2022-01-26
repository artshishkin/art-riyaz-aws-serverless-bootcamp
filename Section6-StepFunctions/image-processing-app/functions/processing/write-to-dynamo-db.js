const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const arrayToObject = (array) => {

    let result = {};

    array.forEach(value =>
        result = {
            ...result,
            ...value
        });

    return result;
};

exports.handler = async (event, context) => {

    const imagesArray = event.results.images;

    const images = arrayToObject(imagesArray);

    const item = {
        ...images,
        id: `${images.original.region}|${images.original.bucket}|${images.original.key}`,
        timestamp: new Date().getTime()
    };

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: item
    };
    const result = await docClient.put(params).promise();

    return true;
}



