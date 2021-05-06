import React from 'react'
import { shallowEqual } from 'react-redux'
import { Dashboard } from '../components/Dashboard'
import { Welcome } from '../components/Welcome'
import { AppState } from '../data/store'
import { useAppState } from '../hooks/useForm'
import '../pages/home.scss'

export const Home: React.FC = () => {
  const user = useAppState(
    (state: AppState) => state.authReducer.user, shallowEqual
  )
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