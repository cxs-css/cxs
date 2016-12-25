
import Heading from './Heading'
import Button from './Button'
import TweetButton from './TweetButton'
import GithubButton from './GithubButton'

const Header = ({
  name,
  version,
  ...props
}) => {
  const cx = {
    buttons: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }

  return (
    <header>
      <Heading>{name}</Heading>
      <div className={cx.buttons}>
        <Button
          href='https://github.com/jxnblk/react-cxs'
          children='GitHub' />
        <Button
          href='https://npmjs.com/package/react-cxs'
          children='npm' />
        <TweetButton />
        <GithubButton />
      </div>
    </header>
  )
}

export default Header

