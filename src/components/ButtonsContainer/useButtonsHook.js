// Dependencies
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import fetchData from '../../utils/fetchData'

const useButtonsHook = () => {
  const dispatch = useDispatch()
  const { request, mode, currentShape, shapesChanges, response } = useSelector(state => state.cutOptimizer)

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
      const request3 = []
      const indexes = []

      shapesChanges.forEach((shape, index) => {
        if (shape === true) {
          request3.push(request[index])
          indexes.push(index)
        }
      })

      console.log(request3)

      if (request3.length !== 0) {
        console.log('me estoy optimizando')
        request.forEach(shape => {
          shape.list.forEach(element => {
            element.id2 = `${element.length} ${element.name}`
          })
          shape.list.sort((a, b) => { return a.id2 < b.id2 ? 1 : -1 }) // Order list of elements by id2 DESC
        })

        const shapesChanges = new Array(request.length).fill(false)

        fetchData('https://cut-optimizator-api.now.sh/', request3, 'POST')
          .then(res => {
            res.data.forEach((shape, index) => {
              const index2 = indexes[index]
              response[index2] = shape
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

            dispatch({ type: 'OPTIMIZE', payload: { data: res.data, shapesChanges } })
          })
          .catch(err => console.log(err))
      } else {
        dispatch({ type: 'SET_MODE' })
      }
    }
  }

  return { handleChange, request, mode, currentShape }
}

export default useButtonsHook
