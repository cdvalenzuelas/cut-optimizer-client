// Dependenies
import { useDispatch, useSelector } from 'react-redux'

const useInputHook = () => {
  const request = useSelector(state => state.cutOptimizer.request)
  const totalshapes = useSelector(state => state.cutOptimizer.totalshapes)
  const dispatch = useDispatch()

  const handleChange = e => {   
    const { name, value } = e.target    
    let element 
    if (name === 'deleteShape'){
      dispatch({type: 'DELETE_SHAPE', payload: 0})      
    } else if (name === 'addElement') {
      dispatch({type: 'ADD_ELEMENT', payload: 0})
    } else if (name === 'deleteElement'){
      dispatch({type: 'DELETE_ELEMENT', payload: {shape: 0, element: 0}})
    } else if (name === 'shape' || name === 'material' || name === 'defaultlengthBar') {
      dispatch({type: 'MODIFY_SHAPE', payload: {shape: 0, element: 0, field: name, value}})
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')){
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      element = Number(match[2]) 
      dispatch({type: 'MODIFY_ELEMENT', payload: {shape: 0, element, field: match[1].toLowerCase(), value}})
    }
  }

  return {request, handleChange, totalshapes}
}

export default useInputHook