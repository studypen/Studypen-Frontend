import React, { useEffect, useRef, useState } from 'react'
import { Login } from './Login'
import { Registration } from './Registration'
import './Welcome.scss'
import { EntryContainer } from '../utils/EntryContainer'





export const Welcome: React.FC = () => {

  const [whichFrom, setWhichForm] = useState<'login' | 'signup'>('login')
  const [formHeight, setFormHeight] = useState<undefined | number>(undefined)

  const [wcLoginForm, wcSignupForm] = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  useEffect(() => {
    if (whichFrom === 'login')
      wcLoginForm.current && setFormHeight(wcLoginForm.current.offsetHeight)
    else if (whichFrom === 'signup')
      wcSignupForm.current && setFormHeight(wcSignupForm.current.offsetHeight)

  }, [whichFrom])


  return <div className="wc">
    <div className="wc__hero">
      <p className="wc__slogan">
        Here you can mange your classes easily
      </p>
      <p className="wc__main">
        For <strong>Students</strong> by <strong> Students</strong>
      </p>
    </div>
    <div className="wc__form" style={{ height: formHeight }}>
        <EntryContainer
          in={whichFrom === 'login'}
          timeout={500}
          unmountOnExit
          className="wc__form-transition"
        >

          <div ref={wcLoginForm} className="wc__login">
            <Login />

            <div className="wc__form-btn">
              Have no account
              <button onClick={() => setWhichForm('signup')}>Sign up</button>
            </div>
          </div>
        </EntryContainer>
        <EntryContainer
          in={whichFrom === 'signup'}
          unmountOnExit
          timeout={500}
          classNames="wc__form-transition"
        >
          <div ref={wcSignupForm} className="wc__signup"> <Registration />
            <div className="wc__form-btn">
              Already have account
            <button onClick={() => setWhichForm('login')}>Log in</button>
            </div>
          </div>
        </EntryContainer>
    </div>
  </div>
}