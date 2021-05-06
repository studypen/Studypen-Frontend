import React, { useEffect, useRef, useState } from 'react'
import { Login } from './auth/Login'
import { Registration } from './auth/Registration'
import './Welcome.scss'
import { EntryContainer } from '../utils/EntryContainer'



export const Welcome: React.FC = () => {

  const [whichFrom, setWhichForm] = useState<'login' | 'signup'>('login')
  const [formHeight, setFormHeight] = useState<undefined | number>(undefined)

  const [wcLoginForm, wcSignupForm] = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const resizeObserver = new ResizeObserver(([{contentRect}]) =>{
      if(contentRect.height !== 0)
      setFormHeight(contentRect.height)
    })

  useEffect(() => {
    if (!(wcLoginForm.current && wcSignupForm.current)) return
    if (whichFrom === 'login')
      resizeObserver.observe(wcLoginForm.current)

    else if (whichFrom === 'signup')
      resizeObserver.observe(wcSignupForm.current)

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