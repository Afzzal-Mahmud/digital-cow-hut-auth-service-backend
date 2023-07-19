import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { userServices } from './user.service'

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

export const userController = {
  createNewUser,
}
