import React from 'react'

import './styles.scss'

const TextInput = ({ label, value, placeholder, name, handleChange, style }) => {
  return (
    <label className='TextInput' style={{ backgroundColor: style }}>
      {`${label}`}
      <input
        className='TextInput-Input'
        name={name}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  )
}

export default TextInput
