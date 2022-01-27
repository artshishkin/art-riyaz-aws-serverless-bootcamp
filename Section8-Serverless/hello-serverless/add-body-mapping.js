'use strict';

module.exports.handler = async (event) => {

    let {number1, number2} = event;

    return number1 + number2;
};
