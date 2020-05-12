// Dependenies
import { useDispatch, useSelector } from 'react-redux'

const useInputHook = () => {
  const { request } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    if (name.startsWith('deleteShape')) {
      const regex = /deleteShape(\d{1,})/
      const match = regex.exec(name)
      dispatch({ type: 'DELETE_SHAPE', payload: Number(match[1]) })
    } else if (name.startsWith('addElement')) {
      const regex = /addElement(\d{1,})/
      const match = regex.exec(name)
      dispatch({ type: 'ADD_ELEMENT', payload: Number(match[1]) })
    } else if (name.startsWith('deleteElement')) {
      const regex = /deleteElement(\d{1,})-(\d{1,})/
      const match = regex.exec(name)
      dispatch({ type: 'DELETE_ELEMENT', payload: { shape: Number(match[1]), element: Number(match[2]) } })
    } else if (name.startsWith('shape') || name.startsWith('material') || name.startsWith('defaultlengthBar')) {
      const regex = /(shape|material|defaultlengthBar)(\d{1,})/
      const match = regex.exec(name)
      const value2 = match[1] === 'defaultlengthBar' ? Number(value) : value
      dispatch({ type: 'MODIFY_SHAPE', payload: { shape: Number(match[2]), field: match[1], value: value2 } })
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})-(\d{1,})/
      const match = regex.exec(name)
      const value2 = match[1] === 'name' ? value : Number(value)
      dispatch({ type: 'MODIFY_ELEMENT', payload: { shape: Number(match[2]), element: Number(match[3]), field: match[1].toLowerCase(), value: value2 } })
    }
  }

  return { request, handleChange }
}

export default useInputHook
