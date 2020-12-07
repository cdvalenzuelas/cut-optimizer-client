import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import Actions from './Actions'
import Items from './Items'
import AvailableBars from './AvailableBars'
import './Styles.scss'

const MainInput = () => {
  const { newElements, mode, requestLength, loading, useAvailableBars } = useSelector(state => {
    const { loading } = state.global
    const { newElements, mode, request = [], currentShape } = state.cutOptimizer
    const { useAvailableBars } = request[currentShape]
    return { newElements, mode, requestLength: request.length, loading, useAvailableBars }
  })

  if (mode === 'input' && requestLength > 0 && !loading) {
    return (
      <main className='Main'>
        <div className='Main-Container'>
          {newElements ? <Items /> : <AvailableBars />}
          {useAvailableBars && <Actions />}
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
