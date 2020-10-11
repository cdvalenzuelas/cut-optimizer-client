import { useSelector, useDispatch } from 'react-redux'
import useValidateShape from '../../../Hooks/cutOptimizer/useValidateShape'

const useItem = () => {
  const { shapeError, currentShape, request, elementsNames, request2 } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()
  const { shapeValidator } = useValidateShape()
  const { list } = request[currentShape]

  const handleChange = (e, item) => {
    let { name, value } = e.target

    if (name === 'name') {
      value = value.toUpperCase()
      shapeError[currentShape] = shapeValidator('elementName', value)
      elementsNames[currentShape][item] = value
      const request3 = JSON.parse(request2)
      request3[currentShape].list[item][name] = value

      list[item][name] = value

      dispatch({
        type: 'MODIFY_ELEMENT',
        payload: {
          request,
          request2: JSON.stringify(request3),
          elementsNames,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name === 'length' || name === 'quantity') {
      value = value ? Number(value) : list[item][name]
      shapeError[currentShape] = name === 'length' ? shapeValidator('elementLength', value) : shapeValidator('elementQuantity', value)
      list[item][name] = value

      dispatch({
        type: 'MODIFY_ELEMENT',
        payload: {
          request,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name === 'delete') {
      list.splice(item, 1)
      elementsNames[currentShape].splice(item, 1)
      shapeError[currentShape] = shapeValidator('deleteElement')

      dispatch({
        type: 'DELETE_ELEMENT',
        payload: {
          request,
          elementsNames,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    }
  }

  return { handleChange }
}

export default useItem
