import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OutputBar from './OutpuBar'
import { getNewStoreBars } from '@Utils/cutOptimizerApi'
import { useHistory } from 'react-router-dom'

function MainOutput () {
  const history = useHistory()
  const dispatch = useDispatch()
  const { bars, response, request, uid, serverAvailableBars, status, projectId } = useSelector(state => {
    const { currentShape, response = [], request, serverAvailableBars, status, projectId } = state.cutOptimizer
    const { uid } = state.global.user

    return {
      bars: response.length === 0 ? [] : response[currentShape].bars,
      response,
      request,
      uid,
      serverAvailableBars,
      status,
      projectId
    }
  })

  const handleClick = useCallback(e => {
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
    getNewStoreBars(uid, request, response, serverAvailableBars, projectId)
      .then(data => {
        dispatch({ type: 'cutOptimizer/UPDATE_SERVER_AVAILABLEBARS', payload: data })
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        history.replace('/projects')
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
      {status === 'active' && <button className='btn-primary btn-right-bottom' onClick={handleClick}>Save</button>}
    </main>
  )
}

export default memo(MainOutput)
