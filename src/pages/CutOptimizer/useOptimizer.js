import { useEffect, useState } from 'react'

const useOptimizator = (url, options, mode) => {
  
  const [response, setResponse] = useState({})    

  useEffect(() => {
    (async () => {          
      try {             
        const res = await fetch(url, options)
        const data = await res.json()        
        setResponse(data)        
      } catch (error) {
        console.log(error)
      }       
    })();
  },[url, options, mode]); 

  return response
}

export default useOptimizator