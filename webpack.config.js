const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new htmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/front/resources/images/favicon.png',
});

module.exports = env => {
    const envVariables = new webpack.DefinePlugin({
        'process.env.ENVIRONMENT': JSON.stringify(`${env.ENVIRONMENT}`),
    });
    return {
        entry: './src/index.tsx',
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.png$/,
                    use: 'file-loader',
                },
                {
                    test: /\.otf$/,
                    use: 'url-loader',
                },
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            historyApiFallback: true,
        },
        plugins: [htmlPlugin, envVariables],
    };
};
