// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useAvailableBarsHook () {
  const { request, currentShape } = useSelector(state => state.cutOptimizer)
  const { availableBars } = request[currentShape]
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target
    value = Number(value)

    if (name === 'addAvailableBar') {
      dispatch({ type: 'ADD_AVAILABLE_BARS', payload: { currentShape, newAvailableBar: { quantity: 1, length: 6000 } } })
    } else if (name.startsWith('deleteAvailableBar')) {
      dispatch({ type: 'DELETE_AVAILABLE_BAR', payload: { currentShape, availableBar: value } })
    } else if (name.startsWith('AvailableBarQuantity') || name.startsWith('AvailableBarLength')) {
      const regex = /AvailableBar(Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const availableBar = Number(match[2])
      const field = match[1].toLowerCase()
      dispatch({ type: 'MODIFY_AVAILABLE_BAR', payload: { currentShape, availableBar, field, value } })
    }
  }

  return { handleChange, availableBars }
}

export default useAvailableBarsHook
