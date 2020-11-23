import React, { useMemo, memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SettingsPage from './SettingsPage'

function Settings () {
  const { cutLength, defaultlengthBar, material, shapeName, lengths, lengths2, firstError } = useSelector(state => {
    const { request: request2, currentShape: currentShape2 } = state.cutOptimizer
    const currentShape = request2[currentShape2] || {}
    const { cutLength, defaultlengthBar, material, shapeName, list = [] } = currentShape
    const lengths = list.map(item => item.length)
    const lengths2 = JSON.stringify(lengths)
    const firstError = currentShape.error.settings
    return { cutLength, defaultlengthBar, material, shapeName, lengths, lengths2, firstError }
  })

  const dispatch = useDispatch()

  const [error, setError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [lengthError, setLengthError] = useState(false)
  const [materialError, setMaterialError] = useState(false)
  const [cutLengthError, setCutLengthError] = useState(false)

  const currenLengths = useMemo(() => lengths, [lengths2])
  const errors = useMemo(() => [nameError, lengthError, cutLengthError, materialError], [nameError, lengthError, cutLengthError, materialError])

  useEffect(() => {
    const cond1 = shapeName === ''
    if (cond1 && !nameError) {
      setNameError(true)
    } else if (!cond1 && nameError) {
      setNameError(false)
    }
  }, [shapeName])

  useEffect(() => {
    const cond1 = material === ''
    if (cond1 && !materialError) {
      setMaterialError(true)
    } else if (!cond1 && materialError) {
      setMaterialError(false)
    }
  }, [material])

  useEffect(() => {
    const cond1 = cutLength > defaultlengthBar
    if (cond1 && !cutLengthError) {
      setCutLengthError(true)
    } else if (!cond1 && cutLengthError) {
      setCutLengthError(false)
    }
  }, [cutLength, defaultlengthBar])

  useEffect(() => {
    const cond1 = currenLengths.some(item => item > defaultlengthBar) || defaultlengthBar < cutLength || defaultlengthBar < 1
    if (cond1 && !lengthError) {
      setLengthError(true)
    } else if (!cond1 && lengthError) {
      setLengthError(false)
    }
  }, [defaultlengthBar, JSON.stringify(currenLengths), cutLength])

  useEffect(() => {
    const cond1 = [nameError, cutLengthError, materialError, lengthError].includes(true)
    if (cond1 && !error) {
      setError(true)
    } else if (!cond1 && error) {
      setError(false)
    }
  }, [nameError, materialError, lengthError, cutLengthError])

  useEffect(() => {
    if (firstError !== error) {
      dispatch({ type: 'cutOptimizer/SET_SHAPE_ERROR', payload: { name: 'settings', value: error } })
    }
  }, [error, firstError])

  const handleChange = useCallback(e => {
    const { value, name } = e.target
    dispatch({ type: 'cutOptimizer/MODIFY_SHAPE', payload: { value, name } })
  }, [])

  return (
    <SettingsPage
      handleChange={handleChange}
      shapeName={shapeName}
      material={material}
      defaultlengthBar={defaultlengthBar}
      cutLength={cutLength}
      errors={errors}
    />
  )
}

export default memo(Settings)
