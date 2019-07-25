import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'

import manifestJson from '../../../manifest.json'
import App from '../../client/components/App'

const manifest: { [key: string]: string } = manifestJson

export const indexHtml = (url: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sneakers</title>
  <meta charset="utf-8">
  <link rel="shortcut icon" href="/favicon.png">
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no viewport-fit=cover">
  <meta name="theme-color" content="#000000">
  <link rel="stylesheet" href="/${manifest['main.css']}" />
  </head>
  <body>
  <div id="root">${renderToString(
    <Router location={url}>
      <App />
    </Router>
  )}</div>
  <script src="/${manifest['main.js']}"></script>
</body>
</html>
`
