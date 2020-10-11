import { useDispatch, useSelector } from 'react-redux'

const useAvailableBar = () => {
  const { request, currentShape } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const availableBars = request[currentShape] ? request[currentShape].availableBars : undefined
  const dispatch = useDispatch()

  const handleChange = (e, item) => {
    let { name, value } = e.target

    if (name === 'quantity' || name === 'length') {
      value = value ? Number(value) : availableBars[item][name]
      availableBars[item][name] = value
      dispatch({ type: 'MODIFY_AVAILABLEBAR', payload: { request } })
    } else if (name === 'delete') {
      availableBars.splice(item, 1)
      dispatch({ type: 'DELETE_AVAILABLEBAR', payload: { request } })
    }
  }

  return { handleChange }
}

export default useAvailableBar
