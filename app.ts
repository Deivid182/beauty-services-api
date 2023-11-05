import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { corsOptions } from './config'
import authRouter from './routes/auth.routes'
import servicesRouter from './routes/services.routes'

const app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRouter)
app.use('/api/services', servicesRouter)

export default app