const postcss = require('postcss')
const expect  = require('chai').expect

const plugin = require('../')

const test = (input, output, opts, done) => {
  postcss([plugin(opts)]).process(input).then((result) => {
    expect(result.css).to.eql(output)
    expect(result.warnings()).to.be.empty
    done()
  }).catch((error) => {
    done(error)
  })
}

describe('postcss-image-sizes', () => {
  /* Write tests here

  it('does something', function (done) {
      test('a{ }', 'a{ }', { }, done);
  });*/
})
