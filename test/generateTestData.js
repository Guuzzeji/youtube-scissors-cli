const getTimeStamp = require('../fetch/index');
let testDataJSON = require('./test-data.json');
const fs = require('fs');

/**
 * ! How to use
 * (1) Add your url to the json file like the other videos
 * (2) Note where you put that url and what position it is in the array
 * (3) Copy the url to the main function and specify how you 
 *      want to extract the time stamp, as well as what position it is in the array
 * (4) Then run the js file
 */

/**
 * ! IMPORTANT: Never change test data after modifying 
 * !    fetch files. Only add or change test data 
 * !    on a stable version of YouTube-Scissors-CLI
 * 
 * - Used to create test data for different youtube videos 
 * - All test data is stored in test-data.json
 */
async function main({ url, type, pos }) {

    let data = await getTimeStamp({
        url: url,
        type: type
    });

    if (type == "comment") {
        testDataJSON.comments[pos].result = data;

    } else if (type == "description") {
        testDataJSON.description[pos].result = data;

    } else if (type == "chapters") {
        testDataJSON.chapter[pos].result = data;
    }

    let stringJson = JSON.stringify(testData);
    fs.writeFileSync("./test-data.json", stringJson);
}

// Added your url and extraction type here
main({
    url: "",
    type: "",
    pos: 0
});