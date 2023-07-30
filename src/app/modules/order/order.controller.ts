import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { orderServices } from './order.service'
import { ITransectionHistory } from './order.interface'

const createNewOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderHistory } = req.body
  const result = await orderServices.placedOrder(orderHistory)

  sendResponse<ITransectionHistory[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Order placed successfully',
    data: result,
  })
})

export const orderController = {
  createNewOrder,
}
