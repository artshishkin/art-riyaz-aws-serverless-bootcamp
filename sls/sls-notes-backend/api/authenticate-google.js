/*
 * Route: GET /auth
 */
'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});

const jwtDecode = require('jwt-decode');
const util = require('./util');

const cognitoIdentity = new AWS.CognitoIdentity();
const cognitoIdentityPoolId = process.env.COGNITO_IDENTITY_POOL_ID;

exports.handler = async (event) => {

    try {

        let idToken = util.getIdToken(event.headers);

        let data = await cognitoIdentity.getId({
            IdentityPoolId: cognitoIdentityPoolId,
            Logins: {
                'accounts.google.com': idToken
            }
        }).promise();

        let temporarilyAwsCredentials = await cognitoIdentity.getCredentialsForIdentity({
            IdentityId: data.IdentityId,
            Logins: {
                'accounts.google.com': idToken
            }
        }).promise();

        let decoded = jwtDecode(idToken);
        temporarilyAwsCredentials.user_name = decoded.name;

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
        };

    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(
                {
                    error: err.name ? err.name : "Exception",
                    message: err.message ? err.message : "Unknown error"
                }
            )
        };
    }
};

