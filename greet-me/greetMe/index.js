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
    const lang = event.queryStringParameters ? event.queryStringParameters['lang'] : null;

    const info = {...event.queryStringParameters};
    delete info.lang;

    const message = `${greeting[lang] ? greeting[lang] : greeting["en"]}! ${name}`;
    const response = {
        message: message,
        info: info,
        timestamp: moment().unix()
    };

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
}
