const WebpackAutoInject = require('webpack-auto-inject-version');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const RobotstxtPlugin = require('robotstxt-webpack-plugin');

module.exports = {
    babel: {
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
        presets: [
            [
                '@babel/preset-env',
            ],
        ],
    },
    webpack: {
        // plugins: [
        //     new RobotstxtPlugin(robotsTxtOptions()),
        // ],
        configure: (webpackConfig) => {
            // webpackConfig.plugins.push(
            //     new WorkboxPlugin.InjectManifest({ swSrc: path.join(__dirname, 'src', 'service-worker.js') }),
            // );
            webpackConfig.plugins.push(
                new WebpackAutoInject({
                    SHORT: 'FLOW',
                    SILENT: true,
                    components: {
                        AutoIncreaseVersion: false,
                    },
                    componentsOptions: {
                        InjectAsComment: {
                            tag: 'Version: {version}',
                            multiLineCommentType: false,
                        },
                    },
                }),
            );

            webpackConfig.output.globalObject = 'this';

            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig }) => {
                    webpackConfig.module.rules.push({
                        test: /\.worker\.js$/,
                        use: { loader: 'worker-loader' },
                    });
                    webpackConfig.module.rules.push({
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    });
                    return webpackConfig;
                },
            },
        },
    ],
};

// const robotsTxtOptions = () => {
//     if (process.env.REACT_APP_ENV === 'prod') {
//         return {
//             policy: [
//                 {
//                     userAgent: '*',
//                     allow: '/',
//                 },
//             ],
//             sitemap: `${process.env.REACT_APP_HOST}/sitemap.xml`,
//         };
//     }
//     return {
//         policy: [
//             {
//                 userAgent: '*',
//                 disallow: '/',
//             },
//         ],
//     };
// };
