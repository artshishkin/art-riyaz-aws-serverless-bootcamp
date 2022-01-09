const moment = require('moment');

const greeting = {
    "en": "Hello",
    "fr": "Bonjour",
    "hi": "Namaste",
    "es": "Hola",
    "pt": "Olá",
    "ur": "Assalamo aleikum",
    "it": "Ciao",
    "de": "Hallo"
}

exports.handler = async (event) => {
    const name = event.pathParameters.name;
    const {lang, ...info} = event.queryStringParameters || {};

    const message = `${greeting[lang] ? greeting[lang] : greeting["en"]}! ${name}`;
    const response = {
        message: message,
        info: info,
        timestamp: moment().unix()
    };

    return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(response)
    };
}
