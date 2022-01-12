const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();

const operation = "scanTablePaginated";

switch (operation) {

    case "scanTablePaginated":
        scanTablePaginated();
        break;

}

function scanTablePaginated(exclusiveStartKey) {
    const params = {
        TableName: "td_notes_sdk",
        Limit: 3,
        ExclusiveStartKey: exclusiveStartKey

    };
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            if (data.LastEvaluatedKey) {
                scanTablePaginated(data.LastEvaluatedKey);
            }
        }
    });
}

