// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useShapeInfoHook () {
  const { request, currentShape, newElements, request2 } = useSelector(state => state.cutOptimizer)
  const shape = request[currentShape]
  const { shapeName, material, defaultlengthBar, cutLength } = shape
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'deleteShape') {
      let request3 = request2
      if (request2 !== '[]') {
        request3 = JSON.parse(request3)
        request3.splice(currentShape, 1)
        request3 = JSON.stringify(request3)
      }
      dispatch({ type: 'DELETE_SHAPE', payload: { currentShape, request3 } })
    } else if (name === 'shapeName' || name === 'material' || name === 'defaultlengthBar' || name === 'cutLength') {
      let request3 = request2

      if (name === 'defaultlengthBar' || name === 'cutLength') {
        value = Number(value)
      } else {
        if (request2 !== '[]') {
          request3 = JSON.parse(request3)
          request3[currentShape][name] = value.toUpperCase()
          request3 = JSON.stringify(request3)
        }
      }
      dispatch({ type: 'MODIFY_SHAPE', payload: { currentShape, field: name, value, request3 } })
    } else if (name === 'newElements' || name === 'availableBars') {
      if (newElements && name === 'availableBars') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: false })
      } else if (!newElements && name === 'newElements') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: true })
      }
    }
  }

  return { handleChange, shapeName, material, defaultlengthBar, cutLength }
}

export default useShapeInfoHook
