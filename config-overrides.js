const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config)
  return config
}