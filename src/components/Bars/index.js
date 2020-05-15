// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

// Components
import Output from './Output'
import AvailableBars from './AvailableBars'
import NewElements from './NewElements'

// Styles
import './styles.scss'

const Bars = () => {
  const { mode, newElements } = useSelector((state) => state.cutOptimizer)

  if (mode === 'output') {
    return <Output />
  } else if (newElements) {
    return <NewElements />
  } else if (!newElements) {
    return <AvailableBars />
  }
}

export default Bars
