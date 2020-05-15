import React from 'react'

function ListAvailableBars ({ elements, handleChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Length</th>
          <th />
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
                <button name='deleteAvailableBar' onClick={handleChange} value={index2}>-</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ListAvailableBars
