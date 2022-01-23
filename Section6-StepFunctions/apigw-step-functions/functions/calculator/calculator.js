exports.handler = async (event) => {
    const operation = event.operation;
    const {operand1, operand2} = event.input;

    let result;
    switch (operation) {
        case "add":
            result = operand1 + operand2;
            break;
        case "subtract":
            result = operand1 - operand2;
            break;
        case "multiply":
            result = operand1 * operand2;
            break;
        case "divide":
            result = operand1 / operand2;
            break;
        default:
            throw new Error("Unsupported operation: " + operation);
    }

    return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(result)
    };
}
