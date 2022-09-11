const lodash = require('lodash');

exports.handler = async function (event) {
    console.log("request:", JSON.stringify(event, undefined, 2));
    console.log("found lodash version: " + lodash.VERSION);
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello, CDK! You've hit ${event.path}\n`
    };
};