// Dependencies
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import fetchData from '../../utils/fetchData'

const useButtonsHook = () => {
  const dispatch = useDispatch()
  const { request, mode, request2 } = useSelector(state => state.cutOptimizer)

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'edit') {
      dispatch({ type: 'SET_MODE' })
    } else if (name === 'shapeInfo') {
      dispatch({ type: 'SET_CURRENT_SHAPE', payload: Number(value) })
    } else if (name === 'newShape') {
      dispatch({ type: 'CREATE_NEW_SHAPE' })
    } else if (name === 'optimize') {
      if (request2 !== JSON.stringify(request)) {
        fetchData('https://cut-optimizer-api.now.sh/', request, 'POST')
          .then(res => dispatch({ type: 'OPTIMIZE', payload: res.data }))
          .catch(err => console.log(err))
      } else {
        dispatch({ type: 'SET_MODE' })
      }
    }
  }

  return { handleChange, request, mode }
}

export default useButtonsHook
