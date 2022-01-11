const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const defaultCallback = (err, data) => {
    if (err) console.log(err);
    else console.log(data);
};

let item = {
    "user_id": "12345",
    // "timestamp": +new Date(),
    "timestamp": 1,
    "cat": "general",
    "content": "My cool note",
    "note_id": "54321",
    "title": "My title",
    "username": "Art"
};

const itemKey = {
    "user_id": item.user_id,
    "timestamp": item.timestamp
};

const operation = "batchWrite";

switch (operation) {
    case "put":
        putItem(item);
        break;
    case "modify":
        item.title += "_modified";
        item.content += "_modified";
        putItem(item);
        break;
    case "update":
        updateItem(itemKey);
        break;
    case "delete":
        deleteItem(itemKey);
        break;
    case "batchWrite":
        batchWriteItems();
        break;
}

function putItem(item) {
    const params = {
        TableName: "td_notes_sdk",
        Item: item
    };
    docClient.put(params, defaultCallback);
}

function updateItem(key) {
    const params = {
        TableName: "td_notes_sdk",
        Key: key,
        UpdateExpression: "SET #u = :u",
        ExpressionAttributeNames: {
            '#u': 'username'
        },
        ExpressionAttributeValues: {
            ':u': "Art Shyshkin"
        }
    };
    docClient.update(params, defaultCallback);
}

function deleteItem(key) {
    const params = {
        TableName: "td_notes_sdk",
        Key: key
    };
    docClient.delete(params, defaultCallback);
}

function batchWriteItems() {
    const params = {
        RequestItems: {
            "td_notes_sdk": [
                {
                    PutRequest: {
                        Item: {
                            "user_id": "1",
                            "timestamp": +new Date(),
                            "cat": "general1",
                            "content": "My cool note1",
                            "note_id": "note_1_1",
                            "title": "My title1",
                            "username": "Art1"
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            "user_id": "2",
                            "timestamp": +new Date(),
                            "cat": "general2",
                            "content": "My cool note2",
                            "note_id": "note_2_1",
                            "title": "My title2",
                            "username": "Art2"
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            "user_id": "3",
                            "timestamp": +new Date(),
                            "cat": "general3",
                            "content": "My cool note3",
                            "note_id": "note_3_1",
                            "title": "My title3",
                            "username": "Art3"
                        }
                    }
                }
            ]
        }
    };
    docClient.batchWrite(params, defaultCallback);
}




