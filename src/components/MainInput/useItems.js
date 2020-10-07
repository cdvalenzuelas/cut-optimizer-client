import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../Hooks/cutOptimizer/useValidateShape'

const useItems = () => {
  const { shapeError, currentShape, request, elementsNames, request2 } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()
  const { shapeValidator } = useValidateShape()

  const handleChange = e => {
    const { name } = e.target
    const { defaultlengthBar, list } = request[currentShape]

    shapeError[currentShape] = shapeValidator(name)
    list.push({ name: 'PXXX', quantity: 1, length: Math.round(defaultlengthBar * 0.5) })
    const request3 = JSON.parse(request2)
    request3[currentShape].list.push({ name: 'PXXX', quantity: 0, length: Math.round(defaultlengthBar * 0.5) })
    elementsNames[currentShape].push('PXXX')
    shapeError[currentShape] = shapeValidator(name)

    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        elementsNames,
        request2: JSON.stringify(request3),
        shapeError,
        readyToSend: shapeError.reduce((a, b) => a + b, 0)
      }
    })
  }

  return { handleChange }
}

export default useItems
