import React, { memo } from 'react'
import Table from '@Components/Table'

function ItemsPage ({ data, editable, reSize, getItem, defaultlengthBar, onAddRow, onDeleteRow, tableError }) {
  return <Table
    fields={['name', 'length', 'quantity']}
    types={{ length: 'number', name: 'text', quantity: 'number' }}
    defaultItem={{ name: 'PXXX', length: Math.round(defaultlengthBar * 0.5), quantity: 1 }}
    data={data}
    editable={editable}
    reSize={reSize}
    getItem={getItem}
    onAddRow={onAddRow}
    onDeleteRow={onDeleteRow}
    tableError={tableError}
  />
}

export default memo(ItemsPage)
