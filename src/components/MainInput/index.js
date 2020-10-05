import React from 'react'
import { useSelector } from 'react-redux'

import './styles.scss'

import SettingsContainer from './SettingsContainer'
import ActionContainer from './ActionContainer'
import Content from './Content'

const MainInput = () => {
  return (
    <main className='Main'>
      <div className='Main-Container'>
        <SettingsContainer />
        <Content />
        <ActionContainer />
      </div>
    </main>
  )
}

export default MainInput
