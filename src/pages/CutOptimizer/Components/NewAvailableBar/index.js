import React, { memo, useMemo, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import TextInput from '@Components/TextInput'
import { addNewAvailableBar } from '@Firebase/cutOptimizer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const NewAvailableBar = ({ setShowModal }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const modalRoot = useMemo(() => document.getElementById('modal'), [])
  const [error, setError] = useState(true)
  const [name, setName] = useState('HEA-120')
  const [material, setMaterial] = useState('ASTM-A36')

  const { uid, availableBars } = useSelector(state => {
    const { uid } = state.global.user
    const { serverAvailableBars } = state.cutOptimizer

    let availableBars = JSON.stringify(serverAvailableBars)
    availableBars = JSON.parse(availableBars)
    availableBars = availableBars.map(item => `${item.name} ${item.material}`)

    return { uid, availableBars }
  })

  const addAvailableBar = useCallback(e => {
    e.preventDefault()
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
    addNewAvailableBar(uid, name, material, [{ length: 6000, quantity: 1 }])
      .then(data => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({
          type: 'cutOptimizer/ADD_SERVER_AVAILABLE_BAR',
          payload: {
            availableBarsId: data.id,
            data: [{ length: 6000, quantity: 1 }],
            name,
            material,
            uid
          }
        })

        setShowModal(false)
        history.push(`/cutOptimizer/bars_store/${data.id}`)
      })
      .catch(err => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
      })
  }, [name, material])

  useEffect(() => {
    const cond1 = availableBars.includes(`${name} ${material}`)

    if (cond1 && !error) {
      setError(true)
    } else if (!cond1 && error) {
      setError(false)
    }
  }, [name, material])

  const handleChange = useCallback(e => {
    const { name, value } = e.target

    if (name === 'name') {
      setName(value)
    } else if (name === 'material') {
      setMaterial(value)
    }
  }, [])

  return createPortal(
    <div className='Modal'>
      <form className='Form'>
        <TextInput
          label='Name'
          name='name'
          placeholder='HEA-120'
          value={name}
          error={error}
          handleChange={handleChange}
        />
        <TextInput
          label='Material'
          name='material'
          placeholder='ASTM-A36'
          value={material}
          error={error}
          handleChange={handleChange}
        />
        <div>
          <button name='cancel' className='btn-primary' onClick={e => setShowModal(false)}>Cancel</button>
          {!error && <button name='save' className='btn-secondary' onClick={addAvailableBar}>Save</button>}
        </div>
      </form>
    </div>,
    modalRoot
  )
}

export default memo(NewAvailableBar)
