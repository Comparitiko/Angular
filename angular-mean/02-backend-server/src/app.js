import cors from 'cors'
import express from 'express'

import router from './routes/index.routes.js'

const app = express()

// Use the cors middleware
app.use(cors())

// Carpeta publica
app.use(express.static('public'))

// Parse JSON bodies
app.use(express.json())

// Use main route
app.use('/api', router)

// Delete express powered by header
app.disable('x-powered-by')

export default app
