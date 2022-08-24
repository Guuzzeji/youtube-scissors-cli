//* (NOTES) How to use ffmpeg
// - https://www.arj.no/2018/05/18/trimvideo/
// - https://shotstack.io/learn/use-ffmpeg-to-trim-video/
// - https://superuser.com/questions/685562/cutting-videos-with-ffmpeg-length-not-accurate
// - https://stackoverflow.com/questions/31765674/ffmpeg-not-cutting-as-expected
// - https://www.ffmpeg.org/ffmpeg.html

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const { Signale } = require('signale');
const signale = new Signale();


require("./checkFiles").checkFiles();

//* Generates videos from video input
module.exports.trimVideo = async function ({
    ffmpegPath,
    OGvideo,
    timeStamps,
    ffmpegOptions: {
        crf = "25",
        preset = "ultrafast",
        ffmpegCmds = undefined,
        ffmpegHide = false
    } }) {

    let SaveVideos = [];

    //Check original video is buffer or path
    let videoPath = OGvideo;
    if (Buffer.isBuffer(OGvideo)) {
        fs.writeFileSync(path.resolve("./tmp/input.mp4"), OGvideo);
        videoPath = path.resolve("./tmp/input.mp4");
    }

    //*Promise func for running ffmpeg command
    function runFFmpeg(start_time, end_time) {
        return new Promise(function (resolve, reject) {
            //* Testing cmds 
            // "-hide_banner", "-loglevel", "error",
            //"-c:v", "copy", "-c:a", "copy",
            //"-codec", "copy"
            let args = [
                "-i", path.resolve(videoPath),
                "-ss", start_time.toString(),
                "-to", end_time.toString(),
                "-crf", crf,
                "-preset", preset,
                "-c:a", "copy",
                path.resolve(path.join("tmp", "output.mp4"))
            ];

            //Add more onto args for ffmpeg
            if (ffmpegCmds != undefined) {
                args = args.concat(ffmpegCmds);
            }

            if (ffmpegHide == true) {
                args = args.concat(["-hide_banner", "-loglevel", "error"]);
            } else {
                signale.debug("[ffmpeg-input]", args.join(" "), "\n");
            }

            //! ======== Start ffmpeg ========
            let ffmpeg = spawn(path.resolve(ffmpegPath), args);

            //Log when end
            ffmpeg.stdout.on('data', function (data) {
                signale.debug("[ffmpeg-info]", data);
            });

            //Log while program is running
            ffmpeg.stderr.setEncoding("utf8");
            ffmpeg.stderr.on('data', function (data) {
                signale.debug("[ffmpeg-info]", data);
            });

            // return buffer of trim video
            ffmpeg.on('close', function () {
                let video = Uint8Array.from(fs.readFileSync(path.resolve("./tmp/output.mp4")));
                resolve(video);
                fs.unlinkSync(path.resolve("./tmp/output.mp4"));
            });

            // return error if happens
            ffmpeg.on('error', function (err) {
                reject(err);
            });
        });
    }


    //*Run ffmpeg, trim video / encodeds them
    for (let x = 0; x < timeStamps.length; x++) {
        let start_time = timeStamps[x].start_time; //Gets Times for chapters start time
        let end_time = timeStamps[x].end_time; //Get end time base on chapter infront

        let videoBuffer = await runFFmpeg(start_time, end_time).catch(function (err) {
            throw new Error(err);
        });

        SaveVideos.push({
            title: timeStamps[x].title,
            videoData: videoBuffer
        });
    }

    //Remove input file when done
    if (Buffer.isBuffer(OGvideo)) {
        fs.unlinkSync("./tmp/input.mp4");
    }

    //! Videos will be return as arrays with buffer inside
    return SaveVideos;
};
