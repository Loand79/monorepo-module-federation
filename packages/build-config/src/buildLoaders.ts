import {ModuleOptions} from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript'
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'

    const scssLoader = {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            namedExport: false,
                            exportLocalsConvention: 'as-is',
                            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                        },
                    },
                },
                // Compiles Sass to CSS
                "sass-loader",
            ],
    }
    const tsLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: true,
                },
            }
        ],
        exclude: /node_modules/,
    }
    const assetsLoader =  {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
    }

    const svgrLoader = {
            test: /\.svg$/i,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'convertColors',
                                    params: {
                                        currentColor: true,
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
        }

    // const babelLoader = buildBabelLoader(options)

    return [
        scssLoader,
        tsLoader,
        assetsLoader,
        svgrLoader,
        // babelLoader
    ]
}