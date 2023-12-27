import express from 'express'
import cors from 'cors'
import "dotenv/config.js"
import "./config/database.js"

import userRouter from './routes/user.route.js'
import itemRouter from './routes/item.route.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/items', itemRouter)

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})