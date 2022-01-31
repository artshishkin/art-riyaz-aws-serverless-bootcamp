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

#####  102. Testing Retry Behavior and DLQs in AWS Lambda

-  SNS console
   -  `dlq-test-LambdaAsyncTrigger-VWHYXUTS4W2S`
   -  Publish message:
      -  `Triggering Lambda function dlqTest`
-  Lambda CloudWatch Logs
   -  Error
   -  Retry in 60 sec
   -  Another retry in ~120 sec
-  SQS console
   -  Poll for messages
```json
{
   "Records": [
      {
         "EventSource": "aws:sns",
         "EventVersion": "1.0",
         "EventSubscriptionArn": "arn:aws:sns:eu-north-1:392971033516:dlq-test-LambdaAsyncTrigger-VWHYXUTS4W2S:6b87912b-920f-4050-bd3d-7861a7181ec5",
         "Sns": {
            "Type": "Notification",
            "MessageId": "71ce0149-086e-531e-b7c8-5b2b3e2baf26",
            "TopicArn": "arn:aws:sns:eu-north-1:392971033516:dlq-test-LambdaAsyncTrigger-VWHYXUTS4W2S",
            "Subject": null,
            "Message": "Triggering Lambda function dlqTest",
            "Timestamp": "2022-01-19T15:53:41.924Z",
            "SignatureVersion": "1",
            "Signature": "KPdHd2fRJYjgNTOyc2P1m7l4DA7KV5/G8uBezLJLePgyYMNJBEjIsx+aM5D/e1vGor2nmYSIvysBR5uOMpZzejbDDcKCb86V3WXdQIv0EOMu9NGIpPRu7QJzQAWGnPmaFA0jP2jV14B8SBK1HPxEgyngYApcLDAG9D6DK0d6uFLsgoQt/MEMwev5TbfEoRA63iR397Zh0N11zWm7+bLPPY095GDI3teodyVXlA1ORZ/0+tqCn3X2df6LOvqCa7mG5JDfc9FONzrzEWSnv42614LrhauOcYurBKE0iPj7Lw9perR8i+gWHtN4/tywQFwpFtJVBvDStyQdqLTAiFxAEA==",
            "SigningCertUrl": "https://sns.eu-north-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem",
            "UnsubscribeUrl": "https://sns.eu-north-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:eu-north-1:392971033516:dlq-test-LambdaAsyncTrigger-VWHYXUTS4W2S:6b87912b-920f-4050-bd3d-7861a7181ec5",
            "MessageAttributes": {}
         }
      }
   ]
}
```   

#####  109. Controlling Access with Standard IAM Roles and Policies

Create user for testing
-  IAM -> Users
   -  Add users
      -  Name: `apigw-user`
      -  `Access key - Programmatic access`
   -  Create user (wo permissions)
      -  Access key ID: `AKIAVW7XGDOWFLXUJMBT`
      -  Secret access key: `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`
-  Add permissions
   -  User `apigw-user`
   -  Add inline policy
      -  Service: ExecuteAPI
      -  Actions: Invoke
      -  Resources: `arn:aws:execute-api:eu-north-1:392971033516:059fs536ub/*/GET/hello`
      -  Review the policy:
         -  Name: ExecuteAPI
-  Modify invocation credentials
   -  Invoke with caller credentials: `false`
   -  Deploy API
-  Test in Postman
   -  Authorization:
      -  AWS Signature
         -  Provide correct AccessKey, SecretKey and Region
   -  GET `https://059fs536ub.execute-api.eu-north-1.amazonaws.com/Prod/hello`

#####  111. Creating Lambda Authorizers for API Gateway Access Control

Generate JWT token
-  use [JWT.io](https://jwt.io/)
```json
{
    "sub": "user1",
    "name": "Art Shyshkin",
    "iat": 1516239022,
    "data": "My custom data"
}
```
-  jwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsIm5hbWUiOiJBcnQgU2h5c2hraW4iLCJpYXQiOjE1MTYyMzkwMjIsImRhdGEiOiJNeSBjdXN0b20gZGF0YSJ9.hAQ9JZGH2dxRPIL9W2th1UJMhNKZa4mZd7fLYUFQK-w`
-  install `jwt-decode`
   -  `npm install jwt-decode --save`

#####  115. Creating AWS Cognito User Pools for API Gateway Authorization

-  Cognito console ->
   -  Manage User Pools -> Create a user pool
   -  Pool name: `riyaz-demo-pool`
   -  Step through settings:
   -  Just username
   -  Which standard attributes do you want to require -> uncheck `email`
   -  What password strength: 8, lowercase letters
   -  No MFA, no email or phone verification
   -  App client
      -  Add app client
      -  Name: `Riyaz Demo Client`
      -  Generate client secret: **no**
      -  ALLOW_ADMIN_USER_PASSWORD_AUTH: false
      -  ALLOW_CUSTOM_AUTH: false
      -  ALLOW_USER_PASSWORD_AUTH: true
      -  ALLOW_USER_SRP_AUTH: false
      -  ALLOW_REFRESH_TOKEN_AUTH: true

#####  116. Generating Auth Tokens with Cognito User Pools

-  [sign-up](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cognito-idp/sign-up.html)
   -  `aws cognito-idp sign-up --client-id <value> --username <value> --password <value>`
   -  secret: `1234art1234`
```json
{                                                                                                                                                                                      
    "UserConfirmed": false,
    "UserSub": "92515850-479f-4615-9473-69aae8326a5d"
}
```
-  [admin-confirm-sign-up](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cognito-idp/admin-confirm-sign-up.html)
   -  `aws cognito-idp admin-confirm-sign-up --user-pool-id <value> --username <value>`
   -  ok
-  [admin-initiate-auth](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cognito-idp/admin-initiate-auth.html)
   -  `aws cognito-idp admin-initiate-auth --user-pool-id <value> --client-id <value> --auth-flow <value>`
   -  `aws cognito-idp admin-initiate-auth --user-pool-id <value> --client-id <value> --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=<value>,PASSWORD=<password>`
   -  **Error** I did not allowed  `ALLOW_ADMIN_USER_PASSWORD_AUTH`
-  [initiate-auth](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cognito-idp/initiate-auth.html)      
   -  `aws cognito-idp initiate-auth --client-id <value> --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=<value>,PASSWORD=<password>`
```json
{
    "ChallengeParameters": {},
    "AuthenticationResult": {
        "AccessToken": "eyJra...UyzJrS6wZA",
        "ExpiresIn": 3600,
        "TokenType": "Bearer",
        "RefreshToken": "ey...U6g",                                                                  
        "IdToken": "eyJra...gl9vw"                                                                                                
    }                                                                                                                                                                                  
}   
```
-  `aws cognito-idp initiate-auth --generate-cli-skeleton`
   -  copy output and paste into [init-auth-skeleton.json](Section5-DeepDive/control-access-cognito-authorizer/init-auth-skeleton.json)
-  `aws cognito-idp initiate-auth --cli-input-json file://init-auth-skeleton.json >> res.json`

####  Section 6: Serverless Deep Dive - AWS Step Functions

#####  120. Creating your first State Machine using Amazon States Language (ASL)

Step functions console:
-  Create State Machine
-  Write you workflow in code
```json
{
  "Comment": "A Hello World example of the Amazon States Language using Pass states",
  "StartAt": "Hello",
  "States": {
    "Hello": {
      "Type": "Pass",
      "Result": "Hello",
      "Next": "World"
    },
    "World": {
      "Type": "Pass",
      "Result": "World",
      "End": true
    }
  }
}
```
-  State machine name: `HelloWorldStateMachine`
-  Permissions: Create new role
-  Create
-  Start execution
   -  Name: uuid by aws (can be changed)
   -  Input
```json
{
    "message": "This is my first state machine"
}
```
-  Start execution

#####  121 Wait State in Step Functions

Waiting for
-  my 13:08
-  UTC 11:08   
-  "2022-01-23T13:08:00+02:00"

####  11 State Machine Experiments

#####  11.7 Standard vs Express Comparison

1.  Standard
   -  Price: 25$ per 1M transitions
   -  my StateMachine has 10 transitions
   -  1 M executions * 10 trans/exec = 10M transitions
   -  total 250$
2.  Express
   -  Price:
      -  1$ per 1M executions
      -  0.00001667$ per GB*s
   -  1M executions:
      -  1$ (requests)
      -  64MB*2.75s(~took 1 execution)*1M(executions)*0.00001667$/1024 (MB in GB) = 2.865$
   -  total 3.87$


####  Section 8: Accelerating Development with the Serverless Framework

#####  161. Creating Your First Serverless Application with the Serverless Framework

-  `sls create -t aws-nodejs -p hello-serverless`

#####  162. Testing the Lambda Functions Locally with the Serverless Framework

-  `sls invoke local -f hello`
-  `serverless invoke local -f hello -d '{\"key\":\"value\"}'` (PowerShell)
-  **or**
-  `sls invoke local -f hello -d {\"key\":\"value\"}` (CMD)

#####  163. Deploying with the Serverless Framework

1.  Deploy entire stack
   -  `sls deploy`
   -  `sls deploy --verbose`
   -  too long
2.  Deploy only function
   -  `sls deploy function -f hello`

#####  164. Removing a Deployed Stack using the Serverless Framework

1.  Remove stack
   -  `sls remove`
2.  Override parameters (i.e. stage)
   -  `sls deploy --stage prod`

#####  168. VPC Configuration for Lambda Functions using the Serverless Framework

VPC console
-  Security Groups
-  Default: `sg-24aebf45`
-  Subnets: copy 2 of 3 subnets
-  Deploy **entire stack**
-  View Lambda Role
   -  Attached policy: AWSLambdaVPCAccessExecutionRole

#####  169. Serverless Plugins – Running API Gateway Locally using the Serverless Framework

-  `npm init`
-  `npm install --save-dev serverless-offline`
-  `sls offline`

#####  170. Accessing CloudWatch Logs using the Serverless Framework

-  `sls logs -f addFunction -s dev`
-  `sls logs -f addFunction` (with default stage)
-  `sls logs -f addFunction --startTime 5m` (last 5 minutes ~~deprecated~~)
-  `sls logs -f addFunction --tail`

####  Section 9: Automating Serverless Deployment with AWS CI/CD Tools

#####  174. Using AWS CodeCommit for Source Control

Create new project `sls-cicd` outside this Git repo to prevent possible conflicts with GitHub origin 

#####  175. Setting up a Local Git Repository

-  `git init`
-  add `.gitignore`
-  `git status`
-  `git checkout -b dev` - create new branch dev
-  `git status` - on branch dev
-  `git add .` - add to commit all the files from current folder 
-  `git commit -am "first commit"`
-  `git checkout -b master` - create new branch master

#####  176. Using AWS CodeCommit for Source Control

1.  Create Repository
   -  CodeCommit Console
   -  Create Repository
      -  Name: `sls-cicd-repo`
      -  Description: `Serverless CI/CD Demo Repository`
2.  Create User
   -  IAM Console
   -  Users -> Add User
      -  Name: `git-service-user`
      -  Access type: `Access key - Programmatic access`
      -  Permissions -> Attach directly -> `AWSCodeCommitFullAccess`
      -  Create user
      -  **NO NEED TO SAVE ACCESS KEYS**
      -  Close
3.  HTTPS Git credentials for AWS CodeCommit
   -  IAM Console -> Users -> git-service-user
   -  Security credentials
      -  HTTPS Git credentials for AWS CodeCommit
      -  Generate credentials -> Download
4.  Get Repository URL
   -  CodeCommit Console
   -  `sls-cicd-repo`
5.  Add origin repo      
   -  `git remote add origin https://git-codecommit.eu-north-1.amazonaws.com/v1/repos/sls-cicd-repo`
6.  Switch to dev branch
   -  `git checkout dev`
7.  Push local branch dev to origin
   -  `git push --set-upstream origin dev`
   -  provide credentials (I was not asked because previously had creds for art_admin user)
8.  Push master branch
   -  `git checkout master`
   -  `git status`
   -  `git push --set-upstream origin master`

#####  177. Merging Git Branches and Pushing Updates to CodeCommit

1.  Switch to dev branch
   -  `git checkout dev`
2.  Modify code
3.  Commit changes
   -  `git commit -am "v2"`
4.  Merge master with dev
   -  `git checkout master`
   -  `git merge dev`
5.  Push master branch to CodeCommit
   -  `git push`
6.  Push dev branch to CodeCommit
   -  `git checkout dev`
   -  `git push`
7.  Change default branch to master
   -  CodeCommit console -> Settings -> Default branch -> master -> Save 

#####  178. Using AWS CodeBuild for Continuous Integration of Serverless Projects

1.  Create Role for CodeBuild
   -  IAM console -> Role -> Create
   -  AWS Service -> Code Build -> AdministratorAccess
   -  Role name: CodeBuild_Serverless_Admin
2.  Create CodeBuild project 
   -  CodeBuild Console -> create project
   -  Project name: `sls-cicd`
   -  Source provider: AWS CodeCommit
   -  Repository: `sls-cicd-repo`
   -  Branch: master
   -  Environment image: Managed image      
   -  Operating System: Amazon Linux 2
   -  Runtime: Standard
   -  Use a buildspec file: buildspec.yml
   -  Service Role: CodeBuild_Serverless_Admin
   -  Additional configuration: 
      -  Environment variables:
      -  ENV_NAME: dev
   -  Save

#####  181. AWS CodeBuild in Action

-  CodeBuild console
   -  Build project -> sls-cicd
   -  Start build

#####  182. Using AWS CodePipeline for Continuous Delivery of Serverless Projects

-  CodePipeline console
   -  Create pipeline
   -  Name: `sls-cicd-pipeline`
   -  Source provider: AWS CodeCommit
   -  Repository: `sls-cicd-repo`
   -  Branch: master
   -  Build provider: AWS CodeBuild
   -  Project name: `sls-cicd`
   -  Skip deploy stage
   -  Create pipeline
-  Modify source code
   -  Commit
   -  Push to master

#####  183. Adding Manual Approval before Production Deployment with AWS CodePipeline

1.  Add manual approval
   -  CodePipeline console
   -  `sls-cicd-pipeline` -> Edit
   -  after `Build` add stage
      -  Name: `ApproveForProduction`
   -  Add Action group
      -  Action name: `MyApprove`
      -  Action provider: Manual approval
      -  SNS topic ARN - optional
         -  Create new SNS topic
         -  Name: `sls-cicd-approval`
         -  Create subscription
            -  Protocol: Email
            -  Endpoint: <my email>
         -  Visit Email -> Confirm subscription
      -  URL for review
         -  for example `https://53fdsmnq7i.execute-api.eu-north-1.amazonaws.com/dev/message`
      -  Comments:
         -  Kindly review and approve
2.  Add production build
   -  Add stage: `ProdBuild`
      -  Add Action group: `CodeBuildProd` 
         -  Action provider: CodeBuild
         -  Project name: create new project
            -  `sls-cicd-prod`
            -  Operating system: Amazon Linux 2
            -  Runtime: Standard
            -  Role: `CodeBuild_Serverless_Admin`   
            -  Timeout: 5 minutes
            -  Environment Variables:
               -  ENV_NAME: prod
            -  Continue to CodePipeline
         -  Input artifact: SourceArtifact
   -  Save









