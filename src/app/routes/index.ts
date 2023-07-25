import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { cowRoutes } from '../modules/cow/cow.route'

const routers = express.Router()

const moduleRoute = [
  {
    path: '/auth/',
    route: userRoutes.router,
  },
  {
    path: '/users/',
    route: userRoutes.router,
  },
  {
    path: '/cows/',
    route: cowRoutes.router,
  },
]

moduleRoute.forEach(eachRoute => routers.use(eachRoute.path, eachRoute.route))

export const mainRoutes = { routers }
