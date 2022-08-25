//! Tools
const cutVideo = require('./ffmpeg-control/index');
const getTimeStampList = require('./fetch/index');
const cleanFiles = require('./ffmpeg-control/checkFiles').cleanFiles;

//! Utilities
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const process = require('process');

//! Config
const Config = require(path.resolve("config.json"));

//! Cli UI
const chalk = require('chalk');
const figlet = require('figlet');
const prompts = require('prompts');
const { Signale } = require('signale');
const signale = new Signale({
    logLevel: 'info',
    types: {
        Fetching: {
            badge: '📥',
            color: 'yellow',
            label: 'Fetching',
            logLevel: 'info'
        },
        Loading: {
            badge: '⌛',
            color: 'yellow',
            label: 'Loading',
            logLevel: 'info'
        }
    }
});

//*Quit program on ctrl+c only for prompts
const onCancel = function (prompt) {
    signale.warn("Force Quit");
    cleanFiles();
    process.exit();
};


//! -- CLI START --
function CLIlogo() {
    return new Promise((resolve, reject) => {
        figlet('YouTube-Scissors CLI', {
            font: "Ogre",
            horizontalLayout: "fitted",
        }, function (err, data) {
            if (err) {
                reject(err);
            }

            console.log(chalk.redBright.bold(data));
            console.log(chalk.bold("Created by @Guuzzeji <gabe.business.code@outlook.com> (https://github.com/Guuzzeji) \n"));
            resolve(0);
        });
    });
}


async function videoProcessing({ save_path, video_path, chapters }) {

    //FFmpeg cuting videos
    signale.Loading("Cutting out videos...");

    let edit_video_list = await cutVideo({
        video: path.resolve(video_path),
        ffmpegPath: path.resolve(Config.ffmpeg_path),
        ffmpegOptions: {
            ffmpegHide: Config.hide_ffmpeg,
        },
        chapters: chapters
    });

    // Saving videos
    for (let x = 0; x < edit_video_list.length; x++) {
        try {
            let title_video = edit_video_list[x].title + ".mp4";
            fs.writeFileSync(path.resolve(path.join(save_path, title_video)), edit_video_list[x].videoData);
        } catch (error) {
            signale.fatal("Could not save video!");
            signale.debug(error);
            process.exit();
        }
    }

    // On Exit
    signale.success(`Saved videos to "${path.resolve(save_path)}"`);
    cleanFiles();
    process.exit();
}

//! Main
(async () => {
    if (Config.hide_logo == false) {
        await CLIlogo();
    }

    //* Init user data
    const user_input = await prompts([
        //Video URL
        {
            type: 'text',
            name: 'url',
            message: 'YouTube video URL?',
        },

        //Get data from
        {
            type: 'select',
            name: 'collect_from',
            message: `How do you want to extract video time stamps?`,
            choices: [
                { title: 'chapters', value: 'chapters' },
                { title: 'comment', value: 'comment' },
                { title: 'description', value: 'description' }
            ],
        },

        //Download the video
        {
            type: 'confirm',
            name: 'download_video',
            message: 'Do you want to download video?',
        },

        //If no download load video from path
        {
            type: function (prev) {
                if (prev == false) {
                    return "text";
                }
                return null;
            },
            name: 'video_path',
            message: 'File path to already downloaded video?'
        },

        //Save path
        {
            type: 'text',
            name: 'save_path',
            message: 'Where do you want to save the videos?',
        }
    ], { onCancel });


    //* Time Stamp
    signale.Fetching("Video data...");
    let timestamps = await getTimeStampList({ url: user_input.url, type: user_input.collect_from });
    const user_timeStamps = await prompts({
        type: 'multiselect',
        name: 'chapters',
        message: 'What videos do you want?',
        choices: timestamps,
    }, { onCancel });


    //* Downloading and Cutting Video
    if (user_input.download_video == true) {
        signale.Fetching("Downloading video...");

        let dl_stream = ytdl(user_input.url);
        dl_stream.pipe(fs.createWriteStream("./tmp/input.mp4"));

        let total_chunk = 0;
        dl_stream.on("data", function (chunk) {
            if (Config.hide_yt_download == false) {
                total_chunk += chunk.length;
                signale.debug("[Dowload-Video-Info] Download Current Size =", total_chunk, "[bytes]", "| Chunk Size =", chunk.length, "[bytes]", "|");
            }
        });

        dl_stream.on("end", async function () {
            signale.complete("Video Done Downloading");
            await videoProcessing({
                video_path: "./tmp/input.mp4",
                chapters: user_timeStamps.chapters,
                save_path: user_input.save_path
            });
        });

    } else {
        await videoProcessing({
            video_path: user_input.video_path,
            chapters: user_timeStamps.chapters,
            save_path: user_input.save_path
        });
    }
})();

