import express from 'express'
import { cowController } from './cow.controller'
import { cowValidation } from './cow.zod.validation'
import validateZodRequest from '../../middlewares/validateZodRequest'
const router = express.Router()

router.post(
  '/',
  validateZodRequest(cowValidation.cowZodSchema),
  cowController.createNewCow
)
router.get('/', cowController.getAllCows)
router.get('/:id', cowController.getSingleCow)
router.patch(
  '/:id',
  validateZodRequest(cowValidation.cowZodSchemaOnUpdate),
  cowController.updateCow
)
router.delete('/:id', cowController.deleteCow)

export const cowRoutes = { router }
