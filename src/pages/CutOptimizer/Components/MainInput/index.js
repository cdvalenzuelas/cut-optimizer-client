import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import Actions from './Actions'
import Items from './Items'
import AvailableBars from './AvailableBars'
import './Styles.scss'

const MainInput = () => {
  const { newElements, mode, requestLength } = useSelector(state => {
    const { newElements, mode, request = [] } = state.cutOptimizer
    return { newElements, mode, requestLength: request.length }
  })

  const { loading } = useSelector(state => state.global)

  if (mode === 'input' && requestLength > 0 && !loading) {
    return (
      <main className='Main'>
        <div className='Main-Container'>
          <Settings />
          {newElements ? <Items /> : <AvailableBars />}
          <Actions />
        </div>
      </main>
    )
  } else if (mode === 'input' && requestLength === 0 && !loading) {
    return (
      <main className='Main'>
        Insert
      </main>
    )
  } else if (mode === 'input' && loading) {
    return (
      <main className='Main' style={{ backgroundColor: 'blue' }}>
        <div>Loading...</div>
      </main>
    )
  }
}

export default memo(MainInput)
