import express from 'express';
import mongoose from 'mongoose';
import routerAuth from './auth.router.js';
import cors from 'cors';

const PORT = 4000;
const DB_URL = `mongodb+srv://user:user@cluster0.zbi598g.mongodb.net/?retryWrites=true&w=majority`

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static('static'));
app.use('/api/auth', routerAuth);

export class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}


function startApp() {
    try {
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => console.log(`server start on ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}
startApp()
