const shapeValidator = (action, { list, cutLength, defaultlengthBar, currentNames, material, shapeName, currentErrors: { errors }, newElement, value }) => {
  if (action === 'deleteElememt') {
    errors.cond1 = list.length === 0

    if (errors.cond1) {
      errors.cond2 = false
      errors.cond3 = false
      errors.cond6 = false
      errors.cond7 = false
    } else {
      errors.cond2 = list.some(item => item.quantity < 1) // OK
      errors.cond3 = list.some(item => item.length > defaultlengthBar || item.length < 1) // OK
      errors.cond6 = currentNames.reduce((a, b) => a + b.error, 0) > 0 // OK
      errors.cond7 = errors.cond6 // OK
      if (defaultlengthBar < 1 || defaultlengthBar > cutLength) {
        errors.cond4 = list.some(item => item.length > defaultlengthBar)
      }
    }
  } else if (action === 'addElement') {
    errors.cond1 = false
    errors.cond6 = list.length === 1 ? false : value
  }

  const result = Object.values(errors).some(item => item === true) ? 1 : 0
  return { errors, result }
}

export default shapeValidator
