import { Model, Schema, model } from 'mongoose'
import { ICow } from './cow.interface'
import { cowCategory, cowLable } from './cow.constant'
import { locations } from '../user/user.constant'

/* step two --> Create schema */
const CowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: locations },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: cowLable },
    category: { type: String, enum: cowCategory },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

/* step three --> Create class-oriented model */

type CowModel = Model<ICow, Record<string, unknown>>

/* step four --> Create a model. */
export const Cow = model<ICow, CowModel>('Cow', CowSchema)
