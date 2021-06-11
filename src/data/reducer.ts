import { TimeSchedule } from '@components/classes/TimeSchedule'
import * as redux from 'redux'
import * as actionTypes from './actionTypes'
import * as constants from './constants'
import { server } from './rest'


const initMainState: MainState = {
  isLogin: false,
  isLoading: true
}

export const mainReducer =
  (state: MainState = initMainState, action: MainAction): MainState => {
    switch (action.type) {
      case actionTypes.LOGIN_SUCCESS:
      case actionTypes.SET_CURRENT_USER:
        return { ...state, isLoading: false, isLogin: true };
      case actionTypes.TRYING_FETCH_USER:
        return { ...state, isLoading: true, isLogin: false };
      case actionTypes.TRYING_FETCH_USER_FAILED:
      case actionTypes.LOGIN_FAILED:
      case actionTypes.UNSET_CURRENT_USER:
        return { ...state, isLoading: false, isLogin: false };
      default:
        return state
    }
  }


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
      server.defaults.headers['Authorization'] = ''
      return { ...state, user: undefined }
    case actionTypes.TRYING_FETCH_USER:
    // TODO:
    default:
      return state
  }
}

export const classReducer = (
  state: ClassState = { isLoaded: false, isLoading: false},
  action: ClassAction
): ClassState => {
  switch (action.type) {
    case actionTypes.CLASSES_LOADING:
      return { ...state, isLoading: true }
    case actionTypes.CLASSES_LOAD_FAIL:
      return { ...state, isLoading: false, isLoaded: false}
    case actionTypes.CLASSES_LOADED:
      return { ...state, isLoading: false, isLoaded: true, classes: action.payload , timeSchedule: {}}
    case actionTypes.CLASSES_CREATED:
      if (state.isLoaded)
        return { ...state, classes: [...state.classes, action.payload] }

      return { ...state, classes: [action.payload] }
    case actionTypes.SCHEDULE_FETCH:
      if(state.isLoaded)
      return {
        ...state,
        timeSchedule: {
          ...state.timeSchedule,
          ...action.payload
        }
      }

    case actionTypes.SCHEDULE_CREATED:
      if(state.isLoaded)
      return {
        ...state,
        timeSchedule: {
          ...state.timeSchedule,
          [action.payload.classes]: [...state.timeSchedule[action.payload.classes], action.payload]
        }
      }

    default:
      return state
  }
}
export const reducer = redux.combineReducers({ auth: authReducer, classState: classReducer, main: mainReducer })