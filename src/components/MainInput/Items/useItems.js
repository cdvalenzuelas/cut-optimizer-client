import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../../Hooks/cutOptimizer/useValidateShape'

const useItems = () => {
  const { shapeError, currentShape, request, elementsNames } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const dispatch = useDispatch()
  const { shapeValidator } = useValidateShape()
  const { list, defaultlengthBar } = request[currentShape]
  const defaultItem = { name: 'PXXX', quantity: 1, length: Math.round(defaultlengthBar * 0.5) }

  const handleChange = (e, item) => {
    list.push(Object.assign({}, defaultItem, {}))
    const { result, cond6 } = shapeValidator('addElement', { newElement: defaultItem.name.toUpperCase(), elementsNames: elementsNames[currentShape] })
    shapeError[currentShape] = result
    elementsNames[currentShape].push(defaultItem.name)

    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        elementsNames,
        request2: JSON.stringify(request),
        shapeError,
        readyToSend: shapeError.reduce((a, b) => a + b, 0)
      }
    })
  }

  return { handleChange, list, defaultlengthBar }
}

export default useItems
