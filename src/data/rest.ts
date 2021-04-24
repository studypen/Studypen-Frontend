import axios, { AxiosError, AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import * as actions from './actionTypes'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


export const initUser = async (dispatch: Dispatch<AuthAction>)
  : Promise<void> => {
  const res = await axios.get<User>('/account/user/')
    .catch((res: AxiosError) => res.response?.status === 403)

  if (typeof res === 'boolean') { dispatch({ type: actions.LOG_OUT }) }

  else { dispatch({ type: actions.LOGIN_SUCCESS, payload: res.data }) }
}


export const logout = async (dispatch: Dispatch<AuthAction>): Promise<void> => {
  const res = await axios.get<void>('/account/logout/')
    .catch((res: AxiosError) => res.response?.status === 403)

  if (typeof res !== 'boolean') { dispatch({ type: actions.LOG_OUT }) }
  else { console.error('handel logout failed') }
}


export const login = async (dispatch: Dispatch<AuthAction>,
  username: string, password: string): Promise<AxiosResponse | void> => {
  let error = false
  const res = await axios.post<User>('/account/login/', { username, password })
    .catch((err: AxiosError<User>) => { error = true; return err.response })

  if (error) { return res }
  else if (res !== undefined) {
    dispatch({ type: actions.LOGIN_SUCCESS, payload: res.data })
  }
}

export const registration = async (dispatch: Dispatch<AuthAction>,
  userDetail: UserRegistrationDetail): Promise<AxiosResponse | void> => {
  let error = false
  // check return type
  const res = await axios.post<User>('/account/register/', userDetail)
    .catch((err: AxiosError<User>) => { error = true; return err.response })

  if (error) { return res }
  else if (res !== undefined) {
    dispatch({ type: actions.LOGIN_SUCCESS, payload: res.data })
  }
}


export const getClasses = async (dispatch: Dispatch<ClassAction>): void =>{
  const url = '/classes/list/'
}