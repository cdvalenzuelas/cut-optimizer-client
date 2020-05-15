// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

// Styles
import './styles.scss'

const Output = () => {
  const { response, currentShape } = useSelector((state) => state.cutOptimizer)
  const shape = response[currentShape]

  return (
    <div className='bars'>
      <div>
        {shape.bars.map((element, index2) => {
          return (
            <div key={index2} className='bars__bar'>
              <h3>{`Length: ${element.length} Quantity: ${element.quantity}`}</h3>
              <div className='dataContainer'>
                <div className='dataContainer__bar'>
                  <div className='loadBar' style={{ width: `${element.percentage}%` }} />
                </div>
                <div className='dataContainer__data'>
                  <span>{element.percentage} %</span>
                  <span>{element.availableLength} mm</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Output
