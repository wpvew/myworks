import express from 'express';
import ReactDOM from 'react-dom/server';
import App from '../App.tsx';
import axios from 'axios';
import compression from 'compression';
import helmet from 'helmet';
import { indexTemplate } from './indexTemplate';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

const app = express();
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use('/static', express.static('./dist/client'));

app.get('/auth', (req, res) => {
  axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      // eslint-disable-next-line no-undef
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.REDIR_URL}`,
      {
        // eslint-disable-next-line no-undef
        auth: { username: process.env.CLIENT_ID, password: process.env.SECRET },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
    .then(({ data }) => {
      res.send(indexTemplate(ReactDOM.renderToString(App()), data['access_token']));
    })
    .catch();
});

app.get('*', (req, res) => {
  console.log('/');
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`server started on port http://localhost:${PORT}`);
});
