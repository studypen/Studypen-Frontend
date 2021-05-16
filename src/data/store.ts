import { reducer } from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import { initState } from './rest'
export const store = configureStore({  reducer })
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//createStore(reducer)

initState()