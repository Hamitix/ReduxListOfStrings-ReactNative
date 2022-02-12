import { createAction } from '@reduxjs/toolkit'

import constants from '../utils/Constants.json'

export const addElement = createAction(constants.reducerActions.addElement, (nextID: string, value: string) => {
  return {
    payload: {
      nextID: nextID,
      value: value,
    },
  }
})

export const removeElement = createAction(
  constants.reducerActions.removeElement,
  (keyInAsyncStorage: string, value: string) => {
    return {
      payload: {
        keyInAsyncStorage: keyInAsyncStorage,
        value: value,
      },
    }
  },
)

export const reset = createAction(constants.reducerActions.reset)
