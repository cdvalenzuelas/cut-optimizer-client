import React from 'react'
import useNewElementsHook from './useNewElementsHook'
import ListOfElements from './ListOfElements'
import ShapeInfo from './ShapeInfo'

const NewElements = () => {
  const { handleChange, list, elementsNames } = useNewElementsHook()
  return (
    <div className='bars'>
      {
        list &&
          <div className='bars__bar'>
            <ShapeInfo />
            <ListOfElements elements={list} handleChange={handleChange} elementsNames={elementsNames} />
            <button name='addElement' onClick={handleChange}>+</button>
          </div>
      }
    </div>
  )
}

export default NewElements
