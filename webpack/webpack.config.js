const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, '../dist'),
    SRC: path.resolve(__dirname, '../src'),
    PUB: path.resolve(__dirname, '../src/public')
};
// Webpack configuration
module.exports = (env) => {
    const config = {
        entry: [
            'babel-polyfill',
            path.join(paths.SRC, 'index.js')
        ],
        output: {
            path: paths.DIST,
            filename: 'app.bundle.js',
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['react', 'env', 'es2015', 'stage-0']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        use: 'css-loader',
                    }),
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '/images/[name].[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: '/fonts/[name].[hash].[ext]'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        // Dev server configuration -> ADDED IN THIS STEP
        // Now it uses our "src" folder as a starting point
        devServer: {
            contentBase: paths.SRC,
            historyApiFallback: true,
            compress: true,
            inline: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(paths.PUB, 'index.html'),
            }),
            new ExtractTextPlugin('style.bundle.css'),
            new CopyWebpackPlugin([
                    {from: './src/public/assets/img', to: 'img'},
                    {from: './src/public/assets/vendors', to: 'vendors'},
                    {from: './src/public/assets/js', to: 'js'},
                    {from: './nginx.conf', to: './'},
                ],
                {copyUnmodified: false}
            )
        ],
    }
    if (env === 'prod') {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `"production"`
            }
        }))
    }
    return config;
};