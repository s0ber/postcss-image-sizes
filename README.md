# PostCSS Image Sizes [![Build Status][ci-img]][ci]

[PostCSS] plugin Image dimensions in your css.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/s0ber/postcss-image-sizes.svg
[ci]:      https://travis-ci.org/s0ber/postcss-image-sizes

```css
.foo {
  /* Input example */
  img.my_image {
    background-size: image-width('my_image.png') image-height('my_image.png')
  }
}
```

```css
.foo {
  /* Output example */
  img.my_image {
    background-size: 100px 200px
  }
}
```

## Usage

```js
postcss([ require('postcss-image-sizes') ])
```

See [PostCSS] docs for examples for your environment.
