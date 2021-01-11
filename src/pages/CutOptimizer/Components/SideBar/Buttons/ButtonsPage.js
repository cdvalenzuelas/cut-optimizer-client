import React, { memo } from 'react'

const ButtonsPage = ({ mode, handleChange, readyToSend, setShowModal, status, diff }) => {
  if (mode === 'input') {
    return (
      <div className='SideBar-Buttons'>
        {status === 'active' && <button
          className='btn-secondary'
          name='newShape'
          onClick={e => setShowModal(true)}
          style={{ width: '80%' }}
        >New</button>}
        <button
          className='btn-primary'
          name='optimize'
          onClick={handleChange}
          style={{ width: '80%', display: readyToSend ? 'initial' : 'none' }}
        >
          {status === 'active' && diff ? 'Optimize' : 'Results'}
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
          {status === 'active' ? 'Edit' : 'Items'}
        </button>
      </div>
    )
  }
}

export default memo(ButtonsPage)
