const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { outputConfig, copyPluginPatterns, scssConfig, entryConfig, terserPluginConfig } = require("./env.config");
const {NativeFederationTypeScriptHost} = require("@module-federation/native-federation-typescript/dist/webpack");
const {ModuleFederationPlugin} = require("webpack").container;

const deps = require("./package.json").dependencies;

const federationConfig = {
    name: "rsl_bootstrap",
    filename: "remoteEntry.js",
    remotes: {
        ui: "ui@https://pincode-ui.netlify.app/remoteEntry.js",
    },
    shared: {
        react: { requiredVersion: deps.react, singleton: true },
        'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
    },
    // exposes: {
    //     "./AccountsSummary": "./src/components/AccountsSummary",
    // },
};

module.exports = (env, options) => {
    return {
        mode: options.mode,
        entry: entryConfig,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [["postcss-preset-env"]],
                                },
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: "javascript/auto",
                    loader: "file-loader",
                    options: {
                        publicPath: "../",
                        name: "[path][name].[ext]",
                        context: path.resolve(__dirname, "src/assets"),
                        emitFile: false,
                    },
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: "javascript/auto",
                    exclude: /images/,
                    loader: "file-loader",
                    options: {
                        publicPath: "../",
                        context: path.resolve(__dirname, "src/assets"),
                        name: "[path][name].[ext]",
                        emitFile: false,
                    },
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                '@/*': path.resolve(__dirname, './src/'),
                '@/pages': path.resolve(__dirname, './src/pages'),
                '@/components': path.resolve(__dirname, './src/components'),
                '@/lib': path.resolve(__dirname, './src/lib'),
                '@/hooks': path.resolve(__dirname, './src/hooks'),
                '@/data': path.resolve(__dirname, './src/data'),
                '@/store': path.resolve(__dirname, './src/store'),
                '@/router': path.resolve(__dirname, './src/router'),
                '@/assets': path.resolve(__dirname, './src/assets'),
            }
        },
        output: {
            filename: "js/[name].bundle.js",
            path: path.resolve(__dirname, outputConfig.destPath),
            publicPath: "",
        },
        optimization: {
            minimizer: [new TerserPlugin(terserPluginConfig)],
            splitChunks: {
                chunks: "all",
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin(copyPluginPatterns),
            new MiniCssExtractPlugin({ filename: scssConfig.destFileName }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                inject: true,
                minify: false,
            }),
            NativeFederationTypeScriptHost({
                moduleFederationConfig: federationConfig,
            }),
            new ModuleFederationPlugin(federationConfig),
        ],
    };
};
