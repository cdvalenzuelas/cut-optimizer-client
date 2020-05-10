// Dependencies
import React from 'react'
import store from '../../redux/store'
import { Provider } from 'react-redux'

// Pages
import CutOptimizer from '../../pages/CutOptimizer'

const App = () => {   
  return(
    <Provider store={store}>
      <CutOptimizer />
    </Provider>
  ) 
}

export default App