import React from 'react'

import './styles.scss'

import SearchBar from '../SearchBar'
import NavBar from '../NavBar'

const Header = () => {
  return (
    <header className='Header'>
      <SearchBar />
      <NavBar />
    </header>
  )
}

export default Header

/*  <input type="text"/>
      <nav>
        <ul>
          <li className='button--main'><a href="#">Tools</a></li>
          <li className='button--main'><a href="#">Projects</a></li>
        </ul>
      </nav>  */
