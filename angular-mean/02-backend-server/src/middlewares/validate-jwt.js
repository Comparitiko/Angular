import { request, response } from 'express'
import { JWT_SECRET } from '../consts/consts.js'
import jwt from 'jsonwebtoken'

export const validateJwt = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided'
    })
  }

  try {
    const { uuid } = jwt.verify(token, JWT_SECRET)
    req.uuid = uuid

    next()
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token'
    })
  }
}
