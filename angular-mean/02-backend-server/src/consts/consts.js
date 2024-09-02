import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET

export const checkEnv = () => {
  if (!PORT) {
    throw new Error('PORT is not defined')
  }

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined')
  }

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
}
