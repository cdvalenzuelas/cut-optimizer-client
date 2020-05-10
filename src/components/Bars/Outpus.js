// Dependencies
import React from 'react'

// Styles
import './styles.scss'

const Output = ({item, display}) => {
  return(
    <div className='bars' style={display}>      
      {item.bars.map((bar, index) => <div key={index} className='bars__bar'>
        <h3>{`Length: ${bar.length} Quantity: ${bar.quantity}`}</h3>        
        <div className='dataContainer'>
          <div className='dataContainer__bar'>
            <div className='loadBar' style={{width: `${bar.percentage}%`}}></div>
          </div>          
          <div className='dataContainer__data'>
            <span>{bar.percentage} %</span>
            <span>{bar.availableLength} mm</span>
          </div>
        </div>                
      </div>)}      
    </div>
  )
}

export default Output