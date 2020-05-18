// Dependencies
import { createStore, combineReducers, compose } from 'redux'

// Reducers
import cutOptimizer from './reducers/cutOptimizer'

// CombineReducers
const reducer = combineReducers({
  cutOptimizer
})

let reduxDev

if (!process.NODE_ENV) {
  reduxDev = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const GLOBAL_STATE = window.localStorage.getItem('GLOBAL_STATE')
const INITIAL_STATE = GLOBAL_STATE ? JSON.parse(GLOBAL_STATE) : {}

const store = createStore(reducer, {}, reduxDev())

export default store
