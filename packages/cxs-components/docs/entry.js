
import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import App from './App'
import { cxs } from '../src'

if (typeof document !== 'undefined') {
  render(<App />, app)
}

const min = s => s.replace(/^s+|\n|\s\s+/g, '').trim()

export default (locals, cb) => {
  const html = renderToString(<App />)
  const css = cxs.css

  const page = (`<!DOCTYPE html>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<title>cxs-components</title>
<meta name='description' content='Styled UI component primitives for React - built with cxs'>
<meta name='twitter:card' content='summary'>
<meta name='twitter:site' content='@jxnblk'>
<meta name='twitter:title' content='cxs-components'>
<meta name='twitter:description' content='Styled UI component primitives for React - built with cxs'>
<meta name='twitter:image' content='http://jxnblk.com/cxs-components/card.png'>
<style>*{box-sizing:border-box}body{margin:0}${css}</style>
<div id='app'>${html}</div>
<script>
(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-4603832-6", "auto");ga("send", "pageview");
</script>
<script id='twitter-wjs' src='//platform.twitter.com/widgets.js'></script>
  `)

  cb(null, page)
}

