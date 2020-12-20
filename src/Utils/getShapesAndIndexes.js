const getShapesAndIndexes = (request, request2) => {
  request = JSON.stringify(request)
  request = JSON.parse(request)
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

  request3.forEach(shape => {
    shape.availableBars.sort((a, b) => a.length - b.length)
    shape.list.sort((a, b) => b.length - a.length)
  })

  return { indexes, request3 }
}

export default getShapesAndIndexes
