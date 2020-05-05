import { useState, useEffect } from 'react'

const useFetch = (url, options) => {
  const [data, setData] = useState({});
  const [option2, setOption2] = useState(JSON.stringify(options))  
  useEffect(() => {
    (async () => {
      const res = await fetch(url, options);
      const data = await res.json();
      console.log('data')
      setData(data);
    })();
  },[url, option2]);

  return data;
}

export default useFetch