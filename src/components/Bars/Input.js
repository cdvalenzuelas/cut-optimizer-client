// Dependencies
import React from 'react'
import useInputHook from './useInputHook'
import NewElements from './NewElements'
import AvailableBars from './AvailableBars'
import './styles.scss'

const Input = () => {
  const { newElements } = useInputHook()
  console.log(newElements)
  return newElements ? <NewElements /> : <AvailableBars />
}

export default Input
