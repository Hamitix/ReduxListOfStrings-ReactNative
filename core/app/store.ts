import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'

import elementsReducer from 'reducers/stringReducer'

import { asyncStorageMiddleware } from 'middleware/asyncStorageMiddleware'

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
  },
  middleware: new MiddlewareArray().concat(asyncStorageMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
