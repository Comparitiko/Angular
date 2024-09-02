// Route: /api/v1/search
import { Router } from 'express'
import { SearchController } from '../../controllers/search.controller.js'
import { validateJwt } from '../../middlewares/validate-jwt.js'

const router = Router()

router.get('/', validateJwt, SearchController.search)

router.get('/coleccion/:tabla/:busqueda', validateJwt, SearchController.getDocumentsCollection)

export default router
