import React from 'react'
import { render } from 'react-dom'

import '@Styles/main.scss'

import App from './components/App'

const container = document.getElementById('root')

console.disableYellowBox = true

render(<App />, container)
