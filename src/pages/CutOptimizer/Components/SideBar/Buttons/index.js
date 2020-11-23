import React, { useCallback, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonsPage from './ButtonsPage'
import getShapesAndIndexes from '@Utils/getShapesAndIndexes'
import { getOptimizedBars } from '@Utils/cutOptimizerApi'
import { updateDocumentById } from '@Firebase/cutOptimizer'
import { firebase } from '@Firebase'

const Buttons = () => {
  const dispatch = useDispatch()
  const { request, mode, response, readyToSend, request2, projectId } = useSelector(state => state.cutOptimizer)

  useEffect(() => {
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })

    const content = {
      data: {
        request,
        mode,
        response,
        readyToSend,
        request2,
        projectId,
        currentShape: 0,
        newElements: true
      },
      lastModified: firebase.firestore.Timestamp.fromDate(new Date())
    }

    projectId && updateDocumentById('projects', projectId, content)
      .then(data => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
      })
      .catch(err => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
      })
  }, [JSON.stringify(response)])

  const handleChange = useCallback(e => {
    const { name } = e.target

    if (name === 'edit') {
      dispatch({ type: 'cutOptimizer/SET_MODE', payload: { value: 'input' } })
    } else if (name === 'newShape') {
      dispatch({ type: 'cutOptimizer/CREATE_NEW_SHAPE' })
    } else if (name === 'optimize' && readyToSend) {
      const { request3, indexes } = getShapesAndIndexes(request, request2)
      if (request3.length > 0) {
        console.log('me estoy optimizando')
        dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })

        getOptimizedBars(request3, indexes, response)
          .then(({ data }) => {
            dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
            dispatch({ type: 'cutOptimizer/OPTIMIZE', payload: { value: data } })
          })
          .catch(err => {
            dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
            dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
          })
      } else {
        dispatch({ type: 'cutOptimizer/SET_MODE', payload: { value: 'output' } })
      }
    }
  }, [request, request2, readyToSend])

  return (
    <ButtonsPage
      handleChange={handleChange}
      mode={mode}
      readyToSend={readyToSend}
    />
  )
}

export default memo(Buttons)
