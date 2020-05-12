// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

// Styles
import './styles.scss'

const Output = () => {
  const { response, currentShape } = useSelector((state) => state.cutOptimizer)
  const shape = response[currentShape]
  const { shape: shapeName, material, quantity } = shape

  return (
    <div>
      <div>
        <div>
          <h2>{shapeName}</h2>
          <h2>{material}</h2>
          <h2>{quantity}</h2>
        </div>
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
    </div>
  )
}

export default Output
