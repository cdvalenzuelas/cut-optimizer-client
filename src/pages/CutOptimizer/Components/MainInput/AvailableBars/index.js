import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import Table from '@Components/Table'

const AvailableBars = () => {
  const data = useSelector(state => {
    const { shapeName, material } = state.cutOptimizer.request[state.cutOptimizer.currentShape]

    const serverAvailableBars = state.cutOptimizer.serverAvailableBars.filter(item => {
      return item.name === shapeName && item.material === material
    })

    return serverAvailableBars.length ? serverAvailableBars[0].data : []
  })

  return (
    <Table
      fields={['length', 'quantity']}
      data={data}
      editable={false}
      newRow={false}
    />
  )
}

export default memo(AvailableBars)
