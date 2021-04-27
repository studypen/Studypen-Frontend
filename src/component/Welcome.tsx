import React, { useEffect } from 'react'
import { Login } from './Login'
import { Registration } from './Registration'
import './Welcome.scss'





export const Welcome: React.FC = () => {
  useEffect(() => {
    //TODO disappear nav bar

    return () => {
      //TODO reappear nav bar

    }
  }, [])

  
  return <div className="wc">
    <div className="wc__hero">
      <p className="wc__slogan">
        Here you can mange your classes easily
      </p>
      <p className="wc__main">
        For <strong>Students</strong> by <strong> Students</strong>
      </p>
    </div>
    <div className="wc__login">
      <Login />
    </div>
    <div className="wc__signup">
      <Registration />
    </div>
  </div>
}