import React, { memo, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import BarsStore from './SubPages/BarsStore'
import Optimizer from './SubPages/Optimizer'
import Home from './SubPages/Home'
import EditAvailableBar from './SubPages/EditAvailableBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAvailableBarsByUser } from '@Firebase/cutOptimizer'

function CutOptimizer () {
  const dispatch = useDispatch()
  const { user: { uid } } = useSelector(state => state.global)

  useEffect(() => {
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })

    getAvailableBarsByUser(uid)
      .then(data => {
        dispatch({ type: 'cutOptimizer/SET_SERVER_AVAILABLEBARS', payload: { serverAvailableBars: data } })
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
      }).catch(err => {
        dispatch({ type: 'global/SET_ERROR', payload: { error: 'GET AVAILABLE BARS ERROR' } })
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
      })

    return () => dispatch({ type: 'cutOptimizer/CREATE_NEW_PROJECT', payload: { value: '' } })
  }, [])

  return (
    <Switch>
      <Route exact path='/cutOptimizer/' sensitive={false} component={Home} />
      <Route exact path='/cutOptimizer/bars_store' sensitive={false} component={BarsStore} />
      <Route exact path='/cutOptimizer/bars_store/:availableBarsId' sensitive={false} component={EditAvailableBar} />
      <Route sensitive={false} component={Optimizer} />
    </Switch>
  )
}

export default memo(CutOptimizer)
