import React from 'react'

import './styles.scss'

const TextInput = ({ label, value, placeholder, name, handleChange }) => {
  return (
    <label className='TextInput'>
      {`${label}`}
      <input
        className='TextInput-Input'
        name={name}
        type='text'
        value={value || placeholder}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  )
}

export default TextInput
