const AWS = require("aws-sdk");
AWS.config.update({region: "eu-north-1"});

const docClient = new AWS.DynamoDB.DocumentClient();