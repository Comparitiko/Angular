import mongoose from 'mongoose'

import { MONGO_URI } from '../consts/consts.js'

export class DatabaseError extends Error {
	constructor(message) {
		super(message)
		this.name = 'DatabaseError'
	}
}

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
    throw new DatabaseError('Error connecting to database')
  }
}
