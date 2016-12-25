
import { colors, breakpoints } from './style'

const typographyStyles = {
  'h1': {
    fontSize: 48,
    marginBottom: 0
  },
  'h2': {
    fontSize: 32,
    marginBottom: 0
  },
  'a': {
    color: colors.blue,
    ':hover': {
      color: colors.darkBlue
    }
  },
  'code': {
    fontFamily: 'SF Mono, Roboto Mono, monospace',
    backgroundColor: colors.gray
  },
  'pre': {
    fontFamily: 'SF Mono, Roboto Mono, monospace',
    fontSize: '.875em',
    padding: 8,
    overflowX: 'scroll',
    backgroundColor: colors.gray
  }
}

const highlightStyles = {
  '.hljs-comment': {
    color: colors.midgray
  },
  '.diff .hljs-header': {
    color: colors.midgray
  },
  '.hljs-javadoc': {
    color: colors.midgray
  },
  // strings
  '.hljs-string': {
    color: colors.blue
  },
  '.hljs-tag .hljs-value': {
    color: colors.blue
  },
  '.hljs-phpdoc': {
    color: colors.blue
  },
  '.hljs-dartdoc': {
    color: colors.blue
  },
  // Numbers
  '.hljs-number': {
    color: colors.purple
  },
  '.hljs-literal': {
    color: colors.purple
  },
  '.hljs-hexcolor': {
    color: colors.purple
  },

  '.hljs-function': {
    color: colors.purple
  },
  '.hljs-built_in': {
    color: colors.purple
  },
  '.hljs-keyword': {
    color: colors.purple
  },
  // '.hljs-winutils': {},
  // '.hljs-subst': {},
  // '.hljs-request': {},
  // '.hljs-status': {},
}

const Prose = ({ html, ...props }) => {
  const cx = {
    lineHeight: 1.5,
    maxWidth: 640,
    ...typographyStyles,
    ...highlightStyles
  }

  return <div className={cx} dangerouslySetInnerHTML={{ __html: html }} />
}

export default Prose

