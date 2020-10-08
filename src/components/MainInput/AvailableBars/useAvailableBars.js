import { useDispatch, useSelector } from 'react-redux'

const useAvailableBars = () => {
  const { request, currentShape } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()
  const availableBars = request[currentShape] ? request[currentShape].availableBars : undefined

  const handleChange = e => {
    request[currentShape].availableBars.push({ quantity: 1, length: 6000 })

    dispatch({ type: 'ADD_AVAILABLE_BARS', payload: { request } })
  }

  return { handleChange, availableBars }
}

export default useAvailableBars
