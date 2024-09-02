// Route: /api

import { Router } from 'express'
import { readdir } from 'fs/promises'

const router = Router()

// Read routes and add them to the router
const routesPath = `${process.cwd()}/src/routes`

const routes = (await readdir(routesPath)).filter(file => !file.includes('.js'))

routes.forEach(async (route) => {
  const subroutes = await readdir(`${routesPath}/${route}`)
  subroutes.forEach(async (subroute) => {
    const subroutePath = `${routesPath}/${route}/${subroute}`
    const subrouteName = subroute.split('.')[0]
    router.use(`/${route}/${subrouteName}`, (await import(subroutePath)).default)
  })
})

export default router
