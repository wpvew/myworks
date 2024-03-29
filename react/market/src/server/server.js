import express from 'express';
import ReactDOM from 'react-dom/server';
import { App } from '../App';
import { indexTemplate } from './indexTemplate';

const PORT = process.env.PORT || 4000;

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('*', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`Server start in http://localhost:${PORT}`);
});
