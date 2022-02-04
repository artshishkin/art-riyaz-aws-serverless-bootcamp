const getUserId = (headers) => {
    return headers.app_user_id;
}

const getUserName = (headers) => {
    console.log(headers.app_user_name);
    let decoded = Buffer.from(headers.app_user_name, 'base64').toString('utf-8');
    console.log(decoded);
    return decoded;
}

const getIdToken = (headers) => {
    return headers.Authorization.replace("Bearer ", "").trim();
}

const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    }
};

module.exports = {
    getUserId,
    getUserName,
    getIdToken,
    getResponseHeaders
}