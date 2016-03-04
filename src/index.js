import postcss from 'postcss'
import sizeOf from 'image-size'
import path from 'path'
import fs from 'fs'

const HIDPI_IMAGE_WIDTH_PATTERN = /hidpi-image-width\(['"]?(.+?)['"]?\)/
const HIDPI_IMAGE_HEIGHT_PATTERN = /hidpi-image-height\(['"]?(.+?)['"]?\)/
const IMAGE_WIDTH_PATTERN = /image-width\(['"]?(.+?)['"]?\)/
const IMAGE_HEIGHT_PATTERN = /image-height\(['"]?(.+?)['"]?\)/

const cachedSizes = {}

function imageExists(imagePath) {
  try {
    fs.statSync(imagePath).toString()
    return true
  } catch (err) {
    return false
  }
}

function getImageSizeByPath(assetsPath, imagePath) {
  if (Array.isArray(assetsPath)) {
    const tmpPath = assetsPath.find((p) => {
      return imageExists(path.resolve(p, imagePath))
    })
    imagePath = path.resolve(tmpPath, imagePath)
  } else {
    imagePath = path.resolve(assetsPath, imagePath)
  }

  cachedSizes[imagePath] = cachedSizes[imagePath] || sizeOf(imagePath)
  return cachedSizes[imagePath]
}

function applyImageHelper(css, getImageSize, helperString, helperPattern) {
  css.replaceValues(helperPattern, {fast: helperString}, (string) => {
    const imagePath = string.match(helperPattern)[1].replace(/^~/, '')
    const isRetinaImage = helperPattern == HIDPI_IMAGE_WIDTH_PATTERN || helperPattern == HIDPI_IMAGE_HEIGHT_PATTERN
    const isWidthHelper = helperPattern == IMAGE_WIDTH_PATTERN || helperPattern == HIDPI_IMAGE_WIDTH_PATTERN

    try {
      const imageSize = getImageSize(imagePath)

      if (isRetinaImage) {
        return (imageSize[isWidthHelper ? 'width' : 'height'] / 2) + 'px'
      } else {
        return imageSize[isWidthHelper ? 'width' : 'height'] + 'px'
      }
    } catch (e) {
      throw css.error(e.message, {plugin: 'postcss-image-sizes'})
    }
  })
}

export default postcss.plugin('postcss-image-sizes', (opts = {}) => {
  const assetsPath = opts.assetsPath
  const getImageSize = getImageSizeByPath.bind(this, assetsPath)

  return (css, result) => {
    const applyImageHelperToCss = applyImageHelper.bind(this, css, getImageSize)

    applyImageHelperToCss('hidpi-image-width', HIDPI_IMAGE_WIDTH_PATTERN)
    applyImageHelperToCss('hidpi-image-height', HIDPI_IMAGE_HEIGHT_PATTERN)
    applyImageHelperToCss('image-width', IMAGE_WIDTH_PATTERN)
    applyImageHelperToCss('image-height', IMAGE_HEIGHT_PATTERN)
  }
})
