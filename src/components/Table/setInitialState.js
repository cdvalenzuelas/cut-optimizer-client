const setInitialState = ({ data, fields, titles, types, editable, widths, reSize, tableError }) => {
  data = JSON.stringify(data)
  data = JSON.parse(data)
  let fields2

  if (fields) {
    fields2 = fields
  } else if (data.length > 0) {
    fields2 = Object.keys(data[0])
  } else {
    fields2 = ['Column']
  }

  const titles2 = [...fields2]
  const titlesKeys = titles ? Object.keys(titles) : []
  const titlesValues = titles ? Object.values(titles) : []

  titlesKeys.forEach((item, index) => {
    const index2 = titles2.indexOf(item)

    if (index2 >= 0) titles2[index2] = titlesValues[index]
  })

  const types2 = new Array(fields2.length).fill('text')
  const typesKeys = types ? Object.keys(types) : []
  const typesValues = types ? Object.values(types) : []

  typesKeys.forEach((item, index) => {
    const index2 = fields2.indexOf(item)

    if (index2 >= 0) types2[index2] = typesValues[index]
  })

  if (reSize) {
    const internalWidths = []
    fields.forEach(item => {
      internalWidths.push(`calc((100% - 1.5rem)/${fields2.length})`)
    })
    internalWidths.push('1.5rem')
    widths = internalWidths
  } else {
    widths = new Array(fields2.length).fill(`${100 / fields2.length}%`)
  }

  const errors = []
  let error = false

  if (tableError && editable) {
    data.forEach(item => {
      item = JSON.stringify(item)
      item = JSON.parse(item)
      const keys = Object.keys(item)
      keys.forEach(item2 => {
        const internalFunc = tableError[item2]

        if (internalFunc) {
          const result = internalFunc(item)
          item[item2] = result
          if (!error && result) {
            error = result
          }
        } else {
          item[item2] = undefined
        }
      })
      errors.push(item)
    })
  }

  error = errors.length === 0 ? true : error

  return {
    editables: editable ? [...fields2] : new Array(fields2.length).fill(false),
    types: types2,
    widths,
    fields: [...fields2],
    fields2,
    data,
    titles: titles2,
    errors: tableError && editable ? errors : [],
    error
  }
}

export default setInitialState
