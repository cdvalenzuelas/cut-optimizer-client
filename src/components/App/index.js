// Dependencies
import React, { useEffect } from 'react'
import store from '@Redux/store'
import { Provider } from 'react-redux'
import Routes from './Routes'

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
      <Routes />
    </Provider>
  )
}

export default App
