import React, { Dispatch, FormEvent, FormEventHandler, useState } from 'react'
import axios from 'axios'
import './Form.scss'
import { useDispatch } from 'react-redux'
import { login } from '../data/rest'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const Login: React.FC = () => {
const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch: Dispatch<AuthAction> = useDispatch()

  const loginIner = async () => {
    // somthing
    setDisabled(true)
    const msg = await login(dispatch, username, password)
    if (msg !== undefined)
      {setErrorMsg(msg?.data?.detail ?? '')}
    else {setErrorMsg('')}
    setDisabled(false)
  }


  return (<div>
    <form onSubmit={(e) => { e.preventDefault(); loginIner() }}>
      <h2>Login</h2>
      <label className="input-group">
        <p>Username</p>
        <input name="username" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} type="text" required />
      </label>
      <label className="input-group">
        <p>Password</p>
        <input name="password" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)} type="password" required />
      </label>
      <div>
        <div className="input-group"> <p className="error-msg"> {errorMsg}</p>  </div>
        <input disabled={disabled} type="submit" value="Submit" />
      </div>
    </form>
  </div>)
}