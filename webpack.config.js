const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const outputDir = path.resolve(__dirname, "dist");

const appConfig = {
    mode: "production",
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: outputDir,
        filename: "[name].js"
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [path.resolve(__dirname, "index.html")] }),
    ],
};

const workerWASMConfig = {
    mode: "production",
    entry: './src/workers/worker_wasm.js',
    target: 'webworker',
    output: {
        path: outputDir,
        filename: "worker_wasm.js"
    },
    experiments: {
        asyncWebAssembly: true,
    },
}

const workerESConfig = {
    mode: "production",
    entry: './src/workers/worker_es.js',
    target: 'webworker',
    output: {
        path: outputDir,
        filename: "worker_es.js"
    }
}

module.exports = [appConfig, workerWASMConfig, workerESConfig];
