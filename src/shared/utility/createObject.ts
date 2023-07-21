export const createObject = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  object: T,
  arrayKeys: K[]
): Partial<T> => {
  const finalObject: Partial<T> = {}
  for (const key of arrayKeys) {
    if (object && Object.hasOwnProperty.call(object, key)) {
      finalObject[key] = object[key]
    }
  }
  return finalObject
}
