import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OutputBar from './OutpuBar'
import { getNewStoreBars } from '@Utils/cutOptimizerApi'

function MainOutput () {
  const dispatch = useDispatch()
  const { bars, response, request, uid, serverAvailableBars } = useSelector(state => {
    const { currentShape, response, request, serverAvailableBars } = state.cutOptimizer
    const { uid } = state.global.user

    return {
      bars: response.length === 0 ? [] : response[currentShape].bars,
      response,
      request,
      uid,
      serverAvailableBars
    }
  })

  const handleClick = useCallback(e => {
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
    getNewStoreBars(uid, request, response, serverAvailableBars)
      .then(data => {
        dispatch({ type: 'cutOptimizer/UPDATE_SERVER_AVAILABLEBARS', payload: data })
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
      })
      .catch(err => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
      })
  }, [Object.assign(response)])

  return (
    <main className='Main'>
      {bars.map((item, index) => {
        const { quantity, percentage, availableLength, length, elements, type } = item
        return (
          <OutputBar
            key={index}
            quantity={quantity}
            percentage={percentage}
            availableLength={availableLength}
            length={length}
            elements={elements}
            type={type}
          />)
      })}
      <button className='btn-primary btn-right-bottom' onClick={handleClick}>Save</button>
    </main>
  )
}

export default memo(MainOutput)
