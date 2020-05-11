//Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

// Components
import Output from './Outpus'
import Input from './Input'

// Styles
import './styles.scss'

const Bars = () => {  
  const mode = useSelector(state => state.cutOptimizer.mode) 

  return(
    <>
      { mode === 'output' ? <Output /> : <Input  /> }
    </>
  )
}

export default Bars

