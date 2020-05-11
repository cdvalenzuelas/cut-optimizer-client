// Dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Styles
import './styles.scss'

const Output = () => {  
  const { response } = useSelector(state => state.cutOptimizer)

  return(
    <div>      
      {response.map((shape, index) => <div key={index}>
        <div>
          <h2>{shape.shape}</h2> 
          <h2>{shape.material}</h2> 
          <h2>{shape.quantity}</h2>
        </div>
        <div>
          {
            shape.bars.map((element, index2) => {
              return(
                <div key={index2} className='bars__bar'>
                  <h3>{`Length: ${element.length} Quantity: ${element.quantity}`}</h3>
                  <div className='dataContainer'>
                    <div className='dataContainer__bar'>
                      <div className='loadBar' style={{width: `${element.percentage}%`}}></div>
                    </div>          
                    <div className='dataContainer__data'>
                      <span>{element.percentage} %</span>
                      <span>{element.availableLength} mm</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      )}      
    </div>
  )
}

export default Output