// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useAvailableBarsHook () {
  const { request, currentShape, newElements } = useSelector(state => state.cutOptimizer)
  const { availableBars } = request[currentShape]
  const shape = request[currentShape]
  const { shape: shapeName, material, defaultlengthBar } = shape
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'newElements' || name === 'availableBars') {
      if (newElements && name === 'availableBars') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: false })
      } else if (!newElements && name === 'newElements') {
        dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: true })
      }
    } else if (name === 'addAvailableBar') {
      dispatch({ type: 'ADD_AVAILABLE_BARS', payload: { shape: currentShape, newAvailableBar: { quantity: 1, length: 6000 } } })
    } else if (name.startsWith('deleteAvailableBar')) {
      dispatch({ type: 'DELETE_AVAILABLE_BAR', payload: { shape: currentShape, availableBar: Number(value) } })
    } else if (name.startsWith('AvailableBarQuantity') || name.startsWith('AvailableBarLength')) {
      const regex = /AvailableBar(Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      dispatch({ type: 'MODIFY_AVAILABLE_BAR', payload: { shape: currentShape, availableBar: Number(match[2]), field: match[1].toLowerCase(), value: Number(value) } })
    } else if (name === 'deleteShape') {
      dispatch({ type: 'DELETE_SHAPE', payload: currentShape })
    } else if (name === 'shape' || name === 'material' || name === 'defaultlengthBar') {
      const value2 = name === 'defaultlengthBar' ? Number(value) : value
      dispatch({ type: 'MODIFY_SHAPE', payload: { shape: currentShape, field: name, value: value2 } })
    }
  }

  return { handleChange, shapeName, material, defaultlengthBar, availableBars }
}

export default useAvailableBarsHook
