// Route: /api/v1/hospitals

import { Router } from 'express'
import { check } from 'express-validator'

import { validateData } from '../../middlewares/validate-data.js'
import { validateJwt } from '../../middlewares/validate-jwt.js'
import { HospitalsController } from '../../controllers/hospitals.controller.js'

const router = Router()

router.get('/', validateJwt, HospitalsController.getAllHospitals)

router.post('/',
  [
    validateJwt,
    check('name', 'Name is required').notEmpty(),
    validateData
  ],
  HospitalsController.createHospital
)

router.put('/:id',
  [
		validateJwt,
		check('name', 'Name is required').notEmpty(),
		validateData
	],
  HospitalsController.updateHospital
)

router.delete('/:id', validateJwt, HospitalsController.deleteHospital)

export default router
