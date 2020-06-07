import React from 'react'
import useNewElements from './useNewElements'
import ListOfElements from './ListOfElements'
import ShapeInfo from './ShapeInfo'

const NewElements = () => {
  const { handleChange, list, elementsNames } = useNewElements()
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
