import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../../Hooks/cutOptimizer/useValidateShape'

const useItem = () => {
  const { shapeValidator } = useValidateShape()
  const { request, currentShape, request2, elementsNames, shapeError } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const list = request[currentShape] ? request[currentShape].list : undefined
  const dispatch = useDispatch()

  const handleChange = (e, item) => {
    let { name, value } = e.target

    if (name === 'name' || name === 'quantity' || name === 'length') {
      let request3 = request2

      if (name === 'quantity' || name === 'length') {
        value = value ? Number(value) : list[item][name]
      } else {
        elementsNames[currentShape][item] = value
        request3 = JSON.parse(request2)
        request3[currentShape].list[item][name] = value
        request3 = JSON.stringify(request3)
      }

      list[item][name] = value
      shapeError[currentShape] = shapeValidator(name, value)

      dispatch({
        type: 'MODIFY_ELEMENT',
        payload: {
          request,
          request2: request3,
          elementsNames,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name === 'delete') {
      list.splice(item, 1)
      elementsNames[currentShape].splice(item, 1)
      shapeError[currentShape] = shapeValidator(name)

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
