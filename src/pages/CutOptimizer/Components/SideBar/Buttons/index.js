import React, { useCallback, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonsPage from './ButtonsPage'
import getShapesAndIndexes from '@Utils/getShapesAndIndexes'
import { getOptimizedBars } from '@Utils/cutOptimizerApi'
import { updateDocumentById } from '@Firebase/cutOptimizer'
import { firebase } from '@Firebase'
import NewShape from '../../NewShape'

const Buttons = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [upload, setUpload] = useState(false)
  const { request, mode, response, readyToSend, request2, projectId } = useSelector(state => state.cutOptimizer)

  useEffect(() => {
    dispatch({ type: 'cutOptimizer/SET_REQUEST2' })
  }, [])

  useEffect(() => {
    if (upload) {
      dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
      console.log('Estoy subiendo el proyecto a firebase')

      const content = {
        data: {
          request,
          mode: 'input',
          response,
          readyToSend,
          request2: JSON.stringify(request),
          projectId,
          currentShape: request.length === 0 ? -1 : 0,
          newElements: true
        },
        lastModified: firebase.firestore.Timestamp.fromDate(new Date())
      }

      projectId && updateDocumentById('projects', projectId, content)
        .then(data => {
          dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
          setUpload(false)
        })
        .catch(err => {
          dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
          dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
          setUpload(false)
        })
    }
  }, [String(upload)])

  const handleChange = useCallback(e => {
    const { name } = e.target

    if (name === 'edit') {
      dispatch({ type: 'cutOptimizer/SET_MODE', payload: { value: 'input' } })
    } else if (name === 'newShape') {
      dispatch({ type: 'cutOptimizer/CREATE_NEW_SHAPE' })
    } else if (name === 'optimize' && readyToSend) {
      const { request3, indexes } = getShapesAndIndexes(request, request2)

      console.log(request3)

      if (request3.length > 0) {
        console.log('me estoy optimizando')
        dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })

        getOptimizedBars(request3, indexes, response)
          .then(({ data }) => {
            dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
            dispatch({ type: 'cutOptimizer/OPTIMIZE', payload: { value: data } })
            setUpload(true)
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
    <>
      <ButtonsPage
        handleChange={handleChange}
        mode={mode}
        readyToSend={readyToSend}
        setShowModal={setShowModal}
      />
      { showModal && <NewShape setShowModal={setShowModal} mode={'create'} /> }
    </>
  )
}

export default memo(Buttons)
