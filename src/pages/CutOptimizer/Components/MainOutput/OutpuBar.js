import React, { useState, memo, useCallback, useMemo } from 'react'
import Table from '@Components/Table'
import './Styles.scss'

function OutpuBar ({ quantity, percentage, length, availableLength, elements, type }) {
  const [details, setDetails] = useState(false)

  const handleChage = useCallback(e => {
    setDetails(!details)
  }, [details])

  const outline = useMemo(() => type === 'store' ? '1px solid red' : '1px solid blue', [])

  return (
    <article className='Main-OutputBar' style={{ outline }}>
      <div className='Main-OutputBarTitle'>
        <h3 style={{ textAlign: 'left' }}>{quantity} {`${quantity > 1 ? 'Bars' : 'Bar'}`}</h3>
        <div>
          <div style={{ width: `${percentage}%` }} />
        </div>
        <h3 style={{ textAlign: 'right' }}>{`${percentage}%`}</h3>
        <button onClick={handleChage} name='details'>
          <svg viewBox='0 0 29 20' fill='red'>
            <path d='M28.6457 0.451127C28.1732 -0.150376 27.4096 -0.150376 26.9371 0.451127L14.5 16.2862L2.06285 0.451127C1.59042 -0.150376 0.826752 -0.150376 0.354322 0.451127C-0.118107 1.05263 -0.118107 2.02494 0.354322 2.62645L13.6457 19.5492C13.8814 19.8492 14.1907 20 14.5 20C14.8094 20 15.1187 19.8492 15.3543 19.5492L28.6457 2.62645C29.1181 2.02494 29.1181 1.05263 28.6457 0.451127Z' fill='black' />
          </svg>
        </button>
      </div>
      {details && <div className='Main-OutputBarDetails'>
        <Table
          data={elements}
          editable={false}
          titles={{ name: 'NAME', length: 'LENGTH', quantity2: 'QUANTITY' }}
          fields={['name', 'length', 'quantity2']}
          newRow={false}
        />
        <h3>Length: {length}</h3>
        <h3>Available Length: {availableLength}</h3>
      </div>}
    </article>
  )
}

export default memo(OutpuBar)
