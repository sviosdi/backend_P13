import express from 'express'
import cors from 'cors'
import dbConnection from './database/connection.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'
import dotEnv from 'dotenv'
const swaggerDocs = yaml.load('./openapi.yaml')

dotEnv.config()
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

// API Documentation
if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res) => {
    res.send(`Hello from server running at http://localhost:${port}`)
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
