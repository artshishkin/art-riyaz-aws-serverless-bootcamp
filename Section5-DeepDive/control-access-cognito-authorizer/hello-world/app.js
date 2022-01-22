let response;

exports.lambdaHandler = async (event, context) => {

    // console.log(JSON.stringify(event));
    // console.log(JSON.stringify(context));

    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello ' + event.requestContext.authorizer.claims['cognito:username']
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
