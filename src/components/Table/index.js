import React, { memo, useReducer, useEffect, useCallback } from 'react'
import TablePage from './TablePage'
import setInitialState from './setInitialState'
import addDefaultRow from './addDefaultRow'
import { reducer, initialState } from './reducer'
import './Styles.scss'

function Table ({ data = [], editable = true, reSize = true, widths, types, handleClick, getData, fields, titles, getItem, defaultItem, onAddRow, onDeleteRow, tableError, getError }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const payload = setInitialState({ data, fields, titles, types, editable, widths, reSize, tableError })
    dispatch({ type: 'SET_INITIAL_STATE', payload })
  }, [JSON.stringify(data)])

  const handleChange = useCallback((e, index, type) => {
    let { value, name } = e.target
    if (type === 'number') value = Number(value)
    getItem && getItem({ row: index, column: name, value })
    dispatch({ type: 'MODIFY_ROW', payload: { row: index, column: name, value } })
  }, [])

  useEffect(() => {
    getData && getData(state)
  }, [JSON.stringify(getData), JSON.stringify(state.data)])

  const addNewRow = useCallback(() => {
    const newRow = addDefaultRow(defaultItem, state)
    onAddRow && onAddRow(newRow)
    dispatch({ type: 'ADD_ROW', payload: newRow })
  }, [JSON.stringify(state)])

  const deleteRow = useCallback(row => {
    onDeleteRow && onDeleteRow(row)
    dispatch({ type: 'DELETE_ROW', payload: row })
  }, [JSON.stringify(state)])

  useEffect(() => {
    getError && getError(state.error)
  }, [String(state.error)])

  return (
    <TablePage
      editable={editable}
      reSize={reSize}
      handleChange={handleChange}
      handleClick={handleClick}
      addNewRow={addNewRow}
      deleteRow={deleteRow}
      data={state.data}
      widths={state.widths}
      fields={state.fields}
      types={state.types}
      titles={state.titles}
      errors={state.errors}
    />)
}

export default memo(Table)
