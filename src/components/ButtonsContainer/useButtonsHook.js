// Dependencies
import { useDispatch, useSelector } from 'react-redux'

const useButtonsHook = () => {
  const request = useSelector(state => state.cutOptimizer.request)
  //const totalShapes = useSelector(state => state.cutOptimizer.totalShapes)
  const mode = useSelector(state => state.cutOptimizer.mode)

  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    if(name === 'optimize' || name === 'edit'){      
      dispatch({type: 'SET_MODE'})
    } else if (name === 'shapeInfo'){
      dispatch({type: 'SET_DISPLAY'})
    } else if (name === 'newShape'){
      dispatch({type: 'CREATE_NEW_SHAPE'})
    } 
  }

  return {handleChange, request, mode}
}

export default useButtonsHook