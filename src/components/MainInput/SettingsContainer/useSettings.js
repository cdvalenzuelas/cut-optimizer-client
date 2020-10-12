import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../../Hooks/cutOptimizer/useValidateShape'

function useShapeInfo () {
  const { request, currentShape, request2, shapeError } = useSelector(state => state.cutOptimizer)
  const { cutLength, defaultlengthBar, material, shapeName, list } = request[currentShape]
  const { shapeValidator } = useValidateShape()
  const dispatch = useDispatch()

  const styles = useMemo(() => {
    return {
      shape: 'inherit',
      defaultLengthBar: 'inherit',
      cutLength: 'inherit',
      material: 'inherit'
    }
  }, [])

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'shapeName' || name === 'material') {
      value = value.toUpperCase()
      let request3 = request2
      request3 = JSON.parse(request3)
      request3[currentShape][name] = value
      request3 = JSON.stringify(request3)
      request[currentShape][name] = value

      if (name === 'shapeName') {
        const { result, cond8 } = shapeValidator('shapeName', { shapeName: value, list })
        styles.shape = cond8 ? 'red' : 'inherit'
        shapeError[currentShape] = result
      } else if (name === 'material') {
        const { result, cond9 } = shapeValidator('material', { material: value, list })
        styles.material = cond9 ? 'red' : 'inherit'
        shapeError[currentShape] = result
      }

      dispatch({ type: 'MODIFY_SHAPE', payload: { request, request2: request3, shapeError } })
    } else if (name === 'defaultlengthBar' || name === 'cutLength') {
      value = Number(value)
      request[currentShape][name] = value

      if (name === 'defaultlengthBar') {
        const { result, cond4 } = shapeValidator('defaultLengthBar', { list, defaultlengthBar: value, cutLength })
        styles.defaultLengthBar = cond4 ? 'red' : 'inherit'
        shapeError[currentShape] = result
      } else if (name === 'cutLength') {
        const { result, cond5 } = shapeValidator('cutLength', { cutLength: value, defaultlengthBar, list })
        styles.cutLength = cond5 ? 'red' : 'inherit'
        shapeError[currentShape] = result
      }

      dispatch({ type: 'MODIFY_SHAPE', payload: { request, shapeError } })
    }
  }

  return { handleChange, shapeName, material, defaultlengthBar, cutLength, styles }
}

export default useShapeInfo
