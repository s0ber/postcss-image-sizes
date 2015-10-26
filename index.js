import postcss from 'postcss'
import sizeOf from 'image-size'
import path from 'path'

const IMAGE_WIDTH_PATTERN = /image-width\(['"]?(.+?)['"]?\)/
const IMAGE_HEIGHT_PATTERN = /image-height\(['"]?(.+?)['"]?\)/

let assetsPath
const cachedSizes = {}

function sizeOfImage(imagePath) {
  imagePath = path.resolve(assetsPath, imagePath)
  cachedSizes[imagePath] = cachedSizes[imagePath] || sizeOf(imagePath)
  return cachedSizes[imagePath]
}

module.exports = postcss.plugin('postcss-image-sizes', (opts = {}) => {
  assetsPath = opts.assetsPath

  return (css, result) => {
    css.replaceValues(IMAGE_WIDTH_PATTERN, {fast: 'image-width'}, (string) => {
      const [__, imagePath] = string.match(IMAGE_WIDTH_PATTERN)
      try {
        return sizeOfImage(imagePath).width + 'px'
      } catch (err) {
        throw css.error(err.message, {word: imagePath})
      }
    })

    css.replaceValues(IMAGE_HEIGHT_PATTERN, {fast: 'image-height'}, (string) => {
      const [__, imagePath] = string.match(IMAGE_HEIGHT_PATTERN)
      try {
        return sizeOfImage(imagePath).height + 'px'
      } catch (err) {
        throw css.error(err.message, {word: imagePath})
      }
    })
  }
})
