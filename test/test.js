import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import {expect} from 'chai'

import plugin from '../'

const read = function(path) {
  return fs.readFileSync(path, 'utf-8')
}

const opts = {assetsPath: path.join(__dirname, 'fixtures')}

describe('postcss-image-sizes', () => {
  it('sets correct image sizes', (done) => {
    const input = read('test/fixtures/example.css')
    const output = read('test/fixtures/example.out.css')

    postcss([plugin(opts)]).process(input).then((result) => {
      expect(result.css).to.eql(output)
      expect(result.warnings()).to.be.empty
      done()
    }).catch((error) => {
      done(error)
    })
  })

  context('cant read the file', () => {
    it('throws css syntax error', () => {
      const input = read('test/fixtures/error_example.css')

      return postcss([plugin(opts)]).process(input).catch((error) => {
        expect(error.constructor).to.match(/CssSyntaxError/)
      })
    })
  })
})
