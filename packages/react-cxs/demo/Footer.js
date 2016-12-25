
const Footer = () => {
  const cx = {
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 32,
      paddingBottom: 128,
      marginLeft: -8,
      marginRight: -8,
    },
    link: {
      fontSize: 14,
      fontWeight: 'bold',
      padding: 8,
      color: 'inherit',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',
      },
      ':last-child': {
        marginLeft: 'auto'
      }
    }
  }

  return (
    <footer className={cx.root}>
      <a className={cx.link} href='//github.com/jxnblk/react-cxs'>GitHub</a>
      <a className={cx.link} href='//npmjs.com/package/react-cxs'>npm</a>
      <a className={cx.link} href='//jxnblk.com'>Made by Jxnblk</a>
    </footer>
  )
}

export default Footer
