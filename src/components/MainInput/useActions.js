import { useDispatch, useSelector } from 'react-redux'

function useShapeInfo () {
  const { currentShape, newElements, request, request2, elementsNames, shapeError } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name } = e.target

    if (name === 'items' && !newElements) {
      dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: { newElements: true } })
    } else if (name === 'bars' && newElements) {
      dispatch({ type: 'CHANGE_NEW_ELEMENTS', payload: { newElements: false } })
    } else if (name === 'delete') {
      request.splice(currentShape, 1)
      const request3 = JSON.parse(request2)
      request3.splice(currentShape, 1)
      let current

      if (currentShape !== 0) {
        current = currentShape - 1
      } else {
        current = request.length !== 0 ? 0 : -1
      }

      elementsNames.splice(currentShape, 1)
      shapeError.splice(currentShape, 1)

      dispatch({
        type: 'DELETE_SHAPE',
        payload: {
          request2: JSON.stringify(request3),
          currentShape: current,
          elementsNames,
          shapeError,
          readyToSend: shapeError.length !== 0 ? shapeError.reduce((a, b) => a + b, 0) : 1
        }
      })
    }
  }

  return { handleChange, currentShape, newElements }
}

export default useShapeInfo
