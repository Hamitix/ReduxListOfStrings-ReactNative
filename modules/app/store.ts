import { configureStore } from '@reduxjs/toolkit'
//import minefieldReducer from '../reducers/minefieldReducer'

export const store = configureStore({
  reducer: {
    //minefield: minefieldReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
