import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

router.post('/', orderController.createNewOrder)
router.get('/', orderController.getAllOrders)

export const orderRoute = { router }
