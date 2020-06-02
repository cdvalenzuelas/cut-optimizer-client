import React from 'react'
import useNewElementsHook from './useNewElementsHook'
import ListOfElements from './ListOfElements'
import ShapeInfo from './ShapeInfo'

const NewElements = () => {
  const { handleChange, list, elementsNames } = useNewElementsHook()
  return (
    <div className='Bars'>
      {
        list &&
          <div className='Bars_bar'>
            <ShapeInfo />
            <ListOfElements elements={list} handleChange={handleChange} elementsNames={elementsNames} />
          </div>
      }
    </div>
  )
}

export default NewElements
