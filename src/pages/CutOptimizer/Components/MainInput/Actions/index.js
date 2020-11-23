import React, { useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ActionPage from './ActionsPage'

function Actions () {
  const { newElements } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const handleChange = useCallback(e => {
    const { name } = e.target

    if (name === 'items' && !newElements) {
      dispatch({ type: 'cutOptimizer/CHANGE_NEW_ELEMENTS' })
    } else if (name === 'bars' && newElements) {
      dispatch({ type: 'cutOptimizer/CHANGE_NEW_ELEMENTS' })
    } else if (name === 'delete') {
      dispatch({ type: 'cutOptimizer/DELETE_SHAPE' })
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
