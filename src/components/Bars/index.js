//Dependencies
import React from 'react'

// Components
import Output from './Outpus'
import Input from './Input'

// Styles
import './styles.scss'

const Bars = ({item, display, mode, handleClick, index}) => {  
  if(mode === 'output'){
    return <Output item={item} display={display} />
  } else {
    return <Input item={item} display={display} index={index} handleClick={handleClick}/>
  }
}

export default Bars