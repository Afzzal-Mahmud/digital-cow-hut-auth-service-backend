import express from 'express'
import { userController } from './user.controller'
import validateZodRequest from '../../middlewares/validateZodRequest'
import { userValidation } from './user.zod.validation'
const router = express.Router()

router.post(
  '/signup',
  validateZodRequest(userValidation.userZodSchema),
  userController.createNewUser
)

export const userRoutes = { router }
