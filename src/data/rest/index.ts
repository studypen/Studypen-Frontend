import axios, { AxiosError, AxiosResponse } from 'axios'
import * as actions from '../actionTypes'
import { store } from '../store'
import * as constants from '../constants'
import { isDev } from '@utils/tools'
import { ClassInfo, ClassSchedule } from '@components/Dashboard'
// console.log(store);

export const server = axios.create({
  baseURL: isDev ? `http://${window.location.hostname}:8000` : `https://backend.studypen.in`,
  timeout: isDev ? undefined : 5000,
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
/**
 * TODO: {
           "detail": "Given token not valid for any token type",
            "code": "token_not_valid",
            "messages": [
                {
                    "token_class": "AccessToken",
                    "token_type": "access",
                    "message": "Token is invalid or expired"
                }
            ],
            "status_code": 403
        }
*/

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

export const getClassInviteId = async (id: string) => {
  // http://localhost:8000/classes/invite/?c=VoAnCU9a
  // { "invite_id": "1QFfJ98s" }
  try {

    const res = await server.get<{ invite_id: string }>('/classes/invite/', {
      params: { c: id }
    })
    return res.data.invite_id
  } catch (error) {
    // TODO: don't show error msg
    return `error: ${error}`
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

export const initState = async (): Promise<void> => {
  const isAccess = await getAccessToken()
  if (isAccess) fetchCurrentUser() // don't need to await
  else store.dispatch({ type: actions.TRYING_FETCH_USER_FAILED })
}


export const logout = async (): Promise<void> => {
  const res = await server.get<void>('/account/logout/')
    .catch((res: AxiosError) => res.response?.status === 403)

  if (typeof res !== 'boolean') { store.dispatch({ type: actions.UNSET_CURRENT_USER }) }
  else { console.error('handel logout failed') }
  // TODO: clear memory
}

export const setUserToken = (tokens: TOKENS) => {
  store.dispatch({ type: actions.SET_TOKEN, payload: tokens })
  store.dispatch({ type: actions.SET_CURRENT_USER, payload: tokens.user })
}
export const login = async (username: string, password: string): Promise<AxiosResponse | string | void > => {
  try{
    const res = await server.post<TOKENS>('/account/token/', { username, password })
    setUserToken(res.data)
    getClasses()
  }catch(err){
    return err.response ?? err.message
  }
}

export const registration = async (userDetail: UserRegistrationDetail): Promise<AxiosResponse | void> => {
  let error = false
  // check return type
  const res = await server.post<TOKENS>('/account/register/', userDetail)
    .catch((err: AxiosError<TOKENS>) => { error = true; return err.response })

  if (error) { return res }
  else if (res !== undefined) setUserToken(res.data)
}

export const createClass = async (classInfo: ClassInfo): Promise<ClassInfo | void> => {
  const url = '/classes/'

  const res = await server.post<Classes>(url, classInfo)
  if (res.status === 201)
    store.dispatch({
      type: actions.CLASSES_CREATED,
      payload: res.data
    })
  // TODO: handel errors
  return res.data

}

export const getClasses = async (): Promise<void> => {
  const url = '/classes/'

  store.dispatch({ type: actions.CLASSES_LOADING })

  const res = await server.get<Classes[]>(url)
  store.dispatch({
    type: actions.CLASSES_LOADED,
    payload: res.data
  })
  // TODO: handle errors
}


export const getClassMessages = async (clsId: string) => {
  // /message/class/?c=_4i0HNGm
  try {

    const res = await server.get<ClassMessage[]>('/message/class/', {
      params: { c: clsId }
    })
    // TODO: save in state
    return res.data
  } catch (error) {
    // TODO: don't show error msg
    return `error: ${error}`
  }


}

export const createScheduleClass = (data: ClassSchedule) => {
  throw new Error('Function not implemented.')
}
