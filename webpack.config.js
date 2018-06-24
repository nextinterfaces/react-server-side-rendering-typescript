
const path = require('path');

const BuildPlugin = require('./webpack/build.plugin');

const HTML_DIR = path.join(__dirname, 'nginx/html');
const DIST_DIR = path.join(HTML_DIR, 'static/dist');
const HTML_INPUT = path.join(HTML_DIR, 'index.template.html');
const HTML_OUTPUT = path.join(DIST_DIR, 'index.html');
const HASH_LENGTH = 8;
const SCRIPT_URL = '/static/dist/nx.contractor-{hash_js}.js';

module.exports = {
    entry: {
        'nx.contractor': './src/client/index.tsx'
    },
    output: {
        path: DIST_DIR,
        filename: '[name]-[hash:' + HASH_LENGTH + '].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', 'json', '.ts', '.tsx', '.scss']
    },
    devtool: "source-map",
    module: {
        loaders: [
            {test: /\.tsx?$/, loaders: ['awesome-typescript-loader'], include: path.join(__dirname, 'src')},
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
        ]
    },

    plugins: [
        new BuildPlugin({DIST_DIR, HTML_INPUT, HTML_OUTPUT, HASH_LENGTH, SCRIPT_URL})
    ],

    externals: {
        jquery: 'jQuery',
        jQuery: 'jQuery',
        moment: 'moment',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    watchOptions: {
        poll: 1000
    }
};
