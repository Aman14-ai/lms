import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhook.js'


const app = express()

await connectDB()

app.use(cors())
app.use(express.json())

app.get('/',(req, res) => {
    res.send('Hello from the server!')
})
app.post('/clerk',express.json(),clerkWebhooks)


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})