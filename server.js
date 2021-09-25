import express from 'express'
import path from 'path'
import { config } from 'dotenv'
import logger from 'morgan'
import connectDB from './config/dB.js'


config({path: './config/config.env'})

connectDB()

const app = express()


if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
}else {
    app.get('/', (req, res) =>{
        res.send('API is running')
    })
}


const PORT = process.env.PORT || 5000
app.listen(
    PORT, () => 
    console.log(`server running in  ${process.env.NODE_ENV} mode on port ${PORT} 🔥 !` )
)

