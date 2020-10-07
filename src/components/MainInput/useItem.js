import { useDispatch, useSelector } from 'react-redux'
import useValidateShape from '../../Hooks/cutOptimizer/useValidateShape'

const useItem = () => {
  const { shapeValidator } = useValidateShape()
  const { request, currentShape, request2, elementsNames, shapeError } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const list = request[currentShape] ? request[currentShape].list : undefined
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target
    console.log(e)

    if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
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

export default useItem
