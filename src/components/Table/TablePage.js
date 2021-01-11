import React, { memo } from 'react'
import trash from './trash.svg'

function TablePage ({ data, editable, reSize, widths, fields, handleClick, addNewRow, deleteRow, types, handleChange, titles, errors }) {
  return (
    <div className='TableContainer'>
      <table className='Table'>
        <colgroup>
          {widths && widths.map((item, index) => <col key={index} style={{ width: widths[index] }} />)}
        </colgroup>
        <thead className='TableTitles'>
          <tr>
            {titles && titles.map((item, index) => <th key={index}>{item.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody className='TableRows'>
          {data.length > 0 && fields && data.map((item, index) => {
            if (handleClick) {
              return (
                <tr key={index} className='TableRow' onClick={e => handleClick(e, item, index)}>
                  {fields.map((field, index2) => {
                    return (
                      <td className='TableData' key={index2}>
                        {data[index][field]}
                      </td>
                    )
                  })}
                </tr>
              )
            } else if (!editable && !handleClick) {
              return (
                <tr key={index} className='TableRow'>
                  {fields.map((field, index2) => {
                    return (
                      <td className='TableData' key={index2}>
                        {data[index][field]}
                      </td>
                    )
                  })}
                </tr>
              )
            } else {
              return (
                <tr key={index} className='TableRow'>
                  {fields.map((field, index2) => {
                    const error = errors.length <= index ? undefined : errors[index][field]
                    return (
                      <td className={`TableData ${error === true ? 'DataError' : ''}`} key={index2}>
                        <input
                          name={field}
                          type={types[index2]}
                          onChange={e => handleChange(e, index, types[index2])}
                          value={data[index][field]}
                        />
                      </td>
                    )
                  })}
                  {reSize && editable && <td className='DeletreRow'>
                    <button>
                      <img src={trash} onClick={() => deleteRow(index)} />
                    </button>
                  </td>}
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      {reSize && editable && <button className='NewRow' onClick={addNewRow}>New</button>}
    </div>
  )
}

export default memo(TablePage)
