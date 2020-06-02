import React from 'react'

function ListAvailableBars ({ elements, handleChange }) {
  return (
    <table>
      <colgroup>
        <col style={{ width: '11rem' }} />
        <col style={{ width: '22rem' }} />
        <col style={{ width: '5rem' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Length</th>
          <th>
            <button name='addAvailableBar' onClick={handleChange}>ADD</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {elements.map((item2, index2) => {
          const { quantity, length } = item2

          return (
            <tr key={index2}>
              <td>
                <input name={`AvailableBarQuantity${index2}`} type='text' value={quantity} onChange={handleChange} />
              </td>
              <td>
                <input name={`AvailableBarLength${index2}`} type='text' value={length} onChange={handleChange} />
              </td>
              <td>
                <button name='deleteAvailableBar' onClick={handleChange} value={index2} className='btn-alert'>-</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ListAvailableBars
