import React, { memo, useReducer, useEffect, useCallback } from 'react'
import TablePage from './TablePage'
import './Styles.scss'

const initialState = { data: [] }

const reducer = (state, { type, payload }) => {
  const { data } = state

  switch (type) {
    case 'ADD_ROW':
      data.push(payload)
      return Object.assign({}, state, { data })
    case 'MODIFY_ROW':
      data[payload.index][payload.field] = payload.value
      return Object.assign({}, state, { data })
    case 'SET_INITIAL_STATE':
      return payload
    default:
      return state
  }
}

function Table ({ data = [], editable, newRow, widths, types, handleClick, getState, fields, titles }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let fields2

    if (fields) {
      fields2 = fields
    } else if (data.length > 0) {
      fields2 = Object.keys(data[0])
    } else {
      fields2 = ['Column']
    }

    const titles2 = [...fields2]
    const titlesKeys = titles ? Object.keys(titles) : []
    const titlesValues = titles ? Object.values(titles) : []

    titlesKeys.forEach((item, index) => {
      const index2 = titles2.indexOf(item)

      if (index2 >= 0) {
        titles2[index2] = titlesValues[index]
      }
    })

    const types2 = new Array(fields2.length).fill('text')
    const typesKeys = types ? Object.keys(types) : []
    const typesValues = types ? Object.values(types) : []

    typesKeys.forEach((item, index) => {
      const index2 = fields2.indexOf(item)

      if (index2 >= 0) {
        types2[index2] = typesValues[index]
      }
    })

    dispatch({
      type: 'SET_INITIAL_STATE',
      payload: {
        editables: editable ? [...fields2] : new Array(fields2.length).fill(false),
        types: types2,
        widths: widths || new Array(fields2.length).fill(`${100 / fields2.length}%`),
        fields: [...fields2],
        fields2,
        data,
        titles: titles2
      }
    })
  }, [JSON.stringify(data)])

  const handleChange = useCallback((e, index, type) => {
    let { value, name } = e.target

    if (type === 'number') {
      value = Number(value)
    }

    dispatch({ type: 'MODIFY_ROW', payload: { index, field: name, value } })
  }, [])

  useEffect(() => {
    getState && getState.action(state)
  }, [JSON.stringify(getState), JSON.stringify(state)])

  const addNewRow = useCallback((e) => {
    const newRow = {}

    state.fields.forEach((field, index) => {
      if (state.types[index] === 'number') {
        newRow[field] = 1
      } else {
        newRow[field] = ''
      }
    })

    dispatch({ type: 'ADD_ROW', payload: newRow })
  }, [JSON.stringify(state)])

  return <TablePage
    editable={editable}
    newRow={newRow}
    handleChange={handleChange}
    handleClick={handleClick}
    addNewRow={addNewRow}
    data={state.data}
    widths={state.widths}
    fields={state.fields}
    types={state.types}
    titles={state.titles}
  />
}

export default memo(Table)
