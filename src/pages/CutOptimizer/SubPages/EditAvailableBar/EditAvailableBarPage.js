import React, { memo } from 'react'
import Layout1 from '@Layouts/Layout1'
import Table from '@Components/Table'

const EditAvailableBarPage = ({ availableBar, getState, toSend, toggleTosend }) => {
  return (
    <Layout1>
      <div className='Main'>
        <Table
          data={availableBar}
          types={{ length: 'number', quantity: 'number' }}
          getState={{ state: toSend, action: getState }}
        />
      </div>
      <button
        className='btn-primary btn-right-bottom'
        onClick={toggleTosend}
      >
        Send
      </button>
    </Layout1>
  )
}

export default memo(EditAvailableBarPage)
