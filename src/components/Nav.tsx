import React, { FC, useState } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { logout } from '../data/rest'
import { AppState } from '../data/store'
import { useAppState } from '../hooks'
import './Nav.scss'

const NavSearchBar: FC = () => {
  return <div id="search-bar">
    🔎
    <input type="search" name="search" id="search" />
  </div>
}
const Dropdown: FC<{ icon: string }> = ({ icon, children }) => {
  const [isShow, setIsShow] = useState(false)

  return <div className={`dropdown ${isShow ? 'show' : ''}`}>

    <a onClick={() => setIsShow(!isShow)} href={`#${icon}`} className="icon">{icon}</a>
    <DropdownItems>{children}</DropdownItems>

  </div>

}

const DropdownItems: FC = ({ children }) => {
  return <div className="dropdown_items">
    {children}
  </div>
}


export const Nav: React.FC = () => {
  const user = useAppState(
    (state: AppState) => state.auth.user, shallowEqual
  )

  const isLogin = user !== undefined
  return (<nav>
    <h1>Study Pen</h1>
    { isLogin
      ? <>
        <NavSearchBar />
        <div className="actions">
          <Dropdown icon="🔔"> </Dropdown>
          <Dropdown icon="🤵">
            <button> Profile </button>
            <button onClick={() => logout()}>
              Logout
      </button>
          </Dropdown>
        </div>
      </>
      : ''}
  </nav>)
}