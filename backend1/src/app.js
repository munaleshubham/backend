import express from 'express'
import cookieParser from 'cookie-parser'
const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))
app.use(express({
    limit:'16kb'
}))

app.use(express.urlencoded({extended: true,limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser(b ))

export {app} 
