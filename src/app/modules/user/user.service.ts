import ApiErrors from '../../../errors/ApiErrors'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationObject } from '../../../interfaces/IPaginationOptions'
import { paginationHelper } from '../../../shared/utility/calculatePagination.helper'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  if (payload.role === 'buyer' && parseInt(payload.budget) < 10000) {
    throw new ApiErrors(
      400,
      'If you are a buyer then your budget must be at least 10000'
    )
  }
  const user = await User.create(payload)
  return user
}

const getEveryUsers = async (
  paginationObject: IPaginationObject
): Promise<IGenericResponseOnGet<IUser[]>> => {
  const { page, limit, skipDoc } =
    paginationHelper.calculatePagination(paginationObject)
  const total = await User.countDocuments()
  const result = await User.find().skip(skipDoc).limit(limit)

  return {
    meta: { page, limit, total },
    data: result,
  }
}

export const userServices = {
  createUser,
  getEveryUsers,
}
