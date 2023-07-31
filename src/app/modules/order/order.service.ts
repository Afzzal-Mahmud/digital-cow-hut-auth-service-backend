/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import { Cow } from '../cow/cow.model'
import { User } from '../user/user.model'
import { IOrder, ITransectionHistory } from './order.interface'
import ApiErrors from '../../../errors/ApiErrors'
import { Transections } from './order.model'
import { IGenericResponseOnGet } from '../../../interfaces/IGenericResponseOnGet'
import { IPaginationObject } from '../../../interfaces/IPaginationOptions'
import { paginationHelper } from '../../../shared/utility/calculatePagination.helper'
import { SortOrder } from 'mongoose'

const placedOrder = async (
  orderHistory: IOrder
): Promise<ITransectionHistory[] | null> => {
  const buyerInfo = await User.findById(orderHistory.buyer)
  const cowInfo = await Cow.findById(orderHistory.cow)
  const transectionDetails: ITransectionHistory[] = []

  if (buyerInfo && cowInfo) {
    const buyerBudget = parseInt(buyerInfo.budget)
    const cowPrice = cowInfo?.price
    const isAbleToBuy = buyerBudget > cowPrice

    if (!isAbleToBuy) {
      throw new ApiErrors(
        403,
        `The cow price is ${cowPrice} and Your budget ${buyerBudget} must be greater then price`
      )
    }
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      /* As buyer buy the cow which reduced the budget and add to the seller income state then update all */
      const reduceBuyerBudget = buyerBudget - cowPrice
      buyerInfo.budget = reduceBuyerBudget.toString()

      const buyerId = orderHistory.buyer

      const updatedBuyerBudget = await User.findOneAndUpdate(
        { _id: buyerId },
        buyerInfo,
        { new: true, session }
      )

      /* on cowInfo we have the cow sellerId reference to update his income */
      const sellerId = cowInfo?.seller
      const sellerInfo = await User.findById(sellerId)

      if (sellerInfo) {
        const incrisedSellerIncome = parseInt(sellerInfo.income) + cowPrice
        sellerInfo.income = incrisedSellerIncome.toString()
        const updateSellerIncome = await User.findOneAndUpdate(
          { _id: sellerId },
          sellerInfo,
          { new: true, session }
        )
      }

      if (cowInfo.label === 'for sale') {
        cowInfo.label = 'sold out'
        const updatedCowInfo = await Cow.findOneAndUpdate(
          { _id: orderHistory.cow },
          cowInfo,
          { new: true, session }
        )
      } else {
        throw new ApiErrors(400, 'The cow is soldout')
      }

      transectionDetails.push({
        buyerOriginalBudget: buyerBudget,
        buyerBudgetAfterPurches: reduceBuyerBudget,
        sellersIncome: cowPrice,
        buyerInfo: buyerId,
        sellerInfo: sellerId,
        cowInfo: orderHistory.cow,
      })

      await session.commitTransaction()
      await session.endSession()
    } catch (error) {
      await session.abortTransaction()
      await session.endSession
      throw new ApiErrors(400, `roleback while placed order ${error}`)
    }
  }

  if (transectionDetails.length) {
    const result = await Transections.create(transectionDetails)
    return result
  }
  return null
}

const getEveryOrders = async (
  paginationObject: IPaginationObject
): Promise<IGenericResponseOnGet<ITransectionHistory[]>> => {
  const { page, limit, skipDoc, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationObject)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const total = await Transections.countDocuments()
  const result = await Transections.find()
    .populate('buyerInfo')
    .populate('sellerInfo')
    .populate('cowInfo')
    .sort(sortConditions)
    .skip(skipDoc)
    .limit(limit)

  return {
    meta: { page, limit, total },
    data: result,
  }
}

export const orderServices = {
  placedOrder,
  getEveryOrders,
}
