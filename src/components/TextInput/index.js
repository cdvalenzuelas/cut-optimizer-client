import React, { memo, useMemo } from 'react'

import './Styles.scss'

const TextInput = ({ label, value, placeholder, name, handleChange, error }) => {
  const styles = useMemo(() => {
    return ({
      error: {
        backgroundColor: 'red'
      },
      succes: {
        backgroundColor: 'inherit'
      }
    })
  }, [])

  return (
    <label className='TextInput' style={error ? styles.error : styles.succes}>
      {`${label}`}
      <input
        className='TextInput-Input'
        name={name}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete='false'
      />
    </label>
  )
}

export default memo(TextInput)
