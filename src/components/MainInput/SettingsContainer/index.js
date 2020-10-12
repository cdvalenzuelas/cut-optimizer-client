import React from 'react'

import useSettings from './useSettings'

import TextInput from '../../TextInput'
import NumberInput from '../../NumberInput'

const SettingsContainer = () => {
  const { handleChange, shapeName, material, defaultlengthBar, cutLength, styles } = useSettings()

  return (
    <section className='SettingsContainer'>
      <TextInput
        name='shapeName'
        label='Shape'
        value={shapeName}
        placeholder='HEA-120'
        handleChange={handleChange}
        style={styles.shape}
      />
      <NumberInput
        name='defaultlengthBar'
        label='Length'
        value={defaultlengthBar}
        placeholder={6000}
        min={0}
        handleChange={handleChange}
        style={styles.defaultLengthBar}
      />
      <NumberInput
        name='cutLength'
        label='Cut Length'
        value={cutLength}
        placeholder={3}
        min={0}
        handleChange={handleChange}
        style={styles.cutLength}
      />
      <TextInput
        name='material'
        label='Material'
        value={material}
        placeholder='ASTM A36'
        handleChange={handleChange}
        style={styles.material}
      />
    </section>
  )
}

export default SettingsContainer
