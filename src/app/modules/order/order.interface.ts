import { Types } from 'mongoose'

export type IOrder = {
  cow: Types.ObjectId
  buyer: Types.ObjectId
}

export type ITransectionHistory = {
  buyerOriginalBudget: number
  buyerBudgetAfterPurches: number
  sellersIncome: number
  buyerInfo: Types.ObjectId
  sellerInfo: Types.ObjectId
  cowInfo: Types.ObjectId
}
