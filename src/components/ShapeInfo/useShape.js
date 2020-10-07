import { useDispatch, useSelector } from 'react-redux'

const useShape = () => {
  const { currentShape } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const handleChange = (e, numberOfShape) => {
    console.log(numberOfShape)

    if (currentShape !== Number(numberOfShape)) {
      dispatch({ type: 'SET_CURRENT_SHAPE', payload: { currentShape: Number(numberOfShape) } })
    }
  }

  return { handleChange }
}

export default useShape
