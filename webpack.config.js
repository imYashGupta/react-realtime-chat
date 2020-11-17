module.exports = {
    module: {
        rules:[
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                loader: 'file-loader',
                include: [/dist/],
          
                options: {
                  name: '[hash].[ext]',
                  outputPath: 'fonts/',
                  publicPath: url => 'dist/css/fonts/inter-ui/Inter-Black.woff' + url
                }
              },
        ]
    }
}