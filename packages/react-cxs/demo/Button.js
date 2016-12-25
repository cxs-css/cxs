
import { colors } from './style'

const Button = ({
  ...props
}) => {
  const Comp = props.href ? 'a' : 'button'

  const cx = {
    fontFamily: 'inherit',
    fontSize: 14, //'inherit',
    fontWeight: 'bold',
    lineHeight: 1,
    textDecoration: 'none',
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: 0,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingTop: '.5em',
    paddingBottom: '.5em',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    color: 'white',
    backgroundColor: colors.blue,
    cursor: 'pointer',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    ':hover': {
      backgroundColors: colors.darkBlue
    }
  }

  return (
    <Comp className={cx} {...props} />
  )
}

export default Button

