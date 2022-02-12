import { Middleware } from 'redux'

import { writeItemToStorage, removeValueFromStorage, clearAllItems } from '../app/asyncStorage'

import constants from '../utils/Constants.json'

export const asyncStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (action.type === constants.reducerActions.addElement) {
    writeItemToStorage(action.payload.nextID, action.payload.value)
  }

  if (action.type === constants.reducerActions.removeElement) {
    removeValueFromStorage(action.payload.keyInAsyncStorage)
  }

  if (action.type === constants.reducerActions.reset) {
    clearAllItems()
  }
  return next(action)
}
