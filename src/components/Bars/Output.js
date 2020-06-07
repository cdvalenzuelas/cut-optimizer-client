// Dependencies
import React from 'react'
import useOutput from './useOutput'

const Output = () => {
  const { bars, maxLength } = useOutput()

  return (
    <div className='Bars'>
      {
        bars &&
          <div>
            {bars.map((bar, index2) => {
              return (
                <div key={index2} className='Bars_bar' style={{ width: '80%' }}>
                  <div className='Bars-info'>
                    <h3>{`Length: ${bar.length} Quantity: ${bar.quantity}`}</h3>
                    <div>
                      <span>Percentage: {bar.percentage} %</span>
                      <span>Available Length: {bar.availableLength} mm</span>
                    </div>
                  </div>
                  <h4>Distribution: {bar.description}</h4>
                  <div className='loadWrapper' style={{ width: `${bar.length * 100 / maxLength}%` }}>
                    <div className='loadBar' style={{ width: `${bar.percentage}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
      }
    </div>
  )
}

export default Output
