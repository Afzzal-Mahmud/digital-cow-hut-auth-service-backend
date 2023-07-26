import { Types } from 'mongoose'

/* step one --> create cow interface*/
export type ICow = {
  name: string
  age: number
  price: number
  location: string
  breed: string
  weight: number
  label: 'for sale' | 'sold out'
  category: 'Dairy' | 'Beef' | 'DualPurpose'
  seller: Types.ObjectId
}

export type ICowFilters = {
  searchTerm?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  breed?: string
  category?: 'Dairy' | 'Beef' | 'DualPurpose'
}
