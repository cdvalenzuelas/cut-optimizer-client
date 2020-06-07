// Dependencies
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import fetchData from '../../utils/fetchData'

const DEFAULT_SHAPE = {
  shapeName: 'HEA-180',
  material: 'ASTM A36',
  defaultlengthBar: 6000,
  cutLength: 3,
  availableBars: [],
  list: []
}

const useButtonsHook = () => {
  const dispatch = useDispatch()
  const { request, request2, mode, currentShape, response } = useSelector(state => state.cutOptimizer)

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'edit') {
      dispatch({ type: 'SET_MODE' })
    } else if (name === 'shapeInfo') {
      if (currentShape !== Number(value)) {
        dispatch({ type: 'SET_CURRENT_SHAPE', payload: Number(value) })
      }
    } else if (name === 'newShape') {
      request.push(Object.assign({}, DEFAULT_SHAPE))
      const request3 = JSON.parse(request2)
      const newShape = Object.assign({}, DEFAULT_SHAPE)
      newShape.cutLength = 0
      request3.push(newShape)

      dispatch({ type: 'CREATE_NEW_SHAPE', payload: JSON.stringify(request3) })
    } else if (name === 'optimize') {
      const request3 = []
      const request4 = JSON.parse(request2)
      const indexes = []

      request.forEach((shape, index) => {
        if (JSON.stringify(shape) !== JSON.stringify(request4[index]) && shape.list.length > 0) {
          const shape2 = JSON.stringify(shape)
          request3.push(JSON.parse(shape2))
          indexes.push(index)
        }
      })

      if (request3.length !== 0) {
        console.log('me estoy optimizando')
        request3.forEach(shape => {
          shape.list.sort((a, b) => b.length - a.length)
        })

        // 'https://cut-optimizator-api.now.sh/'

        fetchData('https://cut-optimizer-api.now.sh/', request3, 'POST')
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

            dispatch({ type: 'OPTIMIZE', payload: response })
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
