require('babel-register')
const fs = require('fs')
const path = require('path')
const { renderToStaticMarkup } = require('react-dom/server')
const h = require('react').createElement
const cxs = require('../src')
const App = require('./App').default

// resets
// todo: fix in cxs lib
cxs({
  margin: 0,
  padding: 0
})

const body = renderToStaticMarkup(h(App))
const css = cxs.css()

const template = ({ body, id, css }) => `<!DOCTYPE html>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<title>cxs</title>
<meta name='description' content='fast af css-in-js in 0.7kb'>
<meta name='twitter:card' content='summary'>
<meta name='twitter:site' content='@jxnblk'>
<meta name='twitter:title' content='cxs'>
<meta name='twitter:description' content='fast af css-in-js in 0.7kb'>
<meta name='twitter:image' content='http://jxnblk.com/cxs/cxs.png'>
<style>*{box-sizing:border-box}body{margin:0}${css}</style>
<div id='${id}'>
${body}
</div>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-4603832-6', 'auto');
ga('send', 'pageview');
</script>
<script>
window.twttr = (function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {}; if (d.getElementById(id)) return t; js = d.createElement(s); js.id = id; js.src = "https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); t._e = []; t.ready = function(f) { t._e.push(f); }; return t; }(document, "script", "twitter-wjs"));
</script>
`

const html = template({ body, css, id: 'app' })

const filename = path.join(__dirname, './index.html')
fs.writeFileSync(filename, html)

