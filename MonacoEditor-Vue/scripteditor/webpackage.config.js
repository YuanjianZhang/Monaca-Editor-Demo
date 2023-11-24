const monacoWebpackPlugin = require("monaco-editor-webapck-plugin");

module.exports = {
    configureWebpack:{
        plugins:[new monacoWebpackPlugin()],
    }
};