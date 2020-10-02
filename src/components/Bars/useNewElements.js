// Dependenies
import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../Hooks/cutOptimizer/useValidateShape'

function useNewElements () {
  const { shapeValidator } = useValidateShape()
  const { request, currentShape, request2, elementsNames, shapeError } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const list = request[currentShape] ? request[currentShape].list : undefined
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'addElement') {
      const { defaultlengthBar } = request[currentShape]

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
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[2])
      const field = match[1].toLowerCase()
      let request3 = request2

      if (field === 'quantity' || field === 'length') {
        value = value ? Number(value) : list[element][field]
      } else {
        elementsNames[currentShape][element] = value
        request3 = JSON.parse(request2)
        request3[currentShape].list[element][field] = value
        request3 = JSON.stringify(request3)
      }

      list[element][field] = value
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
    } else if (name.startsWith('deleteElement')) {
      const regex = /deleteElement(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[1])
      list.splice(element, 1)
      elementsNames[currentShape].splice(element, 1)
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

  return {
    handleChange,
    list,
    elementsNames: elementsNames[currentShape],
    defaultlengthBar: request.length !== 0 ? request[currentShape].defaultlengthBar : 0
  }
}

export default useNewElements
