// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useNewElementsHook () {
  const { request, currentShape, newElements } = useSelector(state => state.cutOptimizer)
  const { availableBars } = request[currentShape]
  const shape = request[currentShape]
  const { shape: shapeName, material, defaultlengthBar, list } = shape
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'newElements' || name === 'availableBars') {
      if (newElements && name === 'availableBars') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: false })
      } else if (!newElements && name === 'newElements') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: true })
      }
    } else if (name === 'addElement') {
      dispatch({ type: 'ADD_ELEMENT', payload: currentShape })
    } else if (name === 'deleteShape') {
      dispatch({ type: 'DELETE_SHAPE', payload: currentShape })
    } else if (name.startsWith('deleteElement')) {
      const regex = /deleteElement(\d{1,})/
      const match = regex.exec(name)
      dispatch({ type: 'DELETE_ELEMENT', payload: { shape: currentShape, element: Number(match[1]) } })
    } else if (name === 'deleteElement') {
      const regex = /deleteElement(\d{1,})/
      const match = regex.exec(name)
      dispatch({ type: 'DELETE_ELEMENT', payload: { shape: currentShape, element: Number(match[1]) } })
    } else if (name === 'shape' || name === 'material' || name === 'defaultlengthBar') {
      const value2 = name === 'defaultlengthBar' ? Number(value) : value
      dispatch({ type: 'MODIFY_SHAPE', payload: { shape: currentShape, field: name, value: value2 } })
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const value2 = match[1] === 'name' ? value : Number(value)
      dispatch({ type: 'MODIFY_ELEMENT', payload: { shape: currentShape, element: Number(match[2]), field: match[1].toLowerCase(), value: value2 } })
    }
  }

  return { handleChange, shapeName, material, defaultlengthBar, availableBars, list }
}

export default useNewElementsHook
