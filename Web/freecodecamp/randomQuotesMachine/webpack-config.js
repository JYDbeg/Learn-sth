module.exports = {
    devtool: 'source-map',
    entry: 'index.jsx', 
    output: {
        filename: 'bundle.js' // 出力するファイル
    },
    mode: "development",
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            }
        ]
    }
}