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
            <button name='addElement' className='btn-main' onClick={handleChange}>+</button>
          </div>
      }
    </div>
  )
}

export default NewElements
