import express from 'express'
import { userRoutes } from '../modules/user/user.route'

const routers = express.Router()

const moduleRoute = [
  {
    path: '/auth/',
    route: userRoutes.router,
  },
]

moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))

export const mainRoutes = { routers }
