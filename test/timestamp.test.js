const genTimeStamp = require('../fetch/index');
const testData = require('./test-data.json');

/**
 * ! Testing for timestamps generate function
 * - Test all 3 types comments, description, and chapters
 * - Add testing data comes from test-data.json
 * * Note: This these testing can be upscale to work with other videos, 
 * *    you just need to add more videos to the data base
 */
function main() {
    // Testing comments
    for (let i = 0; i < testData.comments.length; i++) {
        test("Testing Video: (Comments) " + testData.comments[i].url, async function () {
            const data = await genTimeStamp({ url: testData.comments[i].url, type: "comment" });
            expect(JSON.stringify(data)).toBe(JSON.stringify(testData.comments[i].result));
        });
    }

    // Testing description
    for (let i = 0; i < testData.description.length; i++) {
        test("Testing Video: (Description) " + testData.description[i].url, async function () {
            const data = await genTimeStamp({ url: testData.description[i].url, type: "description" });
            expect(JSON.stringify(data)).toBe(JSON.stringify(testData.description[i].result));
        });
    }

    // Testing chapter
    for (let i = 0; i < testData.chapter.length; i++) {
        test("Testing Video: (Chapters) " + testData.chapter[i].url, async function () {
            const data = await genTimeStamp({ url: testData.chapter[i].url, type: "chapters" });
            expect(JSON.stringify(data)).toBe(JSON.stringify(testData.chapter[i].result));
        });
    }
}

main();