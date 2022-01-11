const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const dynamoDB = new AWS.DynamoDB();

const operation = "listTables";

switch (operation) {
    case "listTables":
        listTables();
        break;
    case "describeTable":
        describeTable("td_notes");
        break;
    case "createTable":
        createTable();
        break;
    case "updateTable":
        updateTable();
        break;
    case "describeTableUpdated":
        describeTable("td_notes_sdk");
        break;
    case "deleteTable":
        deleteTable("td_notes_sdk");
        break;

}

function listTables() {
    dynamoDB.listTables({}, (err, data) => {
        if (err) console.log(err);
        else console.log(data);
    });
}

function describeTable(tableName) {
    const describeParams = {TableName: tableName};
    dynamoDB.describeTable(describeParams, (err, data) => {
        if (err) console.log(err);
        else console.log(JSON.stringify(data, null, 2));
    });
}

function createTable() {
    const createTableParams = {
        TableName: "td_notes_sdk",
        KeySchema: [
            {AttributeName: "user_id", KeyType: "HASH"},
            {AttributeName: "timestamp", KeyType: "RANGE"}
        ],
        AttributeDefinitions: [
            {AttributeName: "user_id", AttributeType: "S"},
            {AttributeName: "timestamp", AttributeType: "N"},
            {AttributeName: "cat", AttributeType: "S"},
            {AttributeName: "title", AttributeType: "S"},
            {AttributeName: "note_id", AttributeType: "S"}
        ],
        LocalSecondaryIndexes: [
            {
                IndexName: "category-index",
                KeySchema: [
                    {AttributeName: "user_id", KeyType: "HASH"},
                    {AttributeName: "cat", KeyType: "RANGE"}
                ],
                Projection: {
                    ProjectionType: "ALL"
                }
            },
            {
                IndexName: "title-index",
                KeySchema: [
                    {AttributeName: "user_id", KeyType: "HASH"},
                    {AttributeName: "title", KeyType: "RANGE"}
                ],
                Projection: {
                    ProjectionType: "ALL"
                }
            }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: "note_id-index",
                KeySchema: [
                    {AttributeName: "note_id", KeyType: "HASH"}
                ],
                Projection: {
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 2,
                    WriteCapacityUnits: 2
                }
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 3,
            WriteCapacityUnits: 3
        }
    };
    dynamoDB.createTable(createTableParams, (err, data) => {
        if (err) console.log(err);
        else console.log(JSON.stringify(data, null, 2));
    });
}

function updateTable() {
    const updateTableParams = {
        TableName: "td_notes_sdk",

        ProvisionedThroughput: {
            ReadCapacityUnits: 4,
            WriteCapacityUnits: 4
        }
    };
    dynamoDB.updateTable(updateTableParams, (err, data) => {
        if (err) console.log(err);
        else console.log(JSON.stringify(data, null, 2));
    });
}

function deleteTable(tableName) {
    const deleteTableParams = {
        TableName: tableName
    };
    dynamoDB.deleteTable(deleteTableParams, (err, data) => {
        if (err) console.log(err);
        else console.log(JSON.stringify(data, null, 2));
    });
}

