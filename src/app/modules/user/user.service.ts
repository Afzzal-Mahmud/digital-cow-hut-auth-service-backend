import ApiErrors from '../../../errors/ApiErrors'
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

export const userServices = {
  createUser,
}
