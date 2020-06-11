import React from 'react'

function ListOfElements ({ elements, handleChange, elementsNames, defaultlengthBar }) {
  return (
    <table>
      <colgroup>
        <col style={{ width: '11rem' }} />
        <col style={{ width: '11rem' }} />
        <col style={{ width: '11rem' }} />
        <col style={{ width: '5rem' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Length</th>
          <th>
            <button name='addElement' onClick={handleChange}>ADD</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {elements.map((item2, index2) => {
          const { name, quantity, length } = item2
          { /* const backgrund = elementsNames.filter(name2 => name2 === name).length > 1 ? { background: 'red' } : { background: 'initial' } */ }

          return (
            <tr key={index2}>
              <td>
                <input
                  name={`elementName${index2}`}
                  type='text'
                  value={name}
                  onChange={handleChange}
                  autoComplete='off'
                />
              </td>
              <td>
                <input
                  name={`elementQuantity${index2}`}
                  type='number'
                  value={quantity.toString()}
                  onChange={handleChange}
                  autoComplete='off'
                  min={1}
                  step={0.1}
                />
              </td>
              <td>
                <input
                  name={`elementLength${index2}`}
                  type='number'
                  value={length.toString()}
                  onChange={handleChange}
                  autoComplete='off'
                  max={defaultlengthBar}
                  min={1}
                  step={0.1}
                />
              </td>
              <td>
                <button name={`deleteElement${index2}`} onClick={handleChange} value={index2} className='btn-alert'>-</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ListOfElements
