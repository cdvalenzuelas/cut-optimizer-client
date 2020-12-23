// 'https://cut-optimizer.vercel.app/bars_store'
// 'http://localhost:5001/bars_store'
const BASE_URL = 'http://localhost:5001/bars_store'

export const barsStoreApi = async (uid, data) => {
  let data2
  let error

  try {
    data2 = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify({ uid, data }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    data2 = await data2.json()
    console.log(data2)
  } catch (err) {
    error = 'INTERNAL SERVER ERROR'
  }
}
