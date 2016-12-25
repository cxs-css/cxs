
import { cxs } from '..'

const Css = () => (
  <pre style={{
    fontFamily: 'Menlo, monospace',
    fontSize: 12,
    whiteSpace: 'pre-wrap'
  }}>
    /* CSS for this page ({cxs.css.length} bytes) */
    {'\n'}
    {cxs.css}
  </pre>
)

export default Css

