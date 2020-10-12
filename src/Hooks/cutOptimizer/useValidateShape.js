import { useCallback } from 'react'

const useValidateShape = () => {
  const shapeValidator = useCallback((action, { list, cutLength, defaultlengthBar, newElement, elementsNames, material, shapeName }) => {
    let cond1 = false // deleteElememt
    let cond2 = false // elementQuantity
    let cond3 = false // elementLength
    let cond4 = false // defaultLengthBar
    let cond5 = false // cutLength
    let cond6 = false // addElement
    let cond7 = false // elementName
    let cond8 = false // shapeName
    let cond9 = false // material
    const nameErrors = []

    if (action === 'deleteElememt') {
      cond1 = list.length === 0 || false
    } else if (action === 'elementQuantity') {
      cond2 = list.some(item => item.quantity < 1) || false
    } else if (action === 'elementLength') {
      cond3 = list.some(item => item.length > defaultlengthBar || item.length < 1) || false
    } else if (action === 'defaultLengthBar') {
      if (list.length === 0) {
        cond1 = true
      }
      cond4 = list.some(item => item.length > defaultlengthBar) || defaultlengthBar < cutLength || defaultlengthBar < 1 || false
    } else if (action === 'cutLength') {
      if (list.length === 0) {
        cond1 = true
      }
      cond5 = cutLength > defaultlengthBar || false
    } else if (action === 'addElement') {
      cond6 = elementsNames.includes(newElement) || false
    } else if (action === 'elementName') {
      const elementsNames2 = [...elementsNames]
      elementsNames = [...elementsNames].sort((a, b) => a <= b ? 1 : -1)

      const repetitions = [{ name: elementsNames[0], quantity: 1 }]

      let counter = 0

      for (let i = 0; i < elementsNames.length - 1; i++) {
        if (elementsNames[counter] === elementsNames[i + 1]) {
          repetitions[counter].quantity += 1
        } else if (elementsNames[counter] !== elementsNames[i + 1]) {
          counter = i + 1
          repetitions.push({ name: elementsNames[i + 1], quantity: 1 })
        }
      }

      counter = 0

      elementsNames2.forEach((item, index2) => {
        repetitions.find((item2, index) => {
          if (item === item2.name && item !== '') {
            nameErrors.push(item2.quantity > 1)
          } else if (item === '') {
            nameErrors[index2] = true
          }
        })
      })

      cond7 = (repetitions.reduce((a, b) => b.quantity > a ? b.quantity : a, 1) > 1 || newElement === '') || false
    } else if (action === 'shapeName') {
      if (list.length === 0) {
        cond1 = true
      }
      cond8 = shapeName === '' || false
    } else if (action === 'material') {
      if (list.length === 0) {
        cond1 = true
      }
      cond9 = material === '' || false
    }

    const result = cond1 || cond2 || cond3 || cond4 || cond5 || cond6 || cond7 || cond8 || cond9 ? 1 : 0

    return { result, cond1, cond2, cond3, cond4, cond5, cond6, cond7, cond8, cond9, nameErrors }
  }, [])

  return { shapeValidator }
}

export default useValidateShape
