import { z } from 'zod'
import { locations, userRole } from './user.constant'

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
    address: z.enum([...locations] as [string, ...string[]], {
      required_error: 'address is required',
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

const userZodSchemaOnUpdate = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    address: z.enum([...locations] as [string, ...string[]]).optional(),
    budget: z.string().optional(),
    income: z.string().optional(),
    profileImage: z.string().optional(),
  }),
})
export const userValidation = {
  userZodSchema,
  userZodSchemaOnUpdate,
}
