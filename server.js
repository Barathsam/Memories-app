
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);



app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'));

  });
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));


app.listen(PORT, () => {
  console.log("Backend server is running!");
});


mongoose.set('useFindAndModify', false);