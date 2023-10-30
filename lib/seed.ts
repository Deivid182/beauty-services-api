import { config } from 'dotenv'
import { connectDB } from '../db'
import ServiceModel from '../models/service.model'
import { services } from './data'

config()

export const seedDB = async () => {
  try {
    await connectDB()
    await ServiceModel.insertMany(services)
    console.log('Database seeded')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const clearDB = async () => {
  try {
    await connectDB()
    await ServiceModel.deleteMany()
    console.log('Database cleared')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if(process.argv[2] === '--import') {
  seedDB()
} else {
  clearDB()
}