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