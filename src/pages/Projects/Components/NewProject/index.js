import React, { memo, useMemo, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useHistory } from 'react-router-dom'
import { addNewProject } from '@Firebase/projects'
import { useSelector, useDispatch } from 'react-redux'
import TextInput from '@Components/TextInput'

const NewProject = ({ setShowModal }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const modalRoot = useMemo(() => document.getElementById('modal'), [])
  const [nameError, setNameError] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const uid = useSelector(state => state.global.user.uid)

  const addProject = useCallback(e => {
    e.preventDefault()
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })
    addNewProject(uid, name, description, 'cutOptimizer')
      .then(data => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({ type: 'cutOptimizer/CREATE_NEW_PROJECT', payload: { value: data.id } })

        setShowModal(false)
        history.push(`/${data.tool}/${data.id}`)
      })
      .catch(err => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
      })
  }, [name, description])

  useEffect(() => {
    if (name === '' && !nameError) {
      setNameError(true)
    } else if (name !== '' && nameError) {
      setNameError(false)
    }
  }, [name])

  const handleChange = useCallback(e => {
    const { name, value } = e.target

    if (name === 'name') {
      setName(value.toUpperCase())
    } else if (name === 'description') {
      setDescription(value.toUpperCase())
    }
  }, [])

  return createPortal(
    <div className='Modal'>
      <form className='Form'>
        <TextInput
          label='Name'
          name='name'
          placeholder='Project 1'
          value={name}
          error={nameError}
          handleChange={handleChange}
        />
        <TextInput
          label='Description'
          name='description'
          placeholder='My firts Project'
          value={description}
          handleChange={handleChange}
        />
        <div>
          <button name='cancel' className='btn-primary' onClick={e => setShowModal(false)}>Cancel</button>
          {!nameError && <button name='save' className='btn-secondary' onClick={addProject}>Save</button>}
        </div>
      </form>
    </div>,
    modalRoot
  )
}

export default memo(NewProject)
