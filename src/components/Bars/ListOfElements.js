import React from 'react'

function ListOfElements ({ elements, index, handleChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Quantity</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((item2, index2) => {
          const { name, quantity, length } = item2
          return (
            <tr key={index2}>
              <td>
                <input
                  name={`elementName${index}-${index2}`}
                  type='text'
                  value={name}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  name={`elementQuantity${index}-${index2}`}
                  type='text'
                  value={quantity}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  name={`elementLength${index}-${index2}`}
                  type='text'
                  value={length}
                  onChange={handleChange}
                />
              </td>
              <td>
                <button
                  name={`deleteElement${index}-${index2}`}
                  onClick={handleChange}
                  value={index2}
                >
                  -
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ListOfElements
