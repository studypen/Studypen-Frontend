import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Dashboard, TimeLine as TimeLine } from '../component/Dashboard'
import { Welcome } from '../component/Welcome'
import { AppState } from '../data/store'
import { useAppState } from '../hooks/useForm'


export const Home: React.FC = () => {
  const user = useAppState(
    (state: AppState) => state.authReducer.user, shallowEqual
  )
  console.log(user)
  return (
    <section className="home">
      {
        user === undefined
          ? <Welcome />
          : <Dashboard />
      }
    </section>
  )
}