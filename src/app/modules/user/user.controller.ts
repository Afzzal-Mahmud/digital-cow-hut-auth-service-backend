import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { userServices } from './user.service'
import { paginationKeyArray } from '../../../shared/constant/paginationKeyArray'
import { createObject } from '../../../shared/utility/createObject'
import { userFiltarableFields } from './user.constant'

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body
  const result = await userServices.createUser(userData)

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = await createObject(req.query, userFiltarableFields)
  const paginationObject = createObject(req.query, paginationKeyArray)
  const result = await userServices.getEveryUsers(filters, paginationObject)

  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'user get successfully',
    meta: result.meta,
    data: result.data,
  })
})

export const userController = {
  createNewUser,
  getAllUsers,
}
