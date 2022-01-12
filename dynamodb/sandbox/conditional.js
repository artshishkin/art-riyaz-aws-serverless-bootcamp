const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const defaultCallback = (err, data) => {
    if (err) console.log(err);
    else console.log(data);
};

let item = {
    "user_id": "111",
    "timestamp": 1,
    "cat": "Initial Category",
    "content": "Initial Content",
    "note_id": "54321",
    "title": "Initial Title",
    "username": "Art"
};

const operation = "modifiedPutConditionally";

switch (operation) {
    case "putConditionally":
        putConditionally(item);
        break;
    case "modifiedPutConditionally":
        item.cat = "Modified category";
        item.title = "Modified title";
        item.content = "Modified Content";
        putConditionally(item); // Must throw ConditionalCheckFailedException
        break;
}

function putConditionally(item) {
    const params = {
        TableName: "td_notes_sdk",
        Item: item,
        ConditionExpression: "#t <> :t",
        ExpressionAttributeNames: {
            "#t": "timestamp"
        },
        ExpressionAttributeValues: {
            ":t": item.timestamp
        }
    };
    docClient.put(params, defaultCallback);
}




