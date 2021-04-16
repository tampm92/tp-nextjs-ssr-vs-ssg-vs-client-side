module.exports = {
    webpack: (config, options) => {
      config.resolve.alias['@'] = __dirname;
  
      return config
    },
  }