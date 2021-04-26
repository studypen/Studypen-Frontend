import * as redux from 'redux'
import * as actionTypes from './actionTypes'
import * as constants from './constants'
import { fetchCurrentUser, server } from './rest'
export const authReducer = (
  state: AuthState = {},
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload }

    // TODO:
    case actionTypes.SET_TOKEN:
      const tokens = action.payload as TOKENS
      window.localStorage.setItem(constants.refreshToken, tokens.refresh)
      server.defaults.headers['Authorization'] = `Bearer ${tokens.access}`

      return { ...state, token: tokens.access }
    case actionTypes.SET_CURRENT_USER:
      return { ...state, user: action.payload }

    case actionTypes.UNSET_CURRENT_USER:
      window.localStorage.removeItem(constants.refreshToken)
      return { ...state, user: undefined }
    case actionTypes.TRYING_FETCH_USER:
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
export const reducer = redux.combineReducers({ authReducer, classReducer })