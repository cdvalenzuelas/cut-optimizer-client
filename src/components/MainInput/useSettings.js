// Dependenies
import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../Hooks/cutOptimizer/useValidateShape'

function useShapeInfo () {
  const { request, currentShape, request2, shapeError } = useSelector(state => state.cutOptimizer)
  const { cutLength, defaultlengthBar, material, shapeName } = request[currentShape] 
  const { shapeValidator } = useValidateShape()
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'shapeName' || name === 'material' || name === 'defaultlengthBar' || name === 'cutLength') {
      let request3 = request2

      if (name === 'defaultlengthBar' || name === 'cutLength') {
        if (value) {
          value = Number(value) < 1 ? 1 : Number(value)
        } else {
          value = request[currentShape][name]
        }
      } else {
        request3 = JSON.parse(request3)
        request3[currentShape][name] = value
        request3 = JSON.stringify(request3)
      }

      request[currentShape][name] = value
      shapeError[currentShape] = shapeValidator(name, value)

      dispatch({ type: 'MODIFY_SHAPE', payload: { request, request2: request3, shapeError } })
    }
  }

  return { handleChange, shapeName, material, defaultlengthBar, cutLength }
}

export default useShapeInfo
