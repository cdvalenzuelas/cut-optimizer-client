import React, { memo, useCallback, useState } from 'react'
import Layout1 from '@Layouts/Layout1'
import Table from '@Components/Table'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NewAvailableBar from '../../Components/NewAvailableBar'

const BarsStore = () => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)

  const { data } = useSelector(state => {
    const { serverAvailableBars } = state.cutOptimizer
    const data = serverAvailableBars.length >= 0
      ? serverAvailableBars.map(({ name, material, availableBarsId }) => ({ name, material, availableBarsId }))
      : []

    return { data }
  })

  const handleClick = useCallback((e, item, index) => {
    history.push(`/cutOptimizer/bars_store/${item.availableBarsId}`)
  }, [])

  return (
    <Layout1>
      <div className='Main'>
        <Table
          fields={['name', 'material']}
          data={data}
          editable={false}
          newRow={false}
          handleClick={handleClick}
        />
      </div>
      <button className='btn-primary btn-right-bottom' onClick={e => setShowModal(true)} >New</button>
      {showModal && <NewAvailableBar setShowModal={setShowModal} />}
    </Layout1>
  )
}

export default memo(BarsStore)
