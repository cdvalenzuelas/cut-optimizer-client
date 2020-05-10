import React from 'react'

import './styles.scss'

const Header = ({}) => {
  return(
    <header className="header">      
      <input type="text"/>
      <nav>
        <ul>
          <li className='button--main'><a href="#">Tools</a></li>
          <li className='button--main'><a href="#">Projects</a></li>
        </ul>
      </nav>      
    </header>
  )
}

export default Header