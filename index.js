import postcss from 'postcss'
import sizeOf from 'image-size'
import path from 'path'

const HIDPI_IMAGE_WIDTH_PATTERN = /hidpi-image-width\(['"]?(.+?)['"]?\)/
const HIDPI_IMAGE_HEIGHT_PATTERN = /hidpi-image-height\(['"]?(.+?)['"]?\)/
const IMAGE_WIDTH_PATTERN = /image-width\(['"]?(.+?)['"]?\)/
const IMAGE_HEIGHT_PATTERN = /image-height\(['"]?(.+?)['"]?\)/

const cachedSizes = {}

function getImageSizeByPath(assetsPath, imagePath) {
  imagePath = path.resolve(assetsPath, imagePath)
  cachedSizes[imagePath] = cachedSizes[imagePath] || sizeOf(imagePath)
  return cachedSizes[imagePath]
}

function applyHelper(css, getImageSize, helperString, helperPattern) {
  css.replaceValues(helperPattern, {fast: helperString}, (string) => {
    const imagePath = string.match(helperPattern)[1]
    const isRetinaImage = helperPattern == HIDPI_IMAGE_WIDTH_PATTERN || helperPattern == HIDPI_IMAGE_HEIGHT_PATTERN
    const isWidthHelper = helperPattern == IMAGE_WIDTH_PATTERN || helperPattern == HIDPI_IMAGE_WIDTH_PATTERN

    try {
      const imageSize = getImageSize(imagePath)

      if (isRetinaImage) {
        return (imageSize[isWidthHelper ? 'width' : 'height'] / 2) + 'px'
      } else {
        return imageSize[isWidthHelper ? 'width' : 'height'] + 'px'
      }
    } catch (err) {
      throw css.error(err.message, {word: imagePath})
    }
  })
}

export default postcss.plugin('postcss-image-sizes', (opts = {}) => {
  const assetsPath = opts.assetsPath
  const getImageSize = getImageSizeByPath.bind(this, assetsPath)

  return (css, result) => {
    const applyHelperToCss = applyHelper.bind(this, css, getImageSize)

    applyHelperToCss('hidpi-image-width', HIDPI_IMAGE_WIDTH_PATTERN)
    applyHelperToCss('hidpi-image-height', HIDPI_IMAGE_HEIGHT_PATTERN)
    applyHelperToCss('image-width', IMAGE_WIDTH_PATTERN)
    applyHelperToCss('image-height', IMAGE_HEIGHT_PATTERN)
  }
})
