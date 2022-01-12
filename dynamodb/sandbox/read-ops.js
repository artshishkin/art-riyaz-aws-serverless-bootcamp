const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const defaultCallback = (err, data) => {
    if (err) console.log(err);
    else console.log(data);
};

let item = {
    "user_id": "12345",
    "timestamp": 1641929907686,
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

const operation = "queryGlobalIndexFiltered";

switch (operation) {
    case "get":
        getItem(itemKey);
        break;
    case "queryTableGetAllItemsOfUser":
        queryTableGetAllItemsOfUser(itemKey.user_id);
        break;
    case "queryTable":
        queryTable(itemKey);
        break;
    case "queryLocalIndex":
        queryLocalIndex(itemKey.user_id);
        break;
    case "queryGlobalIndex":
        queryGlobalIndex();
        break;
    case "queryGlobalIndexFiltered":
        queryGlobalIndexFiltered();
        break;

}

function getItem(key) {
    const params = {
        TableName: "td_notes_sdk",
        Key: key
    };
    docClient.get(params, defaultCallback);
}

function queryTableGetAllItemsOfUser(user_id) {
    const params = {
        TableName: "td_notes_sdk",
        KeyConditionExpression: "user_id = :uId",
        ExpressionAttributeValues: {
            ":uId": user_id
        }
    };
    docClient.query(params, defaultCallback);
}

function queryTable(key) {
    const params = {
        TableName: "td_notes_sdk",
        KeyConditionExpression: "user_id = :uId AND #t >= :tStart",
        ExpressionAttributeNames: {
            '#t': "timestamp"
        },
        ExpressionAttributeValues: {
            ":uId": key.user_id,
            ":tStart": key.timestamp
        }
    };
    docClient.query(params, defaultCallback);
}

function queryLocalIndex(userId) {
    const params = {
        TableName: "td_notes_sdk",
        IndexName: "category-index",
        KeyConditionExpression: "user_id = :uId AND begins_with(cat, :catStart)",
        ExpressionAttributeValues: {
            ":uId": userId,
            ":catStart": "gen"
        }
    };
    docClient.query(params, defaultCallback);
}

function queryGlobalIndex() {
    const params = {
        TableName: "td_notes_sdk",
        IndexName: "note_id-index",
        KeyConditionExpression: "note_id = :nId",
        ExpressionAttributeValues: {
            ":nId": "54321"
        }
    };
    docClient.query(params, defaultCallback);
}

function queryGlobalIndexFiltered() {
    const params = {
        TableName: "td_notes_sdk",
        IndexName: "note_id-index",
        KeyConditionExpression: "note_id = :nId",
        ExpressionAttributeValues: {
            ":nId": "54321",
            ":catStart": "Ini"
        },
        FilterExpression: "begins_with(cat, :catStart)"
    };
    docClient.query(params, defaultCallback);
}
