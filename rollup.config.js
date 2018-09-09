import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import path from 'path'

let cxsIndex = path.resolve(__dirname, 'src/index.js')
let cxsMonolithic = path.resolve(__dirname, 'src/monolithic.js')
let cxsCreateTheme = path.resolve(__dirname, 'src/createTheme.js')

function inputFactory (input, name, isProduction) {
  let pluginForProduction = isProduction ? [uglify()] : []
  let outputName = input + (isProduction ? '.min' : '')

  return {
    input: path.resolve(__dirname, `src/${input}.js`),
    output: {
      file: path.resolve(__dirname, `dist/${outputName}.js`),
      format: 'umd',
      name,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        [cxsIndex]: 'cxs',
        [cxsCreateTheme]: 'cxsCreateTheme',
        [cxsMonolithic]: 'cxsMonolithic'
      }
    },
    plugins: [ resolve(), commonjs(), babel() ].concat(pluginForProduction),
    external: ['react', 'react-dom', 'prop-types', cxsIndex, cxsMonolithic, cxsCreateTheme]
  }
}

export default [
  inputFactory('index', 'cxs'),
  inputFactory('component', 'cxsComponent'),
  inputFactory('createTheme', 'cxsCreateTheme'),
  inputFactory('monocomponent', 'cxsMonocomponent'),
  inputFactory('monolithic', 'cxsMonolithic'),
  inputFactory('ThemeProvider', 'cxsThemeProvider'),

  inputFactory('index', 'cxs', true),
  inputFactory('component', 'cxsComponent', true),
  inputFactory('createTheme', 'cxsCreateTheme', true),
  inputFactory('monocomponent', 'cxsMonocomponent', true),
  inputFactory('monolithic', 'cxsMonolithic', true),
  inputFactory('ThemeProvider', 'cxsThemeProvider', true)
]
