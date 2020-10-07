import React from 'react'
import { useSelector } from 'react-redux'

import './styles.scss'

import SettingsContainer from './SettingsContainer'
import ActionContainer from './ActionContainer'
import Items from './Items'
import AvailableBars from './AvailableBars'

const MainInput = () => {
  const { newElements } = useSelector(state => state.cutOptimizer)

  return (
    <main className='Main'>
      <div className='Main-Container'>
        <SettingsContainer />
        {newElements ? <Items /> : <AvailableBars />}
        <ActionContainer />
      </div>
    </main>
  )
}

export default MainInput
