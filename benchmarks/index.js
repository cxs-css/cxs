const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

// benchmark hates browser-env
require('browser-env')()
const cxs = require('./lib/cxs')
const styledComponents = require('./lib/styled-components')
const glamorous = require('./lib/glamorous')
const inlineStyles = require('./lib/inline-styles')
const fela = require('./lib/fela')

// must be imported after others to prevent globbering other libraries
require('babel-register')({
  plugins: [
    [ require('emotion/babel'), { inline: true } ]
  ]
})
const emotion = require('./lib/emotion')

suite
  .add('inline-styles', inlineStyles)
  .add('cxs', cxs)
  .add('emotion', emotion)
  .add('glamorous', glamorous)
  .add('fela', fela)
  .add('styled-components', styledComponents)
  .on('cycle', e => {
    console.log(String(e.target))
  })
  .on('complete', function () {
    const top = this.filter('fastest').map('name')
    console.log(`Fastest is ${top}`)
  })
  .run({
    async: true
  })

