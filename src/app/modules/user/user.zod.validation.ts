import { z } from 'zod'
import { userRole } from './user.constant'

const userZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.string({
      required_error: 'Budget is required',
    }),
    income: z.string({
      required_error: 'income is required',
    }),
    profileImage: z.string().optional(),
  }),
})
export const userValidation = {
  userZodSchema,
}
