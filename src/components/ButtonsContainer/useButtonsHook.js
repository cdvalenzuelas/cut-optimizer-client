// Dependencies
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import fetchData from '../../utils/fetchData'

const useButtonsHook = () => {
  const dispatch = useDispatch()
  const { request, mode, request2, currentShape } = useSelector(state => state.cutOptimizer)

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'edit') {
      dispatch({ type: 'SET_MODE' })
    } else if (name === 'shapeInfo') {
      if (currentShape !== Number(value)) {
        dispatch({ type: 'SET_CURRENT_SHAPE', payload: Number(value) })
      }
    } else if (name === 'newShape') {
      dispatch({ type: 'CREATE_NEW_SHAPE' })
    } else if (name === 'optimize') {
      if (request2 !== JSON.stringify(request)) {
        console.log('me estoy optimizando')
        // Sort request
        request.forEach(shape => {
          shape.list.forEach(element => {
            element.id2 = `${element.length} ${element.name}`
          })
          shape.list.sort((a, b) => { return a.id2 < b.id2 ? 1 : -1 }) // Order list of elements by id2 DESC
        })

        fetchData('https://cut-optimizator-api.now.sh/', request, 'POST')
          .then(res => {
            res.data.forEach(shape => {
              let description = ''
              shape.bars.forEach(bar => {
                bar.elements.forEach((element, index) => {
                  const { quantity2, name, length } = element
                  const more = index === bar.elements.length - 1 ? '' : ' + '
                  description += `${quantity2}x${name}[${length} mm]` + more
                })
                bar.description = description
                description = ''
              })
            })
            dispatch({ type: 'OPTIMIZE', payload: res.data })
          })
          .catch(err => console.log(err))
      } else {
        dispatch({ type: 'SET_MODE' })
      }
    }
  }

  return { handleChange, request, mode }
}

export default useButtonsHook
