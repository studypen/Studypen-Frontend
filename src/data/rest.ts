import axios, { AxiosError, AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import * as actions from './actionTypes'
import { store } from './store'
import * as constants from './constants'
import { isDev } from '../utils/tools'
// console.log(store);

export const server = axios.create({
  baseURL: isDev ? `http://${window.location.hostname}:8000` : `https://backend.studypen.in`,
  timeout: 1000,
  // xsrfCookieName: 'csrftoken',
  // xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Access-Control-Allow-Origin': `*`,
    'Authorization': ``
  }
  ,
  // withCredentials: true
})
// const csrfCooke = async() => {
  // const res = server.get('/cors/')
  // console.log(res)
// }
// csrfCooke()

// fetch(`http://${window.location.hostname}:8000/account/token/`, {
//   mode: 'no-cors',method:'POST',
//   headers: {
//     'Access-Control-Allow-Origin': `${window.location.hostname}:8000`
//   },
//  body:JSON.stringify({
//   username: 'Kamren',
//   password: 'somethingNew'
//  })
// }).then(res => res.json()).then(console.log).catch(console.error);


export const fetchCurrentUser = async (): Promise<void> => {
  store.dispatch({ type: actions.TRYING_FETCH_USER })

  const res = await server.get<User>('/account/user/')
    .catch((res: AxiosError) => res.response?.status === 403)

  if (typeof res === 'boolean') { store.dispatch({ type: actions.UNSET_CURRENT_USER }) }

  else {
    getClasses()
    store.dispatch({ type: actions.SET_CURRENT_USER, payload: res.data })
  }
}

export const getAccessToken = async (): Promise<boolean> => {
  const refreshToken = window.localStorage.getItem(constants.refreshToken)
  if (!refreshToken) return false
  try {

    const res = await server.post<{ access: string }>('/account/token/refresh/', {
      refresh: refreshToken
    })
    store.dispatch({ type: actions.SET_TOKEN, payload: { access: res.data.access, refresh: refreshToken } })
    return true
  } catch (err) {
    return false
  }
  // TODO: handel error
}

export const initUser = async () : Promise<void> => {
  const isAccess = await getAccessToken()
  if (isAccess) fetchCurrentUser() // don't need to await
}


export const logout = async (dispatch: Dispatch<AuthAction>): Promise<void> => {
  const res = await server.get<void>('/account/logout/')
    .catch((res: AxiosError) => res.response?.status === 403)

  if (typeof res !== 'boolean') { dispatch({ type: actions.UNSET_CURRENT_USER }) }
  else { console.error('handel logout failed') }
}

export const setUserToken = (tokens: TOKENS) => {
  store.dispatch({ type: actions.SET_TOKEN, payload: tokens})
  store.dispatch({ type: actions.SET_CURRENT_USER, payload: tokens.user })
}
export const login = async (username: string, password: string): Promise<AxiosResponse | void> => {
  let error = false
  const res = await server.post<TOKENS>('/account/token/', { username, password })
    .catch((err: AxiosError<TOKENS>) => { error = true; return err.response })
  if (error) { return res }

  else if (res !== undefined) setUserToken(res.data)
}

export const registration = async (userDetail: UserRegistrationDetail): Promise<AxiosResponse | void> => {
  let error = false
  // check return type
  const res = await server.post<TOKENS>('/account/register/', userDetail)
    .catch((err: AxiosError<TOKENS>) => { error = true; return err.response })

  if (error) { return res }
  else if (res !== undefined) setUserToken(res.data)
}


export const getClasses = async (): Promise<void> => {
  const url = '/classes/list/'

  store.dispatch({type:actions.CLASSES_LOADING})

  const res = await server.get<Classes[]>(url)
  store.dispatch({
    type: actions.CLASSES_LOADED,
    payload: res.data
  })

}