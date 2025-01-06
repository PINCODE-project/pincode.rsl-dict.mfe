const path = require("path");

const outputConfig = {
    destPath: "./dist",
};

const entryConfig = ["./src/index.tsx"];

const copyPluginPatterns = {
    patterns: [
        { from: "./public/logo192.png" },
        { from: "./public/logo512.png" },
        { from: "./public/manifest.json" },
        { from: "./public/favicon.ico" },
        { from: "./public/_redirects" },
        { from: "./public/google727cd092b123fe2a.html" },
        { from: "./public/sitemap.xml" },
        { from: "./public/robots.txt" },
        { from: "./src/assets" },
        // { from: "./src/assets/fonts", to: "fonts" },
        // { from: "./src/assets/vendor", to: "js" },
    ],
    // patterns: [
    //     {
    //         from: "./src/assets/images",
    //         to: "images",
    //     },
    // ],
};

const devServer = {
    static: {
        directory: path.join(__dirname, outputConfig.destPath),
    },
    // https: true,
    port: "5003",
    // host: "0.0.0.0",
    // disableHostCheck: true,
    historyApiFallback: true,
};

const scssConfig = {
    destFileName: "css/app.min.css",
};

const terserPluginConfig = {
    extractComments: false,
    terserOptions: {
        compress: {
            drop_console: true,
        },
    },
};

module.exports.copyPluginPatterns = copyPluginPatterns;
module.exports.entryConfig = entryConfig;
module.exports.scssConfig = scssConfig;
module.exports.devServer = devServer;
module.exports.terserPluginConfig = terserPluginConfig;
module.exports.outputConfig = outputConfig;
