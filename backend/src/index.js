import 'dotenv/config'
import express from "express"
import cors from 'cors';

import ConnectDB from "./db/connection.db.js"

import userRouter from "./routes/user.route.js"
import blogRouter from "./routes/blog.route.js"
import { CreateBlog } from './controllers/blog.controller.js';

const app = express();
const port = process.env.PORT;

//Database connection
ConnectDB();
 
//Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

/* app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
})) */

//app.use(express.static("public"))
//app.use(cookieParser())


//Routes
app.get("/api/hello", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is Running at PORT: ${port}`);
});

