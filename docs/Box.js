import cxs from 'cxs/component'
import colors from './colors'
import { space, width, color } from 'styled-system'
import PropTypes from 'prop-types'

const Box = cxs('div')(
  space,
  width,
  color
)

const responsive = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Box.propTypes = {
  width: responsive,
  w: responsive,
  color: responsive,
  bg: responsive,
  m: responsive,
  mt: responsive,
  mr: responsive,
  mb: responsive,
  ml: responsive,
  mx: responsive,
  my: responsive,
  p: responsive,
  pt: responsive,
  pr: responsive,
  pb: responsive,
  pl: responsive,
  px: responsive,
  py: responsive,
}

export default Box
