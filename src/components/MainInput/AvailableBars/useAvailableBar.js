import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../../Hooks/cutOptimizer/useValidateShape'

const useAvailableBar = () => {
  const { shapeValidator } = useValidateShape()
  const { request, currentShape, shapeError } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const availableBars = request[currentShape] ? request[currentShape].availableBars : undefined
  const dispatch = useDispatch()

  const handleChange = (e, item) => {
    let { name, value } = e.target

    if (name === 'quantity' || name === 'length') {
      value = value ? Number(value) : availableBars[item][name]

      availableBars[item][name] = value
      shapeError[currentShape] = shapeValidator(name, value)

      dispatch({
        type: 'MODIFY_ELEMENT',
        payload: {
          request,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name === 'delete') {
      availableBars.splice(item, 1)
      shapeError[currentShape] = shapeValidator(name)

      dispatch({
        type: 'DELETE_ELEMENT',
        payload: {
          request,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    }
  }

  return { handleChange }
}

export default useAvailableBar
