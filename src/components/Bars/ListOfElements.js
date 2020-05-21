import React from 'react'

function ListOfElements ({ elements, handleChange, elementsNames }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Length</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {elements.map((item2, index2) => {
          const { name, quantity, length } = item2
          const backgrund = elementsNames.filter(name2 => name2 === name).length > 1 ? { background: 'red' } : { background: 'initial' }
          return (
            <tr key={index2}>
              <td>
                <input name={`elementName${index2}`} type='text' value={name} onChange={handleChange} style={backgrund} />
              </td>
              <td>
                <input name={`elementQuantity${index2}`} type='text' value={quantity} onChange={handleChange} />
              </td>
              <td>
                <input name={`elementLength${index2}`} type='text' value={length} onChange={handleChange} />
              </td>
              <td>
                <button name={`deleteElement${index2}`} onClick={handleChange} value={index2}>-</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ListOfElements
