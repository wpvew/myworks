export const indexTemplate = (content) => `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/static/client.js" type="application/javascript"></script>
    <title>Base config</title>
  </head>
  <body>
    <div id="react-root">${content}</div>
    <div id="modal-root"></div>
  </body>
  </html>
`;
