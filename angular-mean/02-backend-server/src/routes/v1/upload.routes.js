// Route: /api/v1/upload
import { Router } from 'express'
import expressFileUpload from 'express-fileupload'
import { UploadController } from '../../controllers/upload.controller.js'
import { validateJwt } from '../../middlewares/validate-jwt.js'

const router = Router()

router.use(expressFileUpload())

router.put('/:tabla/:id', validateJwt, UploadController.upload)

router.get('/:tabla/:imagen', UploadController.getImage)

export default router
