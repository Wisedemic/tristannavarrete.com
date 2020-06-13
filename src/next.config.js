const path = require('path')

const publicRuntimeConfig = { GA_KEY: process.env['GA_KEY'] }

const sassOptions = {
  includePaths: [path.join(__dirname, 'styles')]
}

module.exports = (nextConfig) =>
  Object.assign({ publicRuntimeConfig, sassOptions }, nextConfig, {
    webpack(config, options) {
      const { isServer } = options

      nextConfig = Object.assign(
        { inlineImageLimit: 8192, assetPrefix: '' },
        nextConfig
      )

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

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
