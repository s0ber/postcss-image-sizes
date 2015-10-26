const postcss = require('postcss')

module.exports = postcss.plugin('postcss-image-sizes', (opts = {}) => {
  // Work with options here

  return (css, result) => {
    // Transform CSS AST here
  }
})
