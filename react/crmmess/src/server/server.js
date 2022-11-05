import express from 'express';
import ReactDOM from 'react-dom/server';
import compression from 'compression';
import helmet from 'helmet';
import App from '../App';
import { indexTemplate } from './indexTemplate';

const PORT = process.env.PORT || 4000;

const app = express();

app.use('/static', express.static('./dist/client'));

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.get('*', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`Server start in http://localhost:${PORT}`);
});
