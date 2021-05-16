import React, { Dispatch, useState } from 'react'
import '../Form.scss'
import { registration } from '../../data/rest'
import { InputGroup } from '../InputGroup'

const emptyUserRegistrationDetail: UserRegistrationDetail = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password2: '',
  username: '',
  detail: ''
}

export const Registration: React.FC = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<UserRegistrationDetail>(emptyUserRegistrationDetail)

  const registrationIner = async () => {
    setIsLoading(true)
    const msg = await registration({
      first_name, last_name,
      email, username, password, password2: rePassword
    })
    if (msg !== undefined) {
      setIsLoading(false)
      const data = msg?.data as UserRegistrationDetail
      setErrorMsg({...emptyUserRegistrationDetail})
      for (const key in data) {

        if (key in errorMsg) {
          setErrorMsg({ ...errorMsg, [key as keyof UserRegistrationDetail]: data[key as keyof UserRegistrationDetail] })
        }
      }
    }
  }


  return (<div>
    <form className="form" onSubmit={(e) => { e.preventDefault(); registrationIner() }}>
      <h2> Registration </h2>
      <InputGroup
        label="First Name"
        errMsg={errorMsg.first_name}
        inputArg={{
          placeholder:"Enter your First Name",
          name: 'first_name',
          value: first_name,
          onChange: ({ target }) => setFirstName(target.value),
          type: 'text', required: true
        }} />
      <InputGroup
        label="Last Name"
        errMsg={errorMsg.last_name}
        inputArg={{
          placeholder:"Enter your Last Name",
          name: 'last_name',
          value: last_name,
          onChange: ({ target }) => setLastName(target.value),
          type: 'text', required: true
        }} />
      <InputGroup
        label="Username"
        errMsg={errorMsg.username}
        inputArg={{
          name: 'username',
          placeholder: 'Enter your Username',
          value: username,
          onChange: ({ target }) => setUsername(target.value),
          type: 'text', required: true
        }} />
      <InputGroup
        label="Email"
        errMsg={errorMsg.email}
        inputArg={{
          placeholder: 'Enter your Email',
          name: 'email',
          value: email,
          onChange: ({ target }) => setEmail(target.value),
          type: 'email', required: true
        }} />
      <InputGroup
        label="Password"
        errMsg={errorMsg.password}
        inputArg={{
          name: 'password',
          placeholder: 'Enter your Password',
          value: password,
          onChange: ({ target }) => setPassword(target.value),
          type: 'password', required: true
        }} />
      <InputGroup
        label="Re enter your password"
        errMsg={errorMsg.password2}
        inputArg={{
          name: 'repassword',
          placeholder: 'Re-Enter your Password',
          value: rePassword,
          onChange: ({ target }) => setRePassword(target.value),
          type: 'password', required: true
        }} />

        <div className="input-group"> <p className="error-msg"> {errorMsg.detail ?? ''}</p>  </div>
      {/* <input type="submit" value="Sign Up" /> */}
      <button disabled={isLoading} type="submit">
          Sign Up
          { isLoading ? <div className="loader"> </div> : <></> }
        </button>
    </form>
  </div>)
}