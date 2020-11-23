import React, { memo } from 'react'

function TablePage ({ data, editable, newRow, widths, fields, handleClick, addNewRow, types, handleChange, titles }) {
  return (
    <div className='TableContainer'>
      <table className='Table'>
        <colgroup>
          {widths && widths.map((item, index) => <col key={index} style={{ width: widths[index] }}/>)}
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
                    return (
                      <td className='TableData' key={index2}>
                        <input
                          name={field}
                          type={types[index2]}
                          onChange={e => handleChange(e, index, types[index2])}
                          value={data[index][field]}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      {newRow && editable && <button className='NewRow' onClick={addNewRow}>New</button>}
    </div>
  )
}

export default memo(TablePage)
