// Dependencies
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

// Reducers
import cutOptimizer from './reducers/cutOptimizer'

// CombineReducers
const reducer = combineReducers({
  cutOptimizer
})

let reduxDev

if(!process.NODE_ENV){
  reduxDev = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  
}

const store = createStore(reducer, {}, reduxDev())

export default store