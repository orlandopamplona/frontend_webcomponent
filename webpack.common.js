const path = require("path")
const webpack = require('webpack');

module.exports = {
    entry  : {
        bundle: [ "babel-polyfill", "./src/index.js" ]
    },
    output: {
        path: path.resolve(__dirname, "public"),
		filename: 'bundle.js'
    },
    resolve: {
        mainFields: ["main", "module"]
    },
    plugins: [
        new webpack.DefinePlugin({
          "process.env.API_BACKEND_DOMAIN": JSON.stringify(process.env.API_BACKEND_DOMAIN)
        })
    ],
    module: {
        rules: [{
            test   : /\.js$/,
            exclude: /node_modules/,
            include: [
                path.resolve(__dirname, "src")
            ],
            loader: "babel-loader",
            query : {
                presets: [["env", { targets: { browsers: ["> 1%",
                    "Firefox >= 52",
                    "ie >= 11",
                    "safari >= 7",
                    "Chrome >= 55"] } }]],
                plugins: ["transform-runtime",
                    "transform-custom-element-classes",
                    "transform-es2015-classes",
                    "transform-es2015-arrow-functions"
                ]
            }
        },
		{
		  test: /\.(html)$/,
		  use: {
			loader: 'html-loader',
			options: {
			  attrs: [':data-src']
			}
		  }
		},
		{
            test: /\.css$/,
            use : [
                "to-string-loader",
                "css-loader"
            ]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use : [
                    "file-loader",
                    {
                        loader : "image-webpack-loader",
                        options: {
                            bypassOnDebug: true,
                            disable      : true
                        }
                    }
            ]
        }
        ]
    }
}
