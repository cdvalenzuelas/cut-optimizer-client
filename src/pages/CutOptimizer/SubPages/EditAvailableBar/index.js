import React, { memo, useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { updateDocumentById } from '@Firebase/cutOptimizer'
import EditAvailableBarPage from './EditAvailableBarPage'

const EditAvailableBar = () => {
  const { availableBarsId } = useParams()
  const [toSend, setToSend] = useState('')
  const [tableState, setTableState] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()

  const availableBar = useSelector(state => {
    return state.cutOptimizer.serverAvailableBars.filter(item => item.availableBarsId === availableBarsId)[0].data
  })

  const getState = useCallback(state => {
    setTableState(state)
  }, [])

  const toggleTosend = useCallback(() => {
    setToSend(!toSend)
  }, [String(toSend)])

  useEffect(() => {
    if (toSend !== '') {
      dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
      updateDocumentById('availableBars', availableBarsId, { data: tableState.data })
        .then(data => {
          dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
          history.goBack()
        })
        .catch(err => {
          dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
          dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
          history.goBack()
        })
    }
  }, [String(toSend)])

  return <EditAvailableBarPage
    availableBar={availableBar}
    getState={getState}
    toSend={toSend}
    toggleTosend={toggleTosend}
  />
}

export default memo(EditAvailableBar)
