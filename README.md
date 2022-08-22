<p align="center">
    <img src="./assets/logo-upscale.jpeg" height="35%">
</p>

<h1 align="center">YouTube-Scissors CLI</h1>

A simple cli-app that allows you to divide a YouTube video into multiple separate videos base on a video's time stamps. 

Built on top of another one of my projects, https://github.com/Guuzzeji/yt-scissors

## 💡 Features
- Can generate either a whole folder of videos or extracte a single video from a YouTube video
- Can trim / cut a video base on a YouTube video's chapters, description, or comment on the video. 
  - **(Important)** Generated time codes from description and comment works about 85% of the time. Make sure video time codes are spaced out and have nothing that would make it hard to find the time codes. There is also a bug with any video that is +10 hours longs, so video length should be below 10 hours.
- Can download videos directly from CLI
  - **Note:** Downloading is slow compare to other YouTube download methods.
- Can edit already downloaded YouTube videos / Can work with other YouTube download programs
- Simple CLI interface
- 100% Open Source (under MIT license)

## 📂 How to Download & install

1. Download it [here]() or go to the release tab of this repository.

2. Once you downloaded the youtube-scissors-cli executable, download ffmpeg. FFmpeg Downloads: https://ffmpeg.org/download.html

3. After downloading ffmpeg, open up the config.json file and paste the path to where you have saved the ffmpeg executable. Additionally you can edit the config.json to your liking. 

**Example of where to put ffmpeg path**

```json
{
    "ffmpeg_path": "Your ffmpeg executable path goes here",
    "hide_ffmpeg": true, // hides ffmpeg logs
    "hide_yt_download": true, // hides download logs
    "hide_logo": false // hides youtube-scissors banner on startup
}
```

## 📷 Screenshot

<p align="center">
    <img src="./assets/screenshot.png" height="35%">
</p>

## 🛠️ Developer Instructuions (Build From Source)

> Most users do not need to build YouTube-Scissors CLI. You can download the builds from [here](https://github.com/Guuzzeji/yt-scissors).

> If you are looking for API / wrapper libary for this tool, look here: https://github.com/Guuzzeji/yt-scissors

### What you will need
- Download a copy of [ffmpeg](https://ffmpeg.org/download.html)
- Have [Node.js](https://nodejs.org/en/) install on your system
- (Optional) Have [git](https://git-scm.com/downloads) install on your system 

### How To Build From Source
    // (Step 1) Download the source code and cd into it
    git clone https://github.com/Guuzzeji/yt-scissors.git
    cd youtube-scissors-cli-main

    // (Step 2) Install pkg. Learn more about pkg: https://github.com/vercel/pkg
    npm install -g pkg

    // (Step 3) Then run npm install to install all needed dependencies
    npm install

    // (Step 4) build using npm
    npm run build

    // (Step 5) cd into the build directory and copy the "config.json" file into it. Make sure you edit the "config.json" file to your liking and type in the path to you ffmpeg executable.

## Helpful Infomation

How to find / get a YouTube comment url from a video : https://www.youtube.com/watch?v=PnmfkLiMLHs

### License

MIT




