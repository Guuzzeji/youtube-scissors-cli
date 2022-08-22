const fs = require('fs');
const path = require('path');

//! Remove work files and checks/creates work folder if needed
module.exports.checkFiles = function () {
    if (fs.existsSync(path.resolve("./tmp/output.mp4"))) {
        fs.unlinkSync(path.resolve("./tmp/output.mp4"), { recursive: true });
    }

    if (fs.existsSync(path.resolve("./tmp/input.mp4"))) {
        fs.unlinkSync(path.resolve("./tmp/input.mp4"), { recursive: true });
    }

    if (!fs.existsSync(path.resolve("./tmp"))) {
        fs.mkdirSync(path.resolve("./tmp"), { recursive: true });
    }
};

module.exports.cleanFiles = function () {
    if (fs.existsSync(path.resolve("./tmp"))) {
        fs.rmSync(path.resolve("./tmp"), { recursive: true, force: true });
    }
};