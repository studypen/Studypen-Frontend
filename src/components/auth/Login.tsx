import React, { FC, Dispatch, useState } from 'react'
import '../../components/Form.scss'
import { login } from '../../data/rest'
import { InputGroup } from '../../components/InputGroup'
import '../../components/Loading.scss'

export const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState({ username: '', password: '', general: '' })
  const [isLoading, setIsLoading] = useState(false)

  const loginIner = async () => {
    setIsLoading(true)
    const msg = await login(username, password)
    if (msg !== undefined) {
      setErrorMsg({ ...errorMsg, general: msg?.data?.detail ?? '' })
      setIsLoading(false)
    }
  }


  return (<div>
    <form id="login-form" onSubmit={(e) => { e.preventDefault(); loginIner() }}>
      <h2>Login</h2>
      <InputGroup
        label="Username"
        errMsg={errorMsg.username}
        inputArg={{
          placeholder: 'Enter your Username',
          name: 'username',
          value: username,
          onChange: ({ target }) => setUsername(target.value),
          type: 'text', required: true
        }} />
      <InputGroup
        label="Password"
        errMsg={errorMsg.password}
        inputArg={{
          placeholder: 'Enter your Password',
          name: 'password',
          value: password,
          onChange: ({ target }) => setPassword(target.value),
          type: 'password', required: true
        }} />

      <div>
        <div className="input-group"> <p className="error-msg"> {errorMsg.general}</p>  </div>
        {/* <input disabled={isLoading} type="submit" value="Log in" /> */}
        <button disabled={isLoading} type="submit">
          Log ina
          { isLoading ? <div className="loader"> </div> : <></> }
        </button>
      </div>
    </form>
  </div>)
}