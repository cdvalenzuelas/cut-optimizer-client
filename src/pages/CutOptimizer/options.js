const options = data => ({
  body: JSON.stringify({
    user: {},
    items: [...data]
  }),
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'      
  }
})

export default options