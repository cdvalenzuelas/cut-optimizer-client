import React, { useCallback, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonsPage from './ButtonsPage'
import getShapesAndIndexes from '@Utils/getShapesAndIndexes'
import { getOptimizedBars } from '@Utils/cutOptimizerApi'
import { firebase } from '@Firebase'
import NewShape from '../../NewShape'

const Buttons = ({ readyToSend }) => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const { request, mode, response, request2, projectId, status } = useSelector(state => state.cutOptimizer)

  useEffect(() => {
    dispatch({ type: 'cutOptimizer/SET_REQUEST2' })
  }, [])

  const handleChange = useCallback(e => {
    const { name } = e.target

    if (name === 'edit') {
      dispatch({ type: 'cutOptimizer/SET_MODE', payload: { value: 'input' } })
    } else if (name === 'newShape') {
      dispatch({ type: 'cutOptimizer/CREATE_NEW_SHAPE' })
    } else if (name === 'optimize' && readyToSend) {
      const { request3, indexes } = getShapesAndIndexes(request, request2)

      if (request3.length > 0) {
        const content = {
          data: {
            request,
            mode: 'input',
            response,
            request2: JSON.stringify(request),
            projectId,
            currentShape: request.length === 0 ? -1 : 0,
            newElements: true
          },
          lastModified: firebase.firestore.Timestamp.fromDate(new Date())
        }

        dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })

        console.log(content)

        getOptimizedBars(request3, indexes, response, projectId, content)
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
  }, [JSON.stringify(request), request2, readyToSend])

  return (
    <>
      <ButtonsPage
        handleChange={handleChange}
        mode={mode}
        readyToSend={readyToSend}
        setShowModal={setShowModal}
        status={status}
        diff={request2 !== JSON.stringify(request)}
      />
      {showModal && <NewShape setShowModal={setShowModal} mode='create' />}
    </>
  )
}

export default memo(Buttons)
