import React, { useMemo, useEffect, useCallback, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import TextInput from '@Components/TextInput'
import NumberInput from '@Components/NumberInput'

const initialState = {
  shapeName: 'HEA-120',
  material: 'ASTM-A36',
  defaultlengthBar: 6000,
  cutLength: 3,
  availableBars: [],
  useAvailableBars: true,
  nameError: false,
  materialError: false,
  defaultlengthBarError: false,
  cutLengthError: false,
  error: false
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'MODIFY_FIELD':
      state[payload.field] = payload.value
      return Object.assign({}, state)
    case 'SET_STATE':
      return Object.assign({}, state, { ...payload })
    default:
      return state
  }
}

const NewShape = ({ setShowModal, mode }) => {
  const dispatch = useDispatch()
  const modalRoot = useMemo(() => document.getElementById('modal'), [])
  const [state2, dispatch2] = useReducer(reducer, initialState)
  const {
    shapeName,
    material,
    defaultlengthBar,
    cutLength,
    nameError,
    materialError,
    defaultlengthBarError,
    cutLengthError,
    error,
    useAvailableBars,
    availableBars
  } = state2

  const { descriptions, lengths, cutLength2, defaultlengthBar2, material2, shapeName2, useAvailableBars2, availableBars2, serverAvailableBars } = useSelector(state => {
    const { request = [], currentShape, serverAvailableBars = [] } = state.cutOptimizer

    const {
      cutLength: cutLength2,
      defaultlengthBar: defaultlengthBar2,
      material: material2,
      shapeName: shapeName2,
      useAvailableBars: useAvailableBars2,
      list = []
    } = request[currentShape] || {}

    const availableBars2 = serverAvailableBars.filter(item => item.name === shapeName2 && item.material === material2)
    const descriptions = request.map(item => `${item.shapeName} ${item.material}`)
    const lengths = list.map(item => item.length)

    return {
      descriptions,
      lengths,
      cutLength2,
      defaultlengthBar2,
      material2,
      shapeName2,
      useAvailableBars2,
      availableBars2,
      serverAvailableBars
    }
  })

  useEffect(() => {
    if (mode === 'edit') {
      dispatch2({
        type: 'SET_STATE',
        payload: {
          shapeName: shapeName2,
          material: material2,
          defaultlengthBar: defaultlengthBar2,
          cutLength: cutLength2,
          useAvailableBars: useAvailableBars2,
          availableBars: availableBars2
        }
      })
    }
  }, [])

  useEffect(() => {
    const cond1 = cutLength > defaultlengthBar || cutLength <= 0
    const cond2 = lengths.some(item => item > defaultlengthBar) || defaultlengthBar < cutLength || defaultlengthBar < 1

    if (shapeName === '' && !nameError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'nameError', value: true } })
    } else if (shapeName !== '' && nameError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'nameError', value: false } })
    } else if (material === '' && !materialError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'materialError', value: true } })
    } else if (material !== '' && materialError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'materialError', value: false } })
    } else if (cond1 && !cutLengthError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'cutLengthError', value: true } })
    } else if (!cond1 && cutLengthError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'cutLengthError', value: false } })
    } else if (cond2 && !defaultlengthBarError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'defaultlengthBarError', value: true } })
    } else if (!cond2 && defaultlengthBarError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'defaultlengthBarError', value: false } })
    }
  }, [shapeName, material, defaultlengthBar, cutLength])

  useEffect(() => {
    const cond1 = nameError || materialError || cutLengthError || defaultlengthBarError
    const cond2 = descriptions.includes(`${shapeName} ${material}`)

    if (cond1 && !error) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'error', value: true } })
    } else if (!cond1 && error) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'error', value: false } })
    } else if (cond2 && !error) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'error', value: true } })
    } else if (!cond2 && error) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'error', value: false } })
    }
  }, [nameError, materialError, cutLengthError, defaultlengthBarError, shapeName, material])

  useEffect(() => {
    const availableBars2 = serverAvailableBars.filter(item => item.name === shapeName && item.material === material)
    dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'availableBars', value: availableBars2 } })
  }, [shapeName, material, JSON.stringify(serverAvailableBars)])

  const handleChange = useCallback(e => {
    const { name, value } = e.target

    if (name === 'defaultlengthBar' || name === 'cutLength') {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: name, value: Number(value) } })
    } else if (name === 'material' || name === 'shapeName') {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: name, value: value.toUpperCase() } })
    } else if (name === 'useAvailableBars') {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: name, value: !useAvailableBars } })
    }
  }, [useAvailableBars])

  const handleClick = useCallback(e => {
    e.preventDefault()
    const { name } = e.target
    const payload = { shapeName, material }
    const type = `cutOptimizer/${useAvailableBars ? 'ADD' : 'DELETE'}_AVAILABLE_BARS`

    if (name === 'create') {
      dispatch({ type: 'cutOptimizer/CREATE_SHAPE', payload: { ...payload, defaultlengthBar, cutLength, useAvailableBars } })
      dispatch({ type, payload: { ...payload, mode } })
    } else if (name === 'edit') {
      dispatch({ type: 'cutOptimizer/EDIT_SHAPE', payload: { ...payload, defaultlengthBar, cutLength, useAvailableBars } })
      dispatch({ type, payload: { ...payload, mode } })
    } else if (name === 'delete') {
      dispatch({ type: 'cutOptimizer/DELETE_SHAPE' })
    }

    setShowModal(false)
  }, [shapeName, material, defaultlengthBar, cutLength, useAvailableBars])

  return createPortal(
    <div className='Modal'>
      <form className='Form'>
        <TextInput
          name='shapeName'
          label='Shape'
          value={shapeName}
          placeholder='HEA-120'
          handleChange={handleChange}
          error={nameError}
        />
        <NumberInput
          name='defaultlengthBar'
          label='Length'
          value={defaultlengthBar}
          placeholder={6000}
          handleChange={handleChange}
          error={defaultlengthBarError}
        />
        <NumberInput
          name='cutLength'
          label='Cut Length'
          value={cutLength}
          placeholder={3}
          handleChange={handleChange}
          error={cutLengthError}
        />
        <TextInput
          name='material'
          label='Material'
          value={material}
          placeholder='ASTM A36'
          handleChange={handleChange}
          error={materialError}
        />
        {availableBars.length > 0 && <label>
          <span>Use Bars from Store</span>
          <input name='useAvailableBars' type='checkbox' checked={useAvailableBars === undefined ? false : useAvailableBars} onChange={handleChange} />
        </label>}
        <div>
          <button name='cancel' className='btn-primary' onClick={e => setShowModal(false)}>Cancel</button>
          <button name='delete' className='btn-primary' onClick={handleClick}>Delete</button>
          {!error && mode === 'create' && <button name='create' className='btn-secondary' onClick={handleClick}>Create</button>}
          {!error && mode === 'edit' && <button name='edit' className='btn-secondary' onClick={handleClick}>Edit</button>}
        </div>
      </form>
    </div>,
    modalRoot
  )
}

export default NewShape
