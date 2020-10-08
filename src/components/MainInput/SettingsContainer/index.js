import React from 'react'

import useSettings from './useSettings'

import TextInput from '../../TextInput'
import NumberInput from '../../NumberInput'

const SettingsContainer = () => {
  const { handleChange, shapeName, material, defaultlengthBar, cutLength } = useSettings()

  return (
    <section className='SettingsContainer'>
      <TextInput
        name='shapeName'
        label='Shape'
        value={shapeName}
        placeholder='HEA-120'
        handleChange={handleChange}
      />
      <NumberInput
        name='defaultlengthBar'
        label='Lenght'
        value={defaultlengthBar}
        placeholder={6000}
        min={0}
        max={40000}
        handleChange={handleChange}
      />
      <NumberInput
        name='cutLength'
        label='Cut Lenght'
        value={cutLength}
        placeholder={3}
        min={0}
        max={40000}
        handleChange={handleChange}
      />
      <TextInput
        name='material'
        label='Material'
        value={material}
        placeholder='ASTM A36'
        handleChange={handleChange}
      />
    </section>
  )
}

export default SettingsContainer
