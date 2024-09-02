// Route: /api/v1/auth

import { Router } from 'express'
import { check } from 'express-validator'

import { AuthController } from '../../controllers/auth.controller.js'
import { validateData } from '../../middlewares/validate-data.js'
import { validateJwt } from '../../middlewares/validate-jwt.js'

const router = Router()

router.post('/login/google', [
	check('token', 'Token is required').notEmpty(),
	validateData
], AuthController.loginGoogle)

router.get('/renew', validateJwt,
AuthController.renewToken)

router.post('/login',
  [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateData
  ],
  AuthController.login
)

export default router
