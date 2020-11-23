import React, { memo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Styles.scss'

import SearchBar from './SearchBar'
import NavBar from './NavBar'

const Header = () => {
  const { user } = useSelector(state => state.global)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.replace('/loggin')
    }
  }, [])

  return (
    <header className='Header'>
      <SearchBar />
      <NavBar
        user={user}
      />
    </header>
  )
}

export default memo(Header)
