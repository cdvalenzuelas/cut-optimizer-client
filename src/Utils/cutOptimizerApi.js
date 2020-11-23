const BASE_URL = 'https://cut-optimizer-api.now.sh/'

export const getOptimizedBars = async (data, shapesThatChanges, currentResponse) => {
  let data2
  let error

  try {
    data2 = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ items: data, user: {} }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    data2 = await data2.json()

    data2.data.forEach((shape, index) => {
      const index2 = shapesThatChanges[index]
      currentResponse[index2] = shape
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
  } catch (err) {
    error = 'INTERNAL SERVER ERROR'
  }

  return { data: currentResponse, error }
}
