// Route: /api/v1/doctors

import { Router } from 'express'
import { check } from 'express-validator'

import { validateData } from '../../middlewares/validate-data.js'
import { validateJwt } from '../../middlewares/validate-jwt.js'
import { DoctorsController } from '../../controllers/doctors.controller.js'

const router = Router()

router.get('/', validateJwt, DoctorsController.getAllDoctors)

router.post('/',
  [
    validateJwt,
    check('dni', 'DNI is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('hospital', 'Hospital is required').notEmpty(),
    check('hospital', 'Hospital id not valid').isMongoId(),
    validateData
  ],
  DoctorsController.createDoctor
)

router.put('/:id',
  [
		validateJwt,
		check('name', 'Name is optional and is a string').optional().isString(),
		check('hospital', 'hospital is optional and is a mongo id').optional().isMongoId(),
		validateData
	],
  DoctorsController.updateDoctor
)

router.delete('/:id', validateJwt, DoctorsController.deleteDoctor)

export default router
