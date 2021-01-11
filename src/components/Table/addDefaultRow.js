const addDefaultRow = (defaultItem, state) => {
  const newRow = {}

  if (defaultItem) {
    const defaultItemKeys = Object.keys(defaultItem)

    state.fields.forEach((field, index) => {
      if (defaultItemKeys.includes(field)) {
        newRow[field] = defaultItem[field]
      } else {
        if (state.types[index] === 'number') {
          newRow[field] = 1
        } else {
          newRow[field] = ''
        }
      }
    })
  }

  return newRow
}

export default addDefaultRow
