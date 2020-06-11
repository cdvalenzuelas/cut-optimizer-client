import { useSelector } from 'react-redux'

const useValidateNumber = () => {
  const { request, currentShape, elementsNames, shapeError } = useSelector(state => state.cutOptimizer)

  const numberValidator = (field, value, max = Infinity, min = -Infinity) => {
    const regex = /([-])?([0])?([1-9]+)([.])?([0-9]+)?/
    const match = regex.exec(value)
    if (match) {
      if (field.startsWith('elementQuantity') || field.startsWith('elementLength')) {
        if (!match[4] || !match[3]) {
          value = Number(`${match[2]}`)
        } else {
          value = Number(`${match[2]}${match[3]}${match[4]}`)
        }

        if (field === 'quantity') {
          value = Number(value) < 1 ? 1 : Number(value)
        } else {
          value = Number(value) > defaultlengthBar ? defaultlengthBar : Number(value)
          value = Number(value) < 1 ? 1 : Number(value)
        }

        return value
      }
    }
  }

  return { numberValidator }
}

export default useValidateNumber
