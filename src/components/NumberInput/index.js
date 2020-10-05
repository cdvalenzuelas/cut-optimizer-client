import React from 'react'

import './styles.scss'

const NumberInput = ({
  label,
  value,
  placeholder,
  min,
  max,
  name,
  handleChange
}) => {
  return (
    <label className='NumberInput'>
      {`${label}`}
      <input
        className='NumberInput-Input'
        name={name}
        type='number'
        value={value || placeholder}
        placeholder={placeholder}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </label>
  )
}

export default NumberInput
