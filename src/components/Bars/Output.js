// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

const Output = () => {
  const { response, currentShape } = useSelector((state) => state.cutOptimizer)
  const shape = response[currentShape]

  return (
    <div className='Bars'>
      <div>
        {shape.bars.map((bar, index2) => {
          return (
            <div key={index2} className='Bars_bar'>
              <h3>{`Length: ${bar.length} Quantity: ${bar.quantity}`}</h3>
              <h3>{bar.description}</h3>
              <div className='dataContainer'>
                <div className='dataContainer_bar'>
                  <div className='loadBar' style={{ width: `${bar.percentage}%` }} />
                </div>
                <div className='dataContainer_data'>
                  <span>{bar.percentage} %</span>
                  <span>{bar.availableLength} mm</span>
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
