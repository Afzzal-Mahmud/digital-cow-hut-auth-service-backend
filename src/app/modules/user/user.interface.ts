/*steps to create a mongoose modules*/

/*
1. create necessary interface on seperate interface file
2. create model file and define schemaType for user
3. create a class-oriented Model for future function-class features to call
4. create a model
*/

/* step one */

export type UserName = {
  firstName: string
  lastName: string
}

export type IUser = {
  name: UserName
  phoneNumber: string
  role: 'seller' | 'buyer'
  password: string
  address: string
  budget: string
  income: string
  profileImage?: string
}

/* student filtearable field interface on service*/
export type IUserFilters = {
  searchTerm?: string
  _id?: string
  phoneNumber?: string
}
