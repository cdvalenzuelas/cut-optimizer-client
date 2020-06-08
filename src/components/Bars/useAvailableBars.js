// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useAvailableBars () {
  const { request, currentShape } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()
  const availableBars = request[currentShape] ? request[currentShape].availableBars : undefined

  const handleChange = e => {
    let { name, value } = e.target
    value = Number(value)

    if (name === 'addAvailableBar') {
      request[currentShape].availableBars.push({ quantity: 1, length: 6000 })

      dispatch({ type: 'ADD_AVAILABLE_BARS', payload: { request } })
    } else if (name.startsWith('deleteAvailableBar')) {
      request[currentShape].availableBars.splice(value, 1)

      dispatch({ type: 'DELETE_AVAILABLE_BAR', payload: { request } })
    } else if (name.startsWith('AvailableBarQuantity') || name.startsWith('AvailableBarLength')) {
      const regex = /AvailableBar(Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const availableBar = Number(match[2])
      const field = match[1].toLowerCase()

      request[currentShape].availableBars[availableBar][field] = value

      dispatch({ type: 'MODIFY_AVAILABLE_BAR', payload: { request } })
    }
  }

  return { handleChange, availableBars }
}

export default useAvailableBars
