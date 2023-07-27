import { z } from 'zod'
import { cowCategory, cowLable } from './cow.constant'
import { locations } from '../user/user.constant'

const cowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name number is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...locations] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.string({
      required_error: 'breed is required',
    }),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    label: z.enum([...cowLable] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string({
      required_error: 'Seller id is required',
    }),
  }),
})

const cowZodSchemaOnUpdate = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...locations] as [string, ...string[]]).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z.enum([...cowLable] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategory] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
})

export const cowValidation = {
  cowZodSchema,
  cowZodSchemaOnUpdate,
}
