<p align="center">
    <img src="./assets/logo-upscale.jpeg" height="35%">
</p>

<h1 align="center">YouTube-Scissors CLI</h1>

<p align="center">
    <img alt="GitHub" src="https://img.shields.io/github/license/Guuzzeji/youtube-scissors-cli">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/Guuzzeji/youtube-scissors-cli">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/downloads/Guuzzeji/youtube-scissors-cli/latest/total">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Guuzzeji/youtube-scissors-cli">
</p>

<p align="center">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Guuzzeji/youtube-scissors-cli?style=social">
    <a href="https://twitter.com/intent/tweet?url=https://github.com/Guuzzeji/youtube-scissors-cli&hashtags=youtube,github,cli,ffmpeg,programming">
        <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FGuuzzeji%2Fyoutube-scissors-cli%2F">
    </a>
</p>

A simple CLI app that allows you to divide a YouTube video into multiple separate videos base on a video's time stamps. This project is built on top of another one of my projects, [yt-scissors](https://github.com/Guuzzeji/yt-scissors). 


## 💡 Features
- Can generate multiple videos or extract a single video, based on a YouTube video's time stamps (time stamps from a comment, video description, or chapters)
  - **Important:** Generated time stamps from the description and comments works about 85% of the time. Make sure the video's time stamps are spaced out and have nothing that would make it hard to find them. There is also a bug with any video that is +10 hours long, so video length should be below 10 hours.
  
  - **Note:** Make sure the description or comment has a full time stamp list for the best results.

- Can download videos directly from CLI
  - **Note:** Downloading is slow compare to other YouTube download methods.
  
  - If you need good download speeds try [pytube](https://github.com/pytube/pytube) or [yt-dlp](https://github.com/yt-dlp/yt-dlp). You can still use this program with other YouTube download methods.

- Can process already downloaded YouTube videos
  
- Simple CLI structure
  
- 100% Open Source (MIT license)


## 📂 How to Download & Install

1. Download it [here](https://github.com/Guuzzeji/youtube-scissors-cli/releases) or go to the release tab of this repository.

2. Once you downloaded the YouTube-Scissors-CLI executable, download ffmpeg. [FFmpeg Downloads](https://ffmpeg.org/download.html)
   
3. After downloading ffmpeg, open up the config.json file and paste the path to where you have saved the ffmpeg executable. Make sure you put config.json in the same directory as your YouTube-Scissors executable. 

4. Edit config.json to your liking. 

**Example of How config.json is Setup**
```js
{
    "ffmpeg_path": "Your ffmpeg executable path goes here",
    "hide_ffmpeg": true, // hides ffmpeg logs
    "hide_yt_download": true, // hides download logs
    "hide_logo": false // hides youtube-scissors banner on startup
}
```

## 🕹️ Usage 

1. Find a YouTube video that you want to extract videos from
   - Make sure the YouTube video has either chapters or time stamps in the description or comments section
  
   - **Note:** For comments, follow this [tutorial](https://www.youtube.com/watch?v=PnmfkLiMLHs) to figure out how to get a YouTube comment's URL.

   - **Tip:** Make sure the description or comment has a full time stamp list for the best results.

2. Run YouTube-Scissors CLI and paste the YouTube video's URL or the YouTube comment's URL

3. Then enter in what you want for each prompt
   - **Important:** When extracting multiple videos, YouTube-scissors will NOT create a folder for all the videos to be saved in. You must create an empty folder beforehand and save all the videos there.
   
## 🎥 Video Demo
<p align="center">
    <a href="https://www.youtube.com/watch?v=AN4oikwEpWw"><img src="https://img.youtube.com/vi/AN4oikwEpWw/maxresdefault.jpg"><a>
</p>

## 📷 Screenshots
<p align="center">
    <img src="./assets/screenshot.png" height="35%">
</p>

## 🛠️ Developer Instructuions (Build From Source)

> Most users do not need to build from source. You can download the builds from [here](https://github.com/Guuzzeji/youtube-scissors-cli/releases). 

> If you are looking for an API / wrapper library for this CLI app, look [here](https://github.com/Guuzzeji/yt-scissors).

### What you will need
- Download a copy of [ffmpeg](https://ffmpeg.org/download.html)
- Have [Node.js](https://nodejs.org/en/) installed on your system
- (Optional) Have [git](https://git-scm.com/downloads) installed on your system

---

### How To Build From Source

**(Step 1) Download the source code and cd into it**

```console
git clone https://github.com/Guuzzeji/youtube-scissors-cli.git
cd youtube-scissors-cli
```

**(Step 2) Install pkg ([Learn more about pkg](https://github.com/vercel/pkg))**

```console
npm install -g pkg
```

**(Step 3) Then run npm install to install all needed dependencies**

```console
npm install
```

**(Step 4) Build using npm**

```console
npm run build
```

**(Step 5) Setting up config.json**

```console
cd build
```
- cd into the build directory and copy the config.json file into it. Make sure you edit the config.json file to your liking and type in the path to your ffmpeg executable.


## 🫶 How to Contribute

- Fork the main branch

- Open your fork and add your changes / features

- (Optional but important) run `npm test` if you made any changes to fetch folder or fetch files. Doing this to make sure everything is working properly when grabbing data and parsing it from YouTube

- Test and make sure your changes can still create a functional executable file. (check build guide above)
  
- Create a pull request here
  - Make sure to add a description of what changes you have made and why your changes are important.
  
  -  Add me (@Guuzzeji) to the pull request, add me as a reviewer. This notify me that you made a pull request and allow me to review the changes you made.

---

### Helpful Infomation

- [How to find a YouTube comment URL from a video](https://www.youtube.com/watch?v=PnmfkLiMLHs)

### License

MIT




