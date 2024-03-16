import 'dotenv/config'
import express from "express"
import cors from 'cors';
import { Resend } from "resend";
import ConnectDB from "./db/connection.db.js"

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import blogRouter from "./routes/blog.route.js"
import commentRouter from "./routes/comment.router.js"

import { errorHandler } from './middlewares/errorhandler.middleware.js';

const app = express();
const port = process.env.PORT;
const resend = new Resend(process.env.RESEND_API_KEY);
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
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);

app.use(errorHandler);
/* app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
})) */

//app.use(express.static("public"))
//app.use(cookieParser())

app.get("/api/email", async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "BlogApp <harshkapil7@gmail.com>",
    to: ["kapilharsh1999@gmail.com"],
    subject: "hello world",
    html: "<strong> This is email test. it works!</strong>",
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ data });
})
//Routes
app.get("/", (req, res) => {
  res.send("Server is Running...")
});

app.get("/api/health", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is Running at PORT: ${port}`);
});

