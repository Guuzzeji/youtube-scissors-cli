const { getComment, getDescription, getChapters } = require('./info');
const { createTimeStamps, createVideoTimes } = require('./createTimeCode');


/**
 * ======About======
 * - Pick where to get video time codes and generate array from that.
 * - Note: Will return empty array if there is no time codes in chapters / description / comment in Youtube video
 * - Note: Generated time codes from description and comment works about 90% of the time. Make sure video time codes are spaced out and have nothing that would make it hard to find the time codes
 * 
 * @param {Object} obj - Options
 * @param {String} obj.url - URL of youtube video
 * @param {"chapters" | "comment" | "description"} obj.type - The data you want to parse to get video time codes 
 * 
 * @typedef {Object} ListVideo_Object - JSON of chapter video 
 * - obj.end_time = end time code
 * - obj.title = title of chapter 
 * - obj.start_time = start time code

 * @property {String|Number}  end_time - End time code of the chapter
 * @property {String}  title - Title of the chapter
 * @property {String|Number}  start_time - Start time code of the chapter
 * @returns {Promise<Array<ListVideo_Object>} Promise<ListVideo_Object[x]> Returns array of start and end time for each chapter video
 */
module.exports = async function ({ url, type = "chapters" }) {
    let info;

    if (type == "comment") {
        info = await getComment(url);
        return await createTimeStamps(url, info);

    } else if (type == "description") {
        info = await getDescription(url);
        return await createTimeStamps(url, info);

    } else if (type == "chapters") {
        info = await getChapters(url);
        return await createVideoTimes(url, info);

    } else {
        throw new Error("Did not define type, must be chapters | comment | description");
    }
};