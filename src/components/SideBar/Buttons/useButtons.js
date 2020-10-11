import { useDispatch, useSelector } from 'react-redux'
import fetchData from '../../../utils/fetchData'

const DEFAULT_SHAPE = {
  shapeName: 'HEA-180',
  material: 'ASTM A36',
  defaultlengthBar: 6000,
  cutLength: 3,
  availableBars: [],
  list: []
}

const getShapesAndIndexes = (request, request2) => {
  const request3 = []
  const request4 = JSON.parse(request2)
  const indexes = []

  request.forEach((shape, index) => {
    if (JSON.stringify(shape) !== JSON.stringify(request4[index])) {
      const shape2 = Object.assign({}, shape)
      request3.push(shape2)
      indexes.push(index)
    }
  })

  request3.forEach(shape => shape.list.sort((a, b) => b.length - a.length))

  return { indexes, request3 }
}

const useButtons = () => {
  const dispatch = useDispatch()
  const { request, mode, currentShape, response, elementsNames, shapeError, readyToSend } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))
  const { loading } = useSelector(state => state.global)
  const { request2 } = useSelector(state => state.cutOptimizer)

  const handleChange = e => {
    const { name } = e.target

    if (name === 'edit') {
      dispatch({ type: 'SET_MODE', payload: { mode: mode === 'input' ? 'output' : 'input' } })
    } else if (name === 'newShape') {
      request.push(Object.assign({}, DEFAULT_SHAPE))
      shapeError.push(1)
      elementsNames.push([])

      dispatch({
        type: 'CREATE_NEW_SHAPE',
        payload: {
          request,
          request2: JSON.stringify(request),
          currentShape: currentShape + 1,
          newElements: true,
          elementsNames,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name === 'optimize' && readyToSend === 0) {
      const { indexes, request3 } = getShapesAndIndexes(request, request2)

      if (request3.length > 0) {
        dispatch({ type: 'SET_LOADING', payload: { loading: true } })

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

            dispatch({ type: 'SET_LOADING', payload: { loading: false } })

            dispatch({
              type: 'OPTIMIZE',
              payload: {
                request2: JSON.stringify(request),
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
