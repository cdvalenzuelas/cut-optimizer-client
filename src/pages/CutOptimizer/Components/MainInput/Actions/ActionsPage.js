import React, { memo } from 'react'

const ActionsPage = ({ handleChange, newElements }) => {
  return (
    <section className='ActionContainer'>
      <hr />
      <div className='ActionContainer-Buttons'>
        {!newElements && <>
          <button style={{ width: '15%' }} className='btn-primary' name='items' onClick={handleChange}>
            Show Items
          </button>
          <button style={{ width: '15%' }} className='btn-primary' name='edit' onClick={handleChange}>
            Edit Bars
          </button>
        </>}
        {newElements && <button style={{ width: '15%' }} className='btn-primary' name='bars' onClick={handleChange}>
            Show Bars
        </button>}
      </div>
    </section>
  )
}

export default memo(ActionsPage)
