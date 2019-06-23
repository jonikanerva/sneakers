export const mainHtml = (styles: string, content: string) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Sneakers</title>
  <meta charset="utf-8">
  <link rel="shortcut icon" href="/favicon.png">
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no viewport-fit=cover">
  <meta name="theme-color" content="#000000">
  <style>
    ${styles}
  </style>
  </head>

  <body>
  ${content}
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>

</html>
`
