import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// different origins from which our frontend accepts request
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// limit of sending json data to backend
app.use(express.json({limit: "16kb"}))

// we receive spaces in url etc in order to encode them with % etc to send to backend
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// static - to store files folder containing images, favicon etc
app.use(express.static("public"))

app.use(cookieParser())





// routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register








export { app }