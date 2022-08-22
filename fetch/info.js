const ytdl = require('ytdl-core');
const ytcm = require("@freetube/yt-comment-scraper");

module.exports.getChapters = async function (url) {
    let id = ytdl.getURLVideoID(url);
    return await ytdl.getInfo(id).then(function (info) {
        return info.videoDetails.chapters;
    });
};

module.exports.getDescription = async function (url) {
    let id = ytdl.getURLVideoID(url);
    return await ytdl.getInfo(id).then(function (info) {
        return info.videoDetails.description;
    });
};

module.exports.getComment = async function (url) {
    let id = url.replace("https://www.youtube.com/watch?v=", "");
    return await ytcm.getComments({ videoId: id }).then((data) => {
        return data.comments[0].text.replaceAll("<br>", "\n");
    });
};

module.exports.getVideoLength = async function (url) {
    let id = ytdl.getURLVideoID(url);
    return await ytdl.getInfo(id).then(function (info) {
        return info.videoDetails.lengthSeconds;
    });
};

module.exports.basicInfo = async function (url) {
    let id = ytdl.getURLVideoID(url);
    return await ytdl.getInfo(id).then(function (info) {
        return info.videoDetails;
    });
};
