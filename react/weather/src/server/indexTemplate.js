export const indexTemplate = (content, location) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/static/client.js" type="application/javascript"></script>
    <script>
      if('${location}' !== 'undefined') {
        localStorage.setItem('location', '${location}')
      }
    </script>
    <title>Weather</title>
  </head>
  <body>
    <div id="react-root">${content}</div>
  </body>
  </html>
`;
