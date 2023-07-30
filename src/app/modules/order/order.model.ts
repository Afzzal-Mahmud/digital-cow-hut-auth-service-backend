import { Model, Schema, model } from 'mongoose'
import { IOrder, ITransectionHistory } from './order.interface'

const OrderSchema = new Schema<IOrder>({
  cow: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

type OrderModel = Model<IOrder, Record<string, unknown>>

export const Order = model<IOrder, OrderModel>('Order', OrderSchema)

/* seving transection details to the server*/
const TransectionHistorySchema = new Schema<ITransectionHistory>({
  buyerOriginalBudget: Number,
  buyerBudgetAfterPurches: Number,
  sellersIncome: Number,
  buyerInfo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerInfo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cowInfo: {
    type: Schema.Types.ObjectId,
    ref: 'Cow',
    required: true,
  },
})

type TransectionHistoryModel = Model<
  ITransectionHistory,
  Record<string, unknown>
>

export const Transections = model<ITransectionHistory, TransectionHistoryModel>(
  'Transection',
  TransectionHistorySchema
)
