
const fetchData = async (url, data, method) => {
  try {
    const requestObject = {
      body: JSON.stringify({
        user: {},
        items: [...data]
      }),
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    const res = await window.fetch(url, requestObject)
    const data2 = await res.json()
    return data2
  } catch (error) {
    console.log(error)
  }
}

export default fetchData
