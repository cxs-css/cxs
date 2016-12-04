
import React from 'react'
import cxs, { css } from 'cxs'
import Box from './Box'
import prettyBytes from 'pretty-bytes'

const min = str => str
  .replace(/\n/g, '')
  .replace(/\s\s+/g, ' ')
  .replace(/\s{/g, '{')
  .replace(/{\s/g, '{')
  .replace(/\s}/g, '}')
  .replace(/}\s/g, '}')
  .replace(/;\s/g, ';')
  .replace(/;}/g, '}')

const format = str => str
  .replace(/{/g, ' {\n  ')
  .replace(/;\s?/g, ';\n  ')
  .replace(/}/g, '\n}\n')

const CssOutput = () => {
  const rendered = min(css())

  return (
    <Box>
      <h3>
        Generated CSS for this page
        ({prettyBytes(rendered.length)})
      </h3>
      <pre
        className={cx.pre}
        dangerouslySetInnerHTML={{
          __html: format(rendered)
        }}
      />
    </Box>
  )
}

const cx = {
  pre: cxs({
    fontFamily: 'Menlo, monospace',
    fontSize: 14,
    padding: 16,
    maxHeight: '60vh',
    overflow: 'auto',
    backgroundColor: '#d4f2f9'
  })
}

export default CssOutput

