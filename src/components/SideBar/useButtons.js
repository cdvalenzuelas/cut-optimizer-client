// Dependencies
import { useDispatch, useSelector } from 'react-redux'

// Hooks
import fetchData from '../../utils/fetchData'

const useButtons = () => {
  const dispatch = useDispatch()
  const { request, mode, currentShape, response, elementsNames, shapeError } = useSelector(state => state.cutOptimizer)
  let { request2 } = useSelector(state => state.cutOptimizer)

  const handleChange = e => {
    const { name } = e.target

    if (name === 'edit') {
      dispatch({ type: 'SET_MODE', payload: { mode: mode === 'input' ? 'output' : 'input' } })
    } else if (name === 'newShape') {
      const DEFAULT_SHAPE = {
        shapeName: 'HEA-180',
        material: 'ASTM A36',
        defaultlengthBar: 6000,
        cutLength: 3,
        availableBars: [],
        list: []
      }

      request.push(Object.assign({}, DEFAULT_SHAPE))
      const request3 = JSON.parse(request2)
      const newShape = Object.assign({}, DEFAULT_SHAPE)
      newShape.cutLength = 0
      request3.push(newShape)

      shapeError.push(1)
      elementsNames.push([])

      dispatch({
        type: 'CREATE_NEW_SHAPE',
        payload: {
          request,
          request2: JSON.stringify(request3),
          currentShape: currentShape + 1,
          newElements: true,
          elementsNames,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name === 'optimize') {
      const request3 = []
      const request4 = JSON.parse(request2)
      const indexes = []

      request.forEach((shape, index) => {
        if (JSON.stringify(shape) !== JSON.stringify(request4[index]) && shapeError[index] === 0) {
          const shape2 = Object.assign({}, shape)
          request3.push(shape2)
          indexes.push(index)
        }
      })

      if (request3.length !== 0) {
        console.log('me estoy optimizando')
        request3.forEach(shape => {
          shape.list.sort((a, b) => b.length - a.length)
        })

        console.log(request3)

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

            request2 = JSON.stringify(request)

            dispatch({
              type: 'OPTIMIZE',
              payload: {
                request2,
                response,
                mode: 'output'
              }
            })
          })
          .catch(err => console.log(err))
      } else {
        dispatch({ type: 'SET_MODE', payload: { mode: mode === 'input' ? 'output' : 'input' } })
      }
    }
  }

  return { handleChange, request, mode, currentShape, shapeError }
}

export default useButtons
