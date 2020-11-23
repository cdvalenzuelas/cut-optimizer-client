import React, { memo } from 'react'
import TextInput from '@Components/TextInput'
import { signInWithGoogle } from '@Firebase/global'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = e => {
    e.preventDefault()
    const { name } = e.target
    if (name === 'logginGoogle') {
      dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
      signInWithGoogle()
        .then(user => {
          if (user) {
            dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
            dispatch({ type: 'global/SET_USER', payload: { user } })
            history.replace('/')
          } else {
            dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
            dispatch({ type: 'global/SET_ERROR', payload: { error: 'LOGIN ERROR' } })
          }
        })
    }
  }

  return (
    <div className='Main'>
      <form className='Form'>
        <TextInput
          label='E-mail'
          placeholder=''
          name='email'
        />
        <TextInput
          label='Password'
          placeholder=''
          name='password'
        />
        <button className='btn-primary' name='logginEmail'onClick={handleChange}>Login</button>
        <button className='btn-primary' name='logginGoogle' onClick={handleChange}>Login with Google</button>
      </form>
    </div>
  )
}

export default memo(Login)
