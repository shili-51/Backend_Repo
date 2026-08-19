const express = require('express');
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares")
const app = express();
const port = 8000;

// Connection 
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDB Connected!"));

app.use(express.urlencoded());

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
