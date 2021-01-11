import React, { memo, useMemo } from 'react'

import './Styles.scss'

const NumberInput = ({ label, value, placeholder, name, handleChange, error, disabled = false }) => {
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
    <label className='NumberInput' style={error ? styles.error : styles.succes}>
      {`${label}`}
      <input
        className='NumberInput-Input'
        name={name}
        type='number'
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </label>
  )
}

export default memo(NumberInput)
