import { useState } from 'react'

const options = (data, method) => ({
  body: JSON.stringify({
    user: {},
    items: [...data]
  }),
  method,
  headers: {
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'      
  }
})

const useFetch = (url, data, method) => {
  const [response, setResponse] = useState([])
  const requestObject = options(data, method)

  (async () => {
    const res = await fetch(url, requestObject);
    const data = await res.json();    
    setResponse(data);
  })() 

  return {response};
}

export default useFetch