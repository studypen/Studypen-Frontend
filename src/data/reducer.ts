import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

export const authReducer = (
    state:AuthState = {},
    action: AuthAction
   ): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload }

    case actionTypes.LOG_OUT:
      return { ...state, user: undefined }
    // TODO:
    default:
      return state
  }
}

export const classReducer = (
    state: ClassState = {},
    action: ClassAction
  ): ClassState => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILED:
      return { ...state }

    default:
      return state
  }
}
export const reducer = combineReducers({ authReducer, classReducer })