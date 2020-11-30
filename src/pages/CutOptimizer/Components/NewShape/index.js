import React, { useMemo, useEffect, useCallback, useReducer } from 'react'
import { createPortal } from 'react-dom'
import TextInput from '@Components/TextInput'
import NumberInput from '@Components/NumberInput'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  shapeName: 'HEA-120',
  material: 'ASTM-A36',
  defaultlengthBar: 6000,
  cutLength: 3,
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
  const { shapeName, material, defaultlengthBar, cutLength, nameError, materialError, defaultlengthBarError, cutLengthError, error } = state2

  const { descriptions, lengths, cutLength2, defaultlengthBar2, material2, shapeName2 } = useSelector(state => {
    const { request, currentShape } = state.cutOptimizer
    const shape = request[currentShape] || {}
    const { cutLength: cutLength2, defaultlengthBar: defaultlengthBar2, material: material2, shapeName: shapeName2, list = [] } = shape
    const descriptions = request.map(item => `${item.shapeName} ${item.material}`)
    const lengths = list.map(item => item.length)
    return { descriptions, lengths, cutLength2, defaultlengthBar2, material2, shapeName2 }
  })

  useEffect(() => {
    if (mode === 'edit') {
      dispatch2({
        type: 'SET_STATE',
        payload: {
          shapeName: shapeName2,
          material: material2,
          defaultlengthBar: defaultlengthBar2,
          cutLength: cutLength2
        }
      })
    }
  }, [])

  useEffect(() => {
    const cond1 = lengths.some(item => item > defaultlengthBar) || defaultlengthBar < cutLength || defaultlengthBar < 1

    if (shapeName === '' && !nameError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'nameError', value: false } })
    } else if (shapeName !== '' && nameError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'nameError', value: false } })
    } else if (material === '' && !materialError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'materialError', value: true } })
    } else if (material !== '' && materialError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'materialError', value: false } })
    } else if (cutLength > defaultlengthBar && !cutLengthError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'cutLengthError', value: true } })
    } else if (cutLength > defaultlengthBar && cutLengthError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'cutLengthError', value: false } })
    } else if (cond1 && !defaultlengthBarError) {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: 'defaultlengthBarError', value: true } })
    } else if (!cond1 && defaultlengthBarError) {
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

  const handleChange = useCallback(e => {
    const { name, value } = e.target

    if (name === 'defaultlengthBar' || name === 'cutLength') {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: name, value: Number(value) } })
    } else {
      dispatch2({ type: 'MODIFY_FIELD', payload: { field: name, value } })
    }
  }, [])

  const handleClick = useCallback(e => {
    e.preventDefault()
    const { name } = e.target

    if (name === 'create') {
      dispatch({
        type: 'cutOptimizer/CREATE_SHAPE',
        payload: { shapeName, material, defaultlengthBar, cutLength }
      })
    } else if (name === 'edit') {
      dispatch({
        type: 'cutOptimizer/EDIT_SHAPE',
        payload: { shapeName, material, defaultlengthBar, cutLength }
      })
    }
    setShowModal(false)
  }, [shapeName, material, defaultlengthBar, cutLength])

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
        <div>
          <button name='cancel' className='btn-primary' onClick={e => setShowModal(false)}>Cancel</button>
          {!error && mode === 'create' && <button name='create' className='btn-secondary' onClick={handleClick}>Create</button>}
          {!error && mode === 'edit' && <button name='edit' className='btn-secondary' onClick={handleClick}>Edit</button>}
        </div>
      </form>
    </div>,
    modalRoot
  )
}

export default NewShape
