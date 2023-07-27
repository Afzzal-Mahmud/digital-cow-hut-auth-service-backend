import { SortOrder } from 'mongoose'
import { User } from '../user/user.model'
import { Cow } from './cow.model'
import ApiErrors from '../../../errors/ApiErrors'
import { ICow, ICowFilters } from './cow.interface'
import { cowSearchableFields } from './cow.constant'
import { paginationHelper } from '../../../shared/utility/calculatePagination.helper'
import { IPaginationObject } from '../../../interfaces/IPaginationOptions'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'

const createCow = async (payload: ICow): Promise<ICow> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sellerId = await User.findById(payload.seller)
  } catch (error) {
    throw new ApiErrors(
      404,
      `Your seller Id did not match with any valid document,make sure you entered your seller id correctly${error}`
    )
  }
  const user = await Cow.create(payload)
  return user
}

const getEveryCow = async (
  filters: ICowFilters,
  paginationObject: IPaginationObject
): Promise<IGenericResponseOnGet<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters
  const { page, limit, skipDoc, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationObject)

  const andConditions = []
  // Search needs $or for searching in specified fields for any match
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // Filters needs $and to filter exact data match
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  if (minPrice) {
    andConditions.push({
      $and: [{ price: { $gte: minPrice } }],
    })
  }
  if (maxPrice) {
    andConditions.push({
      $and: [{ price: { $lte: maxPrice } }],
    })
  }
  if (minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
    })
  }

  // Dynamic Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const dataRetrieveCondition =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const total = await Cow.countDocuments()
  const result = await Cow.find(dataRetrieveCondition)
    .populate('seller')
    .sort(sortConditions)
    .skip(skipDoc)
    .limit(limit)

  return {
    meta: { page, limit, total },
    data: result,
  }
}

const retriveSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller')
  return result
}

const updateCowInfo = async (
  _id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isCowExist = await Cow.findOne({ _id })
  if (!isCowExist) {
    throw new ApiErrors(404, 'Cow not found')
  }

  const { ...cowData } = payload
  Object.assign(isCowExist, cowData)

  const result = await Cow.findOneAndUpdate({ _id }, payload, {
    new: true,
  })

  return result
}

const deleteCow = async (_id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(_id)
  return result
}
export const cowServices = {
  createCow,
  getEveryCow,
  retriveSingleCow,
  updateCowInfo,
  deleteCow,
}
