const getTimeStamp = require('../fetch/index');
let testDataJSON = require('./test-data.json');
const fs = require('fs');

/**
 * Used to create test data for different youtube videos 
 * All test data is stored in test-data.json
 */
async function main({ url, type }) {

    let data = await getTimeStamp({
        url: url,
        type: type
    });

    if (type == "comment") {
        testDataJSON.comments[0].result = data;

    } else if (type == "description") {
        testDataJSON.description[0].result = data;

    } else if (type == "chapters") {
        testDataJSON.chapter[0].result = data;
    }

    let stringJson = JSON.stringify(testData);
    fs.writeFileSync("./test-data.json", stringJson);
}

main();