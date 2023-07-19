import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { locations, userRole } from './user.constant'

/* step two --> Create schema */

const userSchema = new Schema<IUser>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: userRole },
    password: { type: String, required: true },
    address: { type: String, enum: locations },
    budget: { type: String, required: true },
    income: { type: String, required: true },
    profileImage: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// address: string
// budget: string
// income: string
// profileImage?: string

/* step three --> Create class-oriented model */

type UserModel = Model<IUser, Record<string, unknown>>

/* step four --> Create a model. */
export const User = model<IUser, UserModel>('User', userSchema)
