const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDB = new AWS.DynamoDB();

dynamoDB.listTables({}, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});

const describeParams = {TableName: 'td_notes'};
dynamoDB.describeTable(describeParams, (err, data) => {
    if (err) console.log(err);
    else console.log(JSON.stringify(data, null, 2));
});
