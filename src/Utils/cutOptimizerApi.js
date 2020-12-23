// 'https://cut-optimizer.vercel.app/optimizer'
// 'http://localhost:5001/optimizer'
const BASE_URL = 'http://localhost:5001/optimizer'

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
    })
  } catch (err) {
    error = 'INTERNAL SERVER ERROR'
  }

  return { data: currentResponse, error }
}
