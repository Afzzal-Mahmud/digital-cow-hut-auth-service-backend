import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { orderServices } from './order.service'
import { ITransectionHistory } from './order.interface'
import { paginationKeyArray } from '../../../shared/constant/paginationKeyArray'
import { createObject } from '../../../shared/utility/createObject'

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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const paginationObject = createObject(req.query, paginationKeyArray)
  const result = await orderServices.getEveryOrders(paginationObject)

  sendResponse<ITransectionHistory[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Order retrieve successfully',
    meta: result.meta,
    data: result.data,
  })
})

export const orderController = {
  createNewOrder,
  getAllOrders,
}
