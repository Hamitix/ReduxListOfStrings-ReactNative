import { createReducer } from '@reduxjs/toolkit'

import { addElement, removeElement, reset } from './reducerActions'

const initialState: InitialState = {
  elements: [],
}

const elementsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addElement, (state, action) => {
      return { ...state, elements: [...state.elements, action.payload.value] }
    })
    .addCase(removeElement, (state, action) => {
      return { ...state, elements: state.elements.filter((element) => element !== action.payload.value) }
    })
    .addCase(reset, () => {
      return initialState
    }),
)

export default elementsReducer
