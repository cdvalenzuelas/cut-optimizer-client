import React from 'react'

import useActions from './useActions'

const ActionContainer = () => {
  const { handleChange, currentShape, newElements } = useActions()

  return (
    <section className='ActionContainer'>
      <hr />
      <p>
        {newElements ? 'Items' : 'Bars'}
      </p>
      <div className='ActionContainer-Buttons'>
        <button style={{ width: '15%' }} className='btn-secondary' name='items' onClick={handleChange}>
          Items
        </button>
        <button style={{ width: '15%' }} className='btn-tertiary' name='bars' onClick={handleChange}>
          Bars
        </button>
        <button style={{ width: '15%' }} className='btn-primary' name='delete' onClick={handleChange}>
          Delete
        </button>
      </div>
    </section>
  )
}

export default ActionContainer
