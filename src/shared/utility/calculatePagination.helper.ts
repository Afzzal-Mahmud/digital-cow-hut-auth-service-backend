import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type IOptionsResult = {
  page: number
  limit: number
  skipDoc: number
  sortBy: string
  sortOrder: SortOrder
}

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skipDoc = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skipDoc,
    sortBy,
    sortOrder,
  }
}

export const paginationHelper = { calculatePagination }
