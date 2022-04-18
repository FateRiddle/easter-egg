const fs = require("fs");
const os = require("os");
const path = require("path");
const pkg = require("./package.json");
const root = path.join(os.homedir(), ".clam");
const linkPath = path.join(root, "link.json");
const linkJSON = fs.existsSync(linkPath) ? require(linkPath) : {};
const builderName = pkg.toolkit.replace("clam-toolkit", "builder-clam");
const builderDirLocal = path.join(process.cwd(), "node_modules", builderName); // 本地
const builderDirClam = path.join(root, pkg.toolkit, "package", "node_modules", builderName); // 全局
const builderDirLink = (linkJSON[pkg.toolkit] || "").replace("clam-toolkit", "builder-clam"); // 调试
const eslintWebpackConfig = path.join(process.env.BUILD_BUILDER_DIR || builderDirLink || builderDirClam || builderDirLocal, "lib/webpack/eslint.js");

module.exports = require(eslintWebpackConfig);