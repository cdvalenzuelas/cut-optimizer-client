import React from 'react'
import Shapes from './Shapes'
import Buttons from './Buttons'
import './styles.scss'

const SideBar = () => {
  return (
    <aside className='SideBar'>
      <h2 className='SideBar-Title'>Shapes</h2>
      <Shapes />
      <Buttons />
    </aside>
  )
}

export default SideBar
