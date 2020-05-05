// Dependencies
import React, { useState, useEffect } from 'react'
import { datos } from './fakeData'

// Components
import Layout1 from '../../layouts/Layout1'
import ButtonsContainer from '../../components/ButtonsContainer'
import Bars from '../../components/Bars'

// Styles
import './styles.scss'

// Hooks
import useOptimizator from './useOptimizer'

const defaultElement = {
  "shape":"HEA-180", 
  "material": 'ASTM A36', 
  "defaultlengthBar": 6000,
  "availableBars":[],
  "list": [
    {"name":"p001", "quantity": 5, "length": 1000}    
  ]
}

const options = data => ({
  body: JSON.stringify({
    user: {},
    items: [...data]
  }),
  method: 'POST',
  headers: {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Origin" : "*"      
  }
})

const Home = () => {    

  const [mode, setMode] = useState('input')
  const [request, setRequest] = useState([Object.assign({}, defaultElement)])
  const [response, setResponse] = useState({})
  const [display, setDisplay] = useState([])  

  useEffect(() => {setDisplay(displayArray)},[])

  useEffect(() => {
    if(mode === 'output'){
      (async () => {          
        try {     
          console.log('ejecutandome con el boton')  
          const res = await fetch('https://cut-optimizer-api.now.sh/', options(request))
          const data = await res.json()        
          setResponse(data)        
        } catch (error) {
          console.log(error)
        }       
      })()}
    }
  ,[mode])  

  const data = mode === 'input' ? request : response.data

  const displayArray = data ? new Array(data.length).fill({display: 'none'}) : [{}]
  displayArray[0] = {display:'initial'}  

  const handleClick = (e, shape, element) => {      
    const { name, value } = e.target
    if(name === 'optimizedShape' && JSON.stringify(display[Number(value)]) !== '{}'){      
      const displayArray2 = new Array(data.length).fill({display: 'none'})    
      displayArray2[Number(value)]={display:'initial'}        
      setDisplay(displayArray2)    
    } else if (name === 'shapeToOptimize'){
      const displayArray2 = new Array(data.length).fill({display: 'none'})    
      displayArray2[Number(value)]={display:'initial'}        
      setDisplay(displayArray2)   
    } else if (name === 'shape' || name === 'material'){   
      console.log(shape)     
      const request2 = [...request]    
      request2[shape][name] = value                       
      setRequest(request2)
    } else if (name == 'defaultLength'){         
      const request2 = [...request]     
      request2[shape][name] = value              
      setRequest(request2)
    } else if (name === 'new'){       
      setRequest([...request, Object.assign({}, defaultElement)])
    } else if (name === 'optimize'){    
      setMode('output')    
    } else if (name === 'edit') {      
      setMode('input')
    } else if (name === 'moreElements'){   
      const shape2 =  Object.assign({}, request[shape]) 
      const list2 = [...shape2.list]
      list2.push({"name":`p${list2.length}`, "quantity": 5, "length": 1000})  
      shape2.list = list2         
      const request2 = [...request]
      request2[shape] = shape2      
      setRequest(request2)
    } else if (name === 'deleteElements'){
      const request2 = [...request]
      request2[shape].list.splice(element, 1)      
      setRequest(request2)
    } else if (name === 'deleteShape'){
      const request2 = [...request]
      request2.splice(shape, 1)
      setRequest(request2)
    }
  }      

  return (
    <Layout1>
      <main className="container">
        <ButtonsContainer data={data} handleClick={handleClick} mode={mode} /> 
        { data && data.map((item, index) => 
          <Bars 
            mode={mode} 
            item={item} 
            key={index} 
            index={index}
            display={display[index]}
            handleClick={handleClick}
            />            
        )}               
      </main>
    </Layout1>
  )
}

export default Home