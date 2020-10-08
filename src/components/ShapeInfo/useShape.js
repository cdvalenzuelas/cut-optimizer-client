import { useDispatch, useSelector } from 'react-redux'

const useShape = () => {
  const { currentShape, shapeError } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const handleChange = (e, numberOfShape) => {
    console.log(numberOfShape)

    if (currentShape !== Number(numberOfShape)) {
      dispatch({ type: 'SET_CURRENT_SHAPE', payload: { currentShape: Number(numberOfShape) } })
    }
  }

  return { handleChange, currentShape, shapeError }
}

export default useShape
