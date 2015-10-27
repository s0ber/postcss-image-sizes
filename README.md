# PostCSS Image Sizes [![Build Status][ci-img]][ci]

[PostCSS] plugin for printing image sizes in your css.
It includes helpers for both retina and non-retina images.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/s0ber/postcss-image-sizes.svg
[ci]:      https://travis-ci.org/s0ber/postcss-image-sizes

```css
img.my_image {
  /* Input example */
  background-size: image-width('my_image.png') image-height('my_image.png');
}

img.my_hidpi_image {
  /* Input example */
  background-size: hidpi-image-width('my_image.png') hidpi-image-height('my_image.png');
}
```

```css
img.my_image {
  /* Output example */
  background-size: 100px 200px;
}

img.my_hidpi_image {
  /* Output example */
  background-size: 50px 100px;
}
```

## Usage

```js
const imageSizes = require('postcss-image-sizes')
postcss([imageSizes({assetsPath: '/path/to/images'})])
```

See [PostCSS] docs for examples for your environment.

## Configuration options

`assetsPath` — absolute path, against which images paths will be resolved.
