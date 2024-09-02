// Route: /api/v1/users

import { Router } from 'express'
import { check } from 'express-validator'

import { UsersController } from '../../controllers/users.controller.js'
import { validateData } from '../../middlewares/validate-data.js'
import { validateJwt } from '../../middlewares/validate-jwt.js'

const router = Router()

router.get('/', validateJwt, UsersController.getAllUsers)

router.post('/',
  [
    check('name', 'Name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateData
  ],
  UsersController.createUser
)

router.put('/:id',
  [
    validateJwt,
    check('name', 'Name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('role', 'Role is required').notEmpty()
  ],
  UsersController.updateUser
)

router.delete('/:id', validateJwt, UsersController.deleteUser)

export default router
