// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useNewElementsHook () {
  const { request, currentShape, request2, elementsNames } = useSelector(state => state.cutOptimizer)
  const list = request[currentShape] ? request[currentShape].list : undefined
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'addElement') {
      request[currentShape].list.push({ name: 'PXXX', quantity: 1, length: 1000 })
      const request3 = JSON.parse(request2)
      request3[currentShape].list.push({ name: 'PXXX', quantity: 0, length: 1000 })

      dispatch({ type: 'ADD_ELEMENT', payload: JSON.stringify(request3) })
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[2])
      const field = match[1].toLowerCase()
      let request3 = request2

      if (field === 'quantity' || field === 'length') {
        value = Number(value)
      } else {
        request3 = JSON.parse(request2)
        request3[currentShape].list[element][field] = value
        request3 = JSON.stringify(request3)
      }

      dispatch({ type: 'MODIFY_ELEMENT', payload: { element, field, value, request3 } })
    } else if (name.startsWith('deleteElement')) {
      console.log('estoy aqui')
      console.log(request2)
      const regex = /deleteElement(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[1])
      request[currentShape].list.splice(element, 1)

      dispatch({ type: 'DELETE_ELEMENT' })
    }
  }

  return { handleChange, list, elementsNames: elementsNames.flat() }
}

export default useNewElementsHook
