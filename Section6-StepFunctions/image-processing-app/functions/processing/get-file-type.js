exports.handler = async (event) => {

    console.log(JSON.stringify(event));

    const input = event;

    const fileKey = input.Key;
    const split = fileKey.split('.');

    const fileType = split[split.length - 1];

    return fileType;
}
