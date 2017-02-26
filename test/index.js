import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import {expect} from 'chai'

import plugin from '../src'

const read = function(path) {
  return fs.readFileSync(path, 'utf-8')
}

const opts = {assetsPath: path.join(__dirname, 'fixtures')}

describe('postcss-image-sizes', () => {
  it('sets correct image sizes', (done) => {
    const inputPath = 'test/fixtures/css/example.css'
    const input = read(inputPath)
    const output = read('test/fixtures/css/example.out.css')

    postcss([plugin(opts)]).process(input, {from: inputPath}).then((result) => {
      expect(result.css).to.eql(output)
      expect(result.warnings()).to.be.empty
      done()
    }).catch((error) => {
      done(error)
    })
  })

  context('cant read the file', () => {
    it('throws css syntax error', () => {
      const input = read('test/fixtures/css/error_example.css')

      return postcss([plugin(opts)]).process(input).catch((error) => {
        expect(error.constructor).to.match(/CssSyntaxError/)
      })
    })
  })

  context('resolves file with miltiple assets pathes', () => {
    it('sets correct image sizes', (done) => {
      const inputPath = 'test/fixtures/css/example.css'
      const input = read(inputPath)
      const output = read('test/fixtures/css/example.out.css')
      opts.assetsPath = [
        path.join(__dirname),
        path.join(__dirname, 'fixtures')
      ]

      postcss([plugin(opts)]).process(input, {from: inputPath}).then((result) => {
        expect(result.css).to.eql(output)
        expect(result.warnings()).to.be.empty
        done()
      }).catch((error) => {
        done(error)
      })
    })
  })
})
