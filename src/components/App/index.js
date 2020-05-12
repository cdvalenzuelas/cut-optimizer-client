// Dependencies
import React, { useEffect } from 'react'
import store from '../../redux/store'
import { Provider } from 'react-redux'

// Pages
import CutOptimizer from '../../pages/CutOptimizer'

const App = () => {
  useEffect(() => {
    window.addEventListener('unload', () =>
      window.localStorage.setItem(
        'GLOBAL_STATE',
        JSON.stringify(store.getState())
      )
    )
    return () => window.removeEventListener('unload')
  }, [])

  return (
    <Provider store={store}>
      <CutOptimizer />
    </Provider>
  )
}

export default App
