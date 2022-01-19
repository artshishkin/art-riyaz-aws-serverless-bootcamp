# art-riyaz-aws-serverless-bootcamp
AWS Lambda &amp; Serverless Architecture Bootcamp (Build 5 Apps) - Tutorial from Riyaz Sayyad (Udemy)

####  Section 21: Optional Background Concepts - ES6+ JavaScript and Node.js

#####  289. What is Node.js with 'Hello World' Example

-  `node app.js`
-  `node app`
-  `node` -> > you can run js

#####  295. Node.js Basics - Modules and NPM

-  `npm init`
-  `node index`
-  `npm install underscore --save`

#####  296. Node.js Basics - Building a Web Server and APIs with Express

-  `npm init`
-  `npm install express --save`
-  `node server`

#####  297. Node.js Basics - Creating REST APIs with Express

-  `npm install body-parser --save`

####  Section 1: Getting Started with Serverless Computing on AWS

#####  19. Test the Setup

-  `aws sts get-caller-identity`

####  Section 2: Serverless Foundation - AWS Lambda

#####  30. Hands on Demo: Accessing Path and Query String Parameters from the Event Object

-  `npm init`
-  `npm install moment --save`

#####  34.2 Adding image-magick-lambda-layer Manually

-  [image-magick-lambda-layer](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~image-magick-lambda-layer)
-  Deploy
-  Copy Layer ARN
-  Lambda console -> `node-resize-image-stack-ResizeImageFunction-dR...`
    -  Layers -> Add a Layer -> Specify an ARN -> Paste Layer ARN -> Add

####  Section 3: Serverless Foundation - Amazon API Gateway
    
#####  43. CORS Configuration for Lambda Proxy Integration

-  [www.test-cors.org](https://www.test-cors.org/)
-  Test `https://b3fsn6f2oc.execute-api.eu-north-1.amazonaws.com/Prod/greet/Arina`
   -  `Fired XHR event: error`
   -  Dev Tools (`Ctrl+Shift+I`)
       -  `Access to XMLHttpRequest at 'https://b3fsn6f2oc.execute-api.eu-north-1.amazonaws.com/Prod/greet/Arina' from origin 'https://www.test-cors.org' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
-  Enable CORS Manually
   -  API Gateway Console
   -  ~~GET -> Add Response 200 -> Add Header -> Access-Control-Allow-Origin~~ (can not do this)
   -  for Lambda proxy integration must provide in Lambda
   -  Test in [www.test-cors.org](https://www.test-cors.org/) -> OK

#####  56. API Gateway Post Deploy Options, Logging and Monitoring

1.  Create IAM Role for API Gateway to Log
   -  IAM Console -> New Role ->
   -  Select your use case: `API Gateway` ->
   -  Permissions: `AmazonAPIGatewayPushToCloudWatchLogs` (default)
   -  Role name: `riyaz-apigateway-logs-role`
2.  Attach role to the Gateway
   -  API Gateway console -> Settings
   -  CloudWatch log role ARN: paste ARN (like `arn:aws:iam::392971033516:role/riyaz-apigateway-logs-role`)
3.  Enable Logs for API Gateway
   -  Stages -> Prod -> Logs/Tracing
   -  Enable CloudWatch Logs
      -  Log level: INFO
   -  Log full requests/responses data: `true`
   -  Enable Detailed CloudWatch Metrics: `true`
4.  Invoke endpoint
   -  POST {{serverUrl}}/math/multiply (for example)
5.  View Logs in CloudWatch 
   - `API-Gateway-Execution-Logs_{rest-api-id}/{stage_name}`
   - `API-Gateway-Execution-Logs_gavlhwnjj1/Prod`
   
#####  59. Creating API Documentation

-  API Console -> Resources -> 
   -  `math/{operation}` -> POST -> 
   -  Actions -> Edit Method Documentation
-  Documentation -> Publish Documentation
   -  Stage: Prod
   -  Version: 1.0
-  Export
   -  OpenAPI 3 + API Gateway Extensions

#####  60. Creating API Keys and Usage Plans in API Gateway

1.  Create API Key
   -  API Gateway Console -> API Keys -> 
   -  Actions -> Create API Key
   -  Name: `Dev team`
   -  Description: `API Key for development team`
2.  Create Usage Plan
   -  API Gateway Console -> Usage Plans
   -  Name: `PremiumUsagePlan`
   -  Description: `Usage Plan for Premium Users`
   -  Rate: `1000` requests per second
   -  Burst: `200`
   -  Quota: `1000000` req per month
   -  Associated API Stages -> Add API Stage ->
      -  Greeting API -> Prod
   -  Add API Key to Usage Plan -> Dev team

#####  61. Passing API Keys with API Gateway Requests

-  API Console ->
   -  `greet/{name}` -> GET -> Method Execution ->
   -  API Key Required -> true
   -  same for the POST
-  HTTP Request
   -  Add header
   -  x-api-key: {{apiKey}}

####  Section 4: Serverless Foundation - Amazon DynamoDB

#####  75. Hands on Demo: Creating the DynamoDB Table

-  DynamoDB Console
-  Create Table
   -  Table name: `td_notes`
   -  Primary key:
      -  Partition key: `user_id` String
      -  Sort key: `timestamp` Number
   -  Customize Settings   
   -  Secondary indexes
      -  New **Local** Secondary Index
         -  Sort key: `title` String
         -  Index name: `title-index`
         -  Attribute projections: `All`
      -  New **Local** Secondary Index
         -  Sort key: `cat` String
         -  Index name: `category-index`
         -  Attribute projections: `All`
      -  New **Global** Index
         -  Partition key: `note_id` String
         -  Sort key: no
         -  Index name: note_id-index
         -  Attribute projections: `All`
   -  Capacity
      -  Autoscaling: OFF
      -  RCU: 2 (for study)
      -  WCU: 2 (for study)
   -  Create table

#####  76. Hands on Demo: Performing Write Operations with AWS Console

1.  Create Item
   -  DynamoDB Console -> td_notes -> Create item
   -  user_id: random String (I prefer [UUID generator](https://www.uuidgenerator.net/version4))
   -  timestamp: random number (I prefer [unixtimestamp](https://www.unixtimestamp.com/))
   -  note_id: some UUID
   -  cat: `"general"`
   -  title: `"my note"`
   -  user_name: `"Art"`
   -  content: `"this it the content of my note"`
2.  Duplicate
   -  Duplicate and modify
   -  Repeat a couple of times
3.  Create item without note_id
4.  Create item without cat
5.  Scan
   -  through `category-index` (local sec index) -> without `cat` are absent
   -  through `note_id-index` (global sec index) -> without `note_id` are absent

#####  77. Hands on Demo: Performing Read Operations with AWS Console   

1.  Two Options
   -  Scan
   -  Query
2.  Query by primary key   
   -  partition key + sort key (Number)
      -  equal, less, greater, between
      -  sort asc/desc
   -  **or**
   -  just partition key
3.  Query by local secondary index
   -  partition key + sort key (String)
      -  equal, less, greater, between, Begins with
4.  Query by global secondary index
   -  by partition key (note_id)
5.  Filter
   -  using non index keys
   -  applied **after** query is performed
      -  so it **NOT** affect your RCU using operations
   -  Example
      -  Query table by user_id = 1289c03b-77f6-4c7a-b5d3-0def67643a58 skipping sort key filtering:
      -  content (String) contains `note 3`
6.  Scan
   -  scan operations across partitions

#####  79. Hands on Demo: Working with DynamoDB with AWS SDK – Getting Ready

-  `npm init`
-  `npm install aws-sdk --save`

#####  87. Hands on Demo: Performing Paginated Reads with AWS SDK

-  `npm install async underscore --save`

####  Section 5: Serverless Deep Dive - Lambda, Gateway, DynamoDB

#####  88. Lambda Versions

-  test function -> result
```json
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3",
  "lambdaFunction": "event-logging-function",
  "lambdaVersion": "$LATEST"
}
```
-  Publish new Version
   -  Actions -> Publish new Version
   -  Description: v1
-  View -> `arn:aws:lambda:eu-north-1:392971033516:function:event-logging-function:1`
   -  `1` - is version number
   -  Test
```json
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3",
  "lambdaFunction": "event-logging-function",
  "lambdaVersion": "1"
}
```   
-  Modify code:
   -  `Code and handler editing is only available on the unpublished function page.`
   -  `Edit code` or switch to the `$LATEST`
   -  Add comment, Deploy   
   -  Publish new version

#####  89. The Need for Lambda Aliases

-  API Gateway -> Greeting API ->
   -  create Resource: `/lambda`
   -  create Method: GET
   -  Lambda `arn:aws:lambda:eu-north-1:392971033516:function:event-logging-function`
   -  Test -> got result with Lambda version `$LATEST`
-  Using versioned Lambda
   -  API Gateway -> `/lambda` -> GET -> Lambda function
   -  `event-logging-function:1`
   -  Deploy  
   -  Test -> got result with Lambda version `1`
   -  Ones again for version 2
-  Workflow without aliases
   -  modify lambda code
   -  publish new version
   -  api gateway console
   -  integration request
   -  modify used lambda version
   -  give the necessary IAM permissions
   -  **deploy API**

#####  90. Lambda Aliases

-  Lambda Console -> Create alias
   -  Name: `prod`
   -  Description: `Alias for Prod Stage`
   -  Version: `3`
   -  Create
-  Create another alias
   -  Name: `test`
   -  Version: `$LATEST`
-  Use Version Alias in API Gateway
   -  `/lambda` -> GET -> Lambda Function -> `event-logging-function:test`
   -  Test -> got result with Lambda version `$LATEST`
-  Update Lambda
   -  Deploy new Version
   -  Point alias test to new version
   -  **no need to redeploy** API Gateway
   -  Test: `"lambdaVersion": "4"`

#####  92. Stage Variables in API Gateway

-  Stages:
   -  Test
   -  Prod
-  Add Stage variable
   -  eventLoggerAlias
      -  for Test Stage: `test`
      -  for Prod Stage: `prod`
-  Provide Lambda alias through Stage variable
   -  Resources -> `/lambda` -> GET -> Int.Request -> Lambda Function
   -  `event-logging-function:${stageVariables.eventLoggerAlias}`
      -  Add Permission to Lambda Function
      -  Warning message with command
      -  `aws lambda add-permission   --function-name "arn:aws:lambda:eu-north-1:392971033516:function:event-logging-function:${stageVariables.eventLoggerAlias}"   --source-arn "arn:aws:execute-api:eu-north-1:392971033516:7apx5c3x79/*/GET/lambda"   --principal apigateway.amazonaws.com   --statement-id 5f811966-4bd1-4fe6-babc-8ef656f8b3ab   --action lambda:InvokeFunction`
      -  Run this command **for each stage alias** 
-  Deploy API
   -  Deploy Test Stage
   -  Deploy Prod Stage
-  Test   

#####  93. Traffic Shifting between Lambda Versions using Aliases

-  Lambda -> Functions -> event-logging-function -> Alias: prod
   -  General Configuration -> Edit
   -  Version: 3
   -  Weighted Alias
      -  Additional version: 4 
      -  Weight: 10% (for study purpose 40%)
   -  Save
-  Invoke several times
   -  `Section5-DeepDive\requests.http`
-  Move to 100% 

#####  94. Canary Deployments in API Gateway

-  API Gateway -> Stages -> Prod -> Canary -> Create Canary
   -  Percentage of requests directed to Canary: 50
-  Resources -> `/lambda` -> GET -> Integration Request
   -  Mapping Template
```json
{
    "stage":"$context.stage",
    "timestamp": "$context.requestTime"
}
```   
-  Deploy to Prod (Canary enabled)
-  Invoke several times
   -  `Section5-DeepDive\requests.http`
   - 50/50 w/wo timestamp
-  Promote Canary
-  Delete Canary

#####  95. Using Environment Variables in Lambda

-  Lambda Console
   - `event-logging-function`
   -  Configuration
   -  Environment variables -> Edit -> Add
      -  `APP_NAME`: `My App`
      -  `APP_SECRET`: `SUPER_SECRET_PASSWORD`
   -  Save
-  Test through console

#####  96. Creating the KMS Encryption Keys

-  Lambda console
-  Edit Environment variables
   -  Enable helpers for encryption in transit
   -  Need to create KMS key (user managed)
-  KMS -> Customer Managed Keys -> Create key
   -  Symmetric
   -  Alias: LambdaCustom
   -  Description: Lambda Custom KMS Key
   -  Define key administrative permissions: art_admin, art_mfa
   -  Define key usage permissions: art_admin, event-logging-function-role-l6gd2i7g
   -  Create

#####  97. Encrypting Environment Variables using KMS

-  Lambda console
-  Edit Environment variables
   -  AWS KMS key to encrypt at rest
      -  Use a customer master key: `LambdaCustom`
   -  Enable helpers for encryption in transit
   -  Encrypt `APP_SECRET`
   -  Decription Code Snippet 
-  Test in console -> OK   

#####  98. Running Lambda inside the VPC

-  Lambda function:
   -  `getRandomMessage`
   -  edit VPC
   -  attach this function to the default VPC
   -  Security group:
      -  Default VPC security group
   -  Need to create role with permission to access to VPC      
-  IAM
   -  Create custom role:
      -  Use case: `Lambda`
      -  Attach permissions policies: `AWSLambdaVPCAccessExecutionRole`   
      -  Role name: `lambda_vpc`
-  Lambda console   
   -  Attach role `lambda_vpc` to the Lambda 
   -  edit VPC
   -  attach this function to the default VPC
   -  Security group:
      -  Default VPC security group
-  Test lambda in the console





