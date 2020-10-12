import { useSelector, useDispatch } from 'react-redux'
import useValidateShape from '../../../Hooks/cutOptimizer/useValidateShape'
import { useMemo } from 'react'

const useItem = () => {
  const { shapeError, currentShape, request, elementsNames, request2 } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()
  const { shapeValidator } = useValidateShape()
  const { list, defaultlengthBar } = request[currentShape]

  const styles = useMemo(() => {
    return {
      name: 'red',
      length: 'inherit',
      quantity: 'inherit'
    }
  }, [])

  const handleChange = (e, item) => {
    let { name, value } = e.target

    if (name === 'name') {
      value = value.toUpperCase()
      elementsNames[currentShape][item] = value
      const request3 = JSON.parse(request2)
      request3[currentShape].list[item][name] = value

      list[item][name] = value
      const { result, nameErrors } = shapeValidator('elementName', { elementsNames: elementsNames[currentShape], newElement: value })
      shapeError[currentShape] = result

      styles.name = nameErrors[item] ? 'red' : 'inherit'

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
      value = Number(value)
      list[item][name] = value

      if (name === 'length') {
        const { result, cond3 } = shapeValidator('elementLength', { list, defaultlengthBar })
        styles.length = cond3 ? 'red' : 'inherit'
        shapeError[currentShape] = result
      } else if (name === 'quantity') {
        const { result, cond2 } = shapeValidator('elementQuantity', { list })
        styles.quantity = cond2 ? 'red' : 'inherit'
        shapeError[currentShape] = result
      }

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
      const { result } = shapeValidator('deleteElememt', { list })
      shapeError[currentShape] = result

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

  return { handleChange, styles }
}

export default useItem
