import React, { useMemo, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemsPage from './ItemsPage'

const Items = () => {
  const { names, lengths, quantities, defaultlengthBar, firstError } = useSelector(state => {
    const { request, currentShape } = state.cutOptimizer
    const { list = [], error = {}, defaultlengthBar = 6000 } = request[currentShape] || {}
    const firstError = error.items || true
    const names = list.map(item => item.name)
    const lengths = list.map(item => item.length)
    const quantities = list.map(item => item.quantity)

    return { names, lengths, quantities, defaultlengthBar, firstError }
  })
  const dispatch = useDispatch()

  const [error, setError] = useState(true)

  const currentNames = useMemo(() => names, [JSON.stringify(names)])
  const currenLengths = useMemo(() => lengths, [JSON.stringify(lengths)])
  const currentQuantities = useMemo(() => quantities, [JSON.stringify(quantities)])
  const myArray = useMemo(() => [], [])

  useEffect(() => {
    if (currentNames.length === 0) {
      setError(true)
    }
  }, [currentNames.length])

  useEffect(() => {
    if (firstError !== error) {
      dispatch({ type: 'cutOptimizer/SET_SHAPE_ERROR', payload: { name: 'items', value: error } })
    }
  }, [error, firstError])

  const getDataFromElements = useCallback((item, deleted, itemError) => {
    deleted ? myArray.splice(item, 1) : myArray[item] = itemError
    const cond1 = myArray.length

    if (cond1 === 0 && !error) {
      setError(true)
    } else if (cond1 > 0) {
      const cond2 = myArray.includes(true)
      if (cond2 && !error) {
        setError(true)
      } else if (!cond2 && error) {
        setError(false)
      }
    }
  }, [myArray, error])

  const handleChange = useCallback(e => {
    dispatch({ type: 'cutOptimizer/ADD_ELEMENT' })
  }, [])

  return (
    <ItemsPage
      handleChange={handleChange}
      currentNames={currentNames}
      currenLengths={currenLengths}
      currentQuantities={currentQuantities}
      defaultlengthBar={defaultlengthBar}
      getDataFromElements={getDataFromElements}
    />)
}

export default memo(Items)
