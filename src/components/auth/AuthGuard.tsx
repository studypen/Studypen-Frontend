import { useAppState, useIsLogin } from '../../hooks'
import React, { Component, FC } from 'react'
import { Route, Redirect, RouteComponentProps, useLocation, useRouteMatch, useParams } from 'react-router-dom'

/*
const GuardedRoute = ({componen: React., ...rest}) => {
  const auth = true
  return (
    <Route {...rest} render={(props) => (
      auth
        ? <component {...props} />
        : <Redirect to='/' />
    )} />
  )
}
export default GuardedRoute;
*/


type RouteProps = Route['props']
export const UserRoute:FC<RouteProps> = (props) => {
  const isLogin =  useIsLogin()// useAppState( s => s.main.isLogin)
  const {pathname, search} = useLocation()
  const next = `${pathname ?? ''}${search ?? ''}`

  if (isLogin) return <Route {...props}/>
  return <Redirect to={`/login?next=${next}`}/>
}