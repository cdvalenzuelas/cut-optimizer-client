import { useDispatch, useSelector } from 'react-redux'

const useAvailableBars = () => {
  const { request, currentShape } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const dispatch = useDispatch()
  const availableBars = request[currentShape] ? request[currentShape].availableBars : undefined

  const handleChange = e => {
    request[currentShape].availableBars.push({ quantity: 1, length: 6000 })
    const request2 = JSON.stringify(request)

    dispatch({ type: 'ADD_AVAILABLE_BARS', payload: { request, request2 } })
  }

  return { handleChange, availableBars }
}

export default useAvailableBars
