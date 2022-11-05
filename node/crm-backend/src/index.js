import express from 'express';
import mongoose from 'mongoose';
import config from './cfg/default.js';
import routerAuth from './routes/auth.router.js';
import routerClients from './routes/clients.router.js';
import corsMiddleware from './middleware/cors.middleware.js';
// import cors from 'cors';
// import * as dotenv from 'dotenv'

const PORT = process.env.PORT || config.serverPort;
const DB_URL = config.DBURL;

const app = express();

app.use(express.json());
app.use(corsMiddleware);
// app.use(cors());
app.use('/api/auth', routerAuth);
app.use('/api/clients', routerClients);

function startApp() {
    try {
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log(`server start on ${PORT} port`));
    } catch (e) {
        console.log(e);
    }
}
startApp();
