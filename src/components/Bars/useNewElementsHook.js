// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useNewElementsHook () {
  const { request, currentShape, request2 } = useSelector(state => state.cutOptimizer)
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
      dispatch({ type: 'DELETE_ELEMENT', payload: { currentShape, element } })
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[2])
      const field = match[1].toLowerCase()
      let request3 = request2

      if (field === 'quantity' || field === 'length') {
        value = Number(value)
      } else {
        if (request2 !== '[]') {
          request3 = JSON.parse(request3)
          request3[currentShape].list[element][field] = value.toUpperCase()
          request3 = JSON.stringify(request3)
        }
      }
      dispatch({ type: 'MODIFY_ELEMENT', payload: { currentShape, element, field, value, request3 } })
    }
  }

  return { handleChange, list }
}

export default useNewElementsHook
