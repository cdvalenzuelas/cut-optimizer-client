import React from 'react'
import useButtons from './useButtons'

const Buttons = () => {
  const { handleChange, mode } = useButtons()

  if (mode === 'input') {
    return (
      <div className='SideBar-Buttons'>
        <button
          className='btn-secondary'
          name='newShape'
          onClick={handleChange}
          style={{ width: '80%' }}
        >
          New
        </button>
        <button
          className='btn-primary'
          name='optimize'
          onClick={handleChange}
          style={{ width: '80%' }}
        >
          Optimize
        </button>
      </div>
    )
  } else if (mode === 'output') {
    return (
      <div className='SideBar-Buttons'>
        <button
          style={{ width: '80%' }}
          className='btn-primary'
          name='edit'
          onClick={handleChange}
        >
        Edit
        </button>
      </div>
    )
  }
}

export default Buttons
