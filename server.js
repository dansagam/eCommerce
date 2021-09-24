import express from "express"
import path from 'path'
import { config } from 'dotenv'
import morgan from 'morgan'
const app = express()

config({path: './config/config.env'})
app.use(express.json())
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(
    PORT, () => 
    console.log(`Budget income app  ${process.env.NODE_ENV} listening on port ${PORT} 🔥 !` )
)

