import { useDispatch, useSelector } from 'react-redux'
import fetchData from '../../../utils/fetchData'
import getShapesAndIndexes from './getShapesAndIndexes'

const useButtons = () => {
  const dispatch = useDispatch()
  const { request, mode, currentShape, response, elementsNames, shapeError, readyToSend, request2 } = useSelector(state => Object.assign({}, state.cutOptimizer, {}))

  const handleChange = e => {
    const { name } = e.target

    if (name === 'edit') {
      dispatch({ type: 'SET_MODE', payload: { mode: mode === 'input' ? 'output' : 'input' } })
    } else if (name === 'newShape') {
      request.push({
        shapeName: 'HEA-180',
        material: 'ASTM A36',
        defaultlengthBar: 6000,
        cutLength: 3,
        availableBars: [],
        list: []
      })
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
            dispatch({ type: 'OPTIMIZE', payload: { request2: JSON.stringify(request), response, mode: 'output' } })
          })
          .catch(err => dispatch({ type: 'SET_ERROR', payload: { errre: 'INTERNAL SERVER ERROR' } }))
      } else {
        dispatch({ type: 'SET_MODE', payload: { mode: mode === 'input' ? 'output' : 'input' } })
      }
    }
  }

  return { handleChange, request, mode, currentShape, shapeError }
}

export default useButtons
