import React, { useMemo, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@Components/Table'

const Items = () => {
  const { names, defaultlengthBar, status, list } = useSelector(state => {
    const { request, currentShape, status } = state.cutOptimizer
    const { list = [], defaultlengthBar = 6000 } = request[currentShape] || {}
    const names = list.map(item => item.name)

    return { names, defaultlengthBar, status, list }
  })

  const dispatch = useDispatch()

  const currentNames = useMemo(() => names, [JSON.stringify(names)])

  const getItem = useCallback(({ row, column, value }) => {
    dispatch({ type: 'cutOptimizer/MODIFY_ELEMENT', payload: { item: row, name: column, value } })
  }, [])

  const onAddRow = useCallback(newItem => {
    dispatch({ type: 'cutOptimizer/ADD_ELEMENT' })
  }, [])

  const onDeleteRow = useCallback(row => {
    dispatch({ type: 'cutOptimizer/DELETE_ELEMENT', payload: { item: row } })
  }, [])

  const tableError = useMemo(() => ({
    quantity: item => item.quantity < 1,
    length: item => item.length > defaultlengthBar || item.length < 1,
    name: item => currentNames.filter(name => name === item.name).length > 1 || item.name === ''
  }), [defaultlengthBar, currentNames])

  const getError = useCallback(error => {
    dispatch({ type: 'cutOptimizer/SET_SHAPE_ERROR', payload: { value: error } })
  }, [])

  return (
    <Table
      data={list}
      fields={['name', 'length', 'quantity']}
      types={{ length: 'number', name: 'text', quantity: 'number' }}
      defaultItem={{ name: 'PXXX', length: Math.round(defaultlengthBar * 0.5), quantity: 1 }}
      editable={status === 'active'}
      reSize={status === 'active'}
      tableError={tableError}
      getItem={getItem}
      onAddRow={onAddRow}
      onDeleteRow={onDeleteRow}
      getError={getError}
    />)
}

export default memo(Items)
