// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useNewElementsHook () {
  const { request, currentShape, request2, shapesChanges, elementsNames } = useSelector(state => state.cutOptimizer)
  const list = request[currentShape] ? request[currentShape].list : undefined
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'addElement') {
      dispatch({ type: 'ADD_ELEMENT', payload: currentShape })
    } else if (name.startsWith('deleteElement')) {
      const regex = /deleteElement(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[1])
      dispatch({ type: 'DELETE_ELEMENT', payload: element })
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[2])
      const field = match[1].toLowerCase()
      let request3 = request2
      let shapesChanges2 = shapesChanges[currentShape]

      if (field === 'quantity' || field === 'length') {
        value = Number(value)
        if (request2 !== '[]') {
          // Verify which shape has changed
          shapesChanges2 = JSON.parse(request2)[currentShape].list[element][field] !== value
        }
      } else {
        if (request2 !== '[]') {
          request3 = JSON.parse(request3)
          request3[currentShape].list[element][field] = value.toUpperCase()
          request3 = JSON.stringify(request3)
        }
      }
      dispatch({ type: 'MODIFY_ELEMENT', payload: { element, field, value, request3, shapesChanges: shapesChanges2 } })
    }
  }

  return { handleChange, list, elementsNames: elementsNames.flat() }
}

export default useNewElementsHook
