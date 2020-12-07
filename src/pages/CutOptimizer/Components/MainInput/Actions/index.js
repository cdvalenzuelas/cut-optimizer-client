import React, { useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ActionPage from './ActionsPage'

function Actions () {
  const { newElements, availableBarsId } = useSelector(state => {
    const { newElements, currentShape, request = [], serverAvailableBars = [] } = state.cutOptimizer
    const { shapeName, material } = request[currentShape] || []
    const { availableBarsId } = serverAvailableBars.filter(item => item.name === shapeName && item.material === material)[0] || 'id'
    return { newElements, availableBarsId }
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = useCallback(e => {
    const { name } = e.target

    if (name === 'items') {
      dispatch({ type: 'cutOptimizer/CHANGE_NEW_ELEMENTS' })
    } else if (name === 'bars') {
      dispatch({ type: 'cutOptimizer/CHANGE_NEW_ELEMENTS' })
    } else if (name === 'edit') {
      history.push(`/cutOptimizer/bars_store/${availableBarsId}`)
    }
  }, [newElements])

  return (
    <ActionPage
      handleChange={handleChange}
      newElements={newElements}
    />
  )
}

export default memo(Actions)
