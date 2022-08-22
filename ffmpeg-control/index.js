const { trimVideo } = require('./editor');

/**
 * ======About======
 * - Using FFmpeg, trims videos into different chapters and encodes theme base on the time codes given.
 * - Can automatically download ffmpeg or manually install ffmpeg and pass the path of the executable file
 * - Return a array of videos with title and a buffer of the trim down video
 * - ( IMPORTANT ) No MacOS option for ffmpeg. You have to download and add it yourself 
 * 
 * @param {Object} obj - options
 * @param {String | Buffer} obj.video - Video path as a string or a buffer of the video
 * @param {String} obj.ffmpegPath - Path to ffmpeg executable. If none is given then will automatically download ffmpeg
 * @param {Boolean}  obj.DisableDownloadLogs - True = disable download logs, false = show download logs (default is false)
 * 
 * @param {ListVideo_Object[]}  obj.chapters - List of chapters you want to extract from original video get this from "getVideoList()" function
 * 
 * @param {Object} obj.ffmpegOptions - FFmpeg commands
 * @param {String}  obj.ffmpegOptions.crf - Quality of the video. Lower numbers the better looking the video (default is 25)
 * @param {String}  obj.ffmpegOptions.preset - Speed of encoding video (default is ultrafast)
 * @param {Array}  obj.ffmpegOptions.ffmpegCmds - Add any other ffmpeg commands as a array
 * @param {Boolean}  obj.ffmpegOptions.ffmpegHide - Hide ffmpeg process from being shown in the terminal (default is false)
 * 
 * @typedef {Object} SaveVideos_Object - JSON of chapter video 
 * - obj.title = title of chapter video 
 * - obj.videoData = buffer of chapter video
 * 
 * @property {String} title - The title of the chapter video 
 * @property {Buffer} videoData - A buffer of the chapter video
 * @returns {Promise<SaveVideos_Object[]>} Promise<SaveVideos_Object[x]> Returns array of videos. Videos are buffers (Promise)
 */
module.exports = async function ({
    video,
    ffmpegPath = undefined,
    chapters,
    ffmpegOptions = {
        crf: "25",
        preset: "ultrafast",
        ffmpegCmds: undefined,
        ffmpegHide: false
    } }) {

    return await trimVideo({
        ffmpegPath: ffmpegPath,
        OGvideo: video,
        timeStamps: chapters,
        ffmpegOptions: ffmpegOptions
    });
};