import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { logout } from '../data/rest'
import { AppState } from '../data/store'
import { useAppState } from '../hooks/useForm'
import './Nav.scss'



export const Nav: React.FC = () => {
  const user = useAppState(
    (state: AppState) => state.authReducer.user, shallowEqual
  )
  const dispatch = useDispatch<Dispatch<AuthAction>>()


  return (<nav>
    <h1>Study Pen</h1>
    <div className="user">
      {user === undefined ?
        (<div>
          <button>
            Login
          </button>
          <button>
            SignUp
          </button>
        </div>)
        : (<button onClick={() => logout(dispatch)}>
          Logout
        </button>)
      }
    </div>
  </nav>)
}