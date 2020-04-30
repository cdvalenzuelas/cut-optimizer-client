// Dependencies
import React, { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { options } from './fakeData'

// Components
import Bars from '../Bars'

// Styles
import './styles.scss'

const App = () => {    
  const [display, setDisplay] = useState([])  
  const info = useFetch('http://localhost:5000', options)  

  const displayArray = info.data ? new Array(info.data.length).fill({display: 'none'}) : [{}]
  displayArray[0] = {}

  const handleClick = e => {    
    if( JSON.stringify(display[Number(e.target.value)]) !== '{}'){
      const displayArray2 = new Array(info.data.length).fill({display: 'none'})    
      displayArray2[Number(e.target.value)]={}        
      setDisplay(displayArray2)
    }    
  }

  useEffect(()=>{
    setDisplay(displayArray)
  },[])  

  console.log(display)
  
  return (
    <>
      <div className="buttonsContainer">
        { info.data && info.data.map((item,index)=> 
          <button key={index} value={`${index}`} onClick={handleClick}>{item.shape}</button>)
        }
      </div>      
      <div>
        { info.data && info.data.map((item, index) => <Bars item={item} key={index} display={display[index]}/> )}        
      </div>   
    </>
  )
}

export default App