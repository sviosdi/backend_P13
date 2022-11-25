import express from 'express'
import cors from 'cors'
import dbConnection from './database/connection.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'

const app = express()
const port = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/transactions', transactionRoutes)

app.get('/', (req, res) => {
    res.send(`Hello from server running at http://localhost:${port}`)
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
