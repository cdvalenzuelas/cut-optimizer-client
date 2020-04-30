//Dependencies
import React from 'react'
import './styles.scss'

const Bars = ({item, display}) => {  
  return(
    <div className='bars' style={display}>
      <h2>{`SHAPE: ${item.shape} MATERIAL: ${item.material} QUANTITY: ${item.quantity}`}</h2>
      {item.bars.map((bar, index) => <div key={index}>
        <h3>{`Length: ${bar.length} Quantity: ${bar.quantity}`}</h3>        
        <div className="dataContainer">
          <div className="dataContainer__bar">
            <div className="loadBar" style={{width: `${bar.percentage}%`}}></div>
          </div>          
          <div className="dataContainer__data">
            <span>{bar.percentage} %</span>
            <span>{bar.availableLength} mm</span>
          </div>
        </div>                
      </div>)}      
    </div>
  )
}

export default Bars