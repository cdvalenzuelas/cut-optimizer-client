import { useSelector } from 'react-redux'

const useValidateShape = () => {
  const { request, currentShape, elementsNames, shapeError } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const { list, defaultlengthBar } = request[currentShape]

  const shapeValidator = (field, value) => {
    if (field === 'defaultlengthBar' && request[currentShape].list.length > 0) {
      const cond1 = list.some(element2 => element2.length > value)
      const cond2 = value < request[currentShape].cutLength

      return (cond1 || cond2) ? 1 : 0
    } else if (field === 'cutLength' && request[currentShape].list.length > 0) {
      return value > request[currentShape].defaultlengthBar ? 1 : shapeError[currentShape]
    } else if (field === 'elementLength') {
      return value > defaultlengthBar || value < 1 ? 1 : shapeError[currentShape]
    } else if (field === 'elementQuantity') {
      return value < 1 ? 1 : shapeError[currentShape]
    } else if (field === 'elementName') {
      if (value === '') {
        return 1
      } else {
        const d = elementsNames[currentShape].reduce((a, b) => {
          const c = b === value ? 1 : 0
          return a + c
        }, 0)
        return d > 1 ? 1 : 0
      }
    } else if (field === 'addElement') {
      if (list.length === 1) {
        return 0
      } else if (list.length > 1) {
        return elementsNames[currentShape].includes(value.toUpperCase()) ? 1 : shapeError[currentShape]
      }
    } else if (field === 'deleteElement') {
      return list.length === 0 ? 1 : shapeError[currentShape]
    }
  }

  return { shapeValidator }
}

export default useValidateShape
