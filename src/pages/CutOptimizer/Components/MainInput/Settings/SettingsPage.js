import React, { memo } from 'react'
import TextInput from '@Components/TextInput'
import NumberInput from '@Components/NumberInput'

const SettingsPage = ({ handleChange, shapeName, material, defaultlengthBar, cutLength, errors }) => {
  return (
    <section className='SettingsContainer'>
      <TextInput
        name='shapeName'
        label='Shape'
        value={shapeName}
        placeholder='HEA-120'
        handleChange={handleChange}
        error={errors[0]}
      />
      <NumberInput
        name='defaultlengthBar'
        label='Length'
        value={defaultlengthBar}
        placeholder={6000}
        handleChange={handleChange}
        error={errors[1]}
      />
      <NumberInput
        name='cutLength'
        label='Cut Length'
        value={cutLength}
        placeholder={3}
        handleChange={handleChange}
        error={errors[2]}
      />
      <TextInput
        name='material'
        label='Material'
        value={material}
        placeholder='ASTM A36'
        handleChange={handleChange}
        error={errors[3]}
      />
    </section>
  )
}

export default memo(SettingsPage)
