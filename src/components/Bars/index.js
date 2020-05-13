// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

// Components
import Output from './Output'
import Input from './Input'

// Styles
import './styles.scss'

const Bars = () => {
  const { mode } = useSelector((state) => state.cutOptimizer)

  return (
    <>
      {
        mode === 'output'
          ? <Output />
          : <Input />
      }
    </>)
}

export default Bars
