import { useSelector } from 'react-redux'

function useOutput () {
  const { response, currentShape } = useSelector(state => state.cutOptimizer)
  let shape
  let maxLength
  let bars

  if (response[currentShape]) {
    shape = response[currentShape]
    bars = shape.bars
    maxLength = bars[0].length
    bars.forEach(bar => {
      if (bar.length > maxLength) {
        maxLength = bar.length
      }
    })
  }

  return { bars, maxLength }
}

export default useOutput
