const fs = require('fs')
const path = require('path')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const lessToJS = require('less-vars-to-js')

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './styles/antd-theme.less'), 'utf8'))

const lessLoaderOptions = {
  javascriptEnabled: true,
  modifyVars: themeVariables // make your antd custom effective
}

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {} // eslint-disable-line
}

module.exports = nextConfig => withCss(
  withLess(
    withSass(
      Object.assign({ lessLoaderOptions }, nextConfig, {
        webpack(config, options) {
          const { isServer } = options

          if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback()
                if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback)
                } else {
                  callback()
                }
              },
              ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ]

            config.module.rules.unshift({
              test: antStyles,
              use: 'null-loader'
            })
          }

          nextConfig = Object.assign({ inlineImageLimit: 8192, assetPrefix: '' }, nextConfig)

          if (!options.defaultLoaders) {
            throw new Error(
              'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
            )
          }

          config.module.rules.push({
            test: /\.(jpe?g|png|svg|gif|ico)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: nextConfig.inlineImageLimit,
                  fallback: 'file-loader',
                  publicPath: `${nextConfig.assetPrefix}/_next/static/images/`,
                  outputPath: `${isServer ? '../' : ''}static/images/`,
                  name: '[name]-[hash].[ext]'
                }
              }
            ]
          })

          config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'store2/on': 'store2/src/store.on.js',
            'store2/old': 'store2/src/store.old.js'
          }

          if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options)
          }

          return config
        }
      })
    )
  )
)
