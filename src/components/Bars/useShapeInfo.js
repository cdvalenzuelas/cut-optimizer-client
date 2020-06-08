// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useShapeInfo () {
  const { request, currentShape, newElements, request2, elementsNames, shapeError } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const shape = request[currentShape]
  const { shapeName, material, defaultlengthBar, cutLength } = shape

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'newElements' || name === 'availableBars') {
      if (newElements && name === 'availableBars') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: { newElements: false } })
      } else if (!newElements && name === 'newElements') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: { newElements: true } })
      }
    } else if (name === 'shapeName' || name === 'material' || name === 'defaultlengthBar' || name === 'cutLength') {
      let request3 = request2

      if (name === 'defaultlengthBar' || name === 'cutLength') {
        value = Number(value)
      } else {
        request3 = JSON.parse(request3)
        request3[currentShape][name] = value
        request3 = JSON.stringify(request3)
      }

      request[currentShape][name] = value

      dispatch({ type: 'MODIFY_SHAPE', payload: { request, request2: request3 } })
    } else if (name === 'deleteShape') {
      request.splice(currentShape, 1)
      const request3 = JSON.parse(request2)
      request3.splice(currentShape, 1)
      let current

      if (currentShape !== 0) {
        current = currentShape - 1
      } else {
        current = request.length !== 0 ? 0 : -1
      }

      elementsNames.splice(currentShape, 1)
      shapeError.splice(currentShape, 1)

      dispatch({
        type: 'DELETE_SHAPE',
        payload: {
          request2: JSON.stringify(request3),
          currentShape: current,
          elementsNames,
          shapeError
        }
      })
    }
  }

  return { handleChange, shapeName, material, defaultlengthBar, cutLength }
}

export default useShapeInfo
