import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { paginationKeyArray } from '../../../shared/constant/paginationKeyArray'
import { createObject } from '../../../shared/utility/createObject'
import { ICow } from './cow.interface'
import { cowServices } from './cow.service'
import { cowFiltarableFields } from './cow.constant'

const createNewCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body
  const result = await cowServices.createCow(cowData)

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow created successfully',
    data: result,
  })
})

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = await createObject(req.query, cowFiltarableFields)
  const paginationObject = createObject(req.query, paginationKeyArray)
  const result = await cowServices.getEveryCow(filters, paginationObject)

  sendResponse<ICow[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow retrive successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await cowServices.retriveSingleCow(id)
  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'A single cow retrive successfully',
    data: result,
  })
})

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await cowServices.updateCowInfo(id, updatedData)

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow updated successfully !',
    data: result,
  })
})

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await cowServices.deleteCow(id)
  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  })
})

export const cowController = {
  createNewCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
