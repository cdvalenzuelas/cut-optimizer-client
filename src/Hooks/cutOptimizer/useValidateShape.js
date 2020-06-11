import { useSelector } from 'react-redux'

const useValidateCutOptimizer = () => {
  const { request, currentShape, elementsNames, shapeError } = useSelector(state => state.cutOptimizer)

  const shapeValidator = (field, value) => {
    if (field === 'defaultlengthBar') {
      const { list } = request[currentShape]
      const cond1 = list.some(element2 => element2.length > value)
      const cond2 = value < request[currentShape].cutLength

      return cond1 || cond2 ? 1 : 0
    } else if (field === 'cutLength') {
      const cond1 = value > request[currentShape].defaultlengthBar

      return cond1 ? 1 : 0
    } else if (field.startsWith('elementQuantity') || field.startsWith('elementLength')) {
      const { list, defaultlengthBar } = request[currentShape]
      const cond1 = list.some(element2 => element2.length > defaultlengthBar)

      return cond1 ? 1 : 0
    } else if (field.startsWith('elementName')) {
      const { list } = request[currentShape]
      const cond1 = list.some(element2 => {
        const internalLenght = elementsNames[currentShape].filter(name2 => name2 === element2.name).length
        return internalLenght > 1
      })

      return cond1 ? 1 : 0
    } else if (field === 'addElement') {
      const { list } = request[currentShape]

      if (list.length === 0) {
        return 0
      } else if (list.length >= 2) {
        const cond1 = list.some(element2 => {
          const internalLenght = elementsNames[currentShape].filter(name2 => name2 === element2.name).length
          return internalLenght > 1
        })
        return cond1 ? 1 : shapeError[currentShape]
      } else {
        return shapeError[currentShape]
      }
    } else if (field.startsWith('deleteElement')) {
      const { list } = request[currentShape]

      return list.length === 0 ? 1 : shapeError[currentShape]
    }
  }

  return { shapeValidator }
}

export default useValidateCutOptimizer
