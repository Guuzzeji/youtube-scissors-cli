const { getVideoLength } = require('./info');

async function createVideoTimes(url, list) {
    let videos = [];
    let totalVideo_length = await getVideoLength(url);

    //Creates start and end time for each video
    for (let x = 0; x < list.length; x++) {
        let end = totalVideo_length;
        if (list[x + 1] != undefined) {
            end = list[x + 1].start_time;
        }

        videos.push({
            title: list[x].title,
            value: {
                title: list[x].title,
                start_time: list[x].start_time,
                end_time: end
            }
        });
    }

    return videos;
};

//! Note: There a bug with any video that is +10 hours longs, so video length should be less then 9 hours
async function createTimeStamps(url, text) {
    let lines = (text + "\n").split("\n").map(item => item.trim());
    let timeStamps = []; //list of timestamps

    for (let i = 0; i < lines.length; i++) {
        //Look for time symbol and numbers
        if (lines[i].search(":") != -1 && lines[i].match(/\d+/)) {

            //Grabs what it thinks it is timestamp and cleans it
            let time_code = lines[i].replace(/[^0-9:]/, "");
            time_code = time_code.replaceAll(/[a-zA-Z()'"]/g, "").trim();

            //remove if ":" is on first number 
            if (time_code[0] == ":") {
                time_code = time_code.replace(":", "").trim();
            }

            //checks if it is a timestamp
            if (time_code[time_code.search(":")] != undefined && time_code[(time_code.search(":") - 1)] != undefined) {

                //Check for hours
                if (time_code[(time_code.search(":") + 3)] == ":" && time_code[(time_code.search(":") + 4)] != undefined) {
                    time_code = time_code.slice(0, time_code.search(":") + 6);
                    time_code = time_code.slice((time_code.search(":") - 1), time_code.length);

                    //Check for time > 10 min
                } else if ((time_code[(time_code.search(":") - 2)]) != undefined) {
                    time_code = time_code.slice(0, time_code.search(":") + 3);
                    time_code = time_code.slice((time_code.search(":") - 2), time_code.length);

                    //Check for time < 10 min
                } else {
                    time_code = time_code.slice(0, time_code.search(":") + 3);
                    time_code = time_code.slice((time_code.search(":") - 1), time_code.length);

                }

                //Export to json
                if (/[0-9]/.test(time_code)) {
                    let replace_timecode = time_code.replaceAll(":", "").trim();

                    let json = {
                        title: lines[i].replaceAll(/[:;~`_+=#%&{}<>*?$!'",]/g, "").replaceAll(replace_timecode, "").trim(),
                        start_time: time_code.trim()
                    };
                    timeStamps.push(json);
                }

            }
        }
    }

    let listVideo = await createVideoTimes(url, timeStamps);
    return listVideo;
};

module.exports.createVideoTimes = createVideoTimes;
module.exports.createTimeStamps = createTimeStamps;
