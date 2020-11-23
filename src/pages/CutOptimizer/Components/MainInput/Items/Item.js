import React, { useMemo, useState, useEffect, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import ItemPage from './ItemPage'

const Item = ({ item, quantity, length, name, defaultlengthBar, currentNames, getDataFromElements }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [lengthError, setLengthError] = useState(false)
  const [quantityError, setQuantityError] = useState(false)

  // Mira si hay error en el nombre del elemento
  useEffect(() => {
    if (currentNames.length > 1) {
      const cond1 = currentNames.filter(name2 => name2 === name).length
      if (!nameError && (cond1 > 1 || name === '')) {
        setNameError(true)
      } else if (nameError && cond1 === 1 && name !== '') {
        setNameError(false)
      }
    } else {
      if (name === '' && !error) {
        setNameError(true)
      } else if (error) {
        setNameError(false)
      }
    }
  }, [JSON.stringify(currentNames)])

  // Mira si hay un error en la longitud del elemento
  useEffect(() => {
    length > defaultlengthBar || length < 1 ? setLengthError(true) : setLengthError(false)
  }, [length, defaultlengthBar])

  // Mira si hay un error en la cantidad del elemento
  useEffect(() => {
    quantity < 1 ? setQuantityError(true) : setQuantityError(false)
  }, [quantity])

  useEffect(() => {
    const cond1 = [nameError, lengthError, quantityError].includes(true)

    if (cond1 && !error) {
      setError(true)
    } else if (!cond1 && error) {
      setError(false)
    }
  }, [nameError, lengthError, quantityError])

  useEffect(() => {
    getDataFromElements(item, false, error)
  }, [error])

  const handleChange = useCallback((e, item) => {
    const { name, value } = e.target

    if (name === 'name' || name === 'length' || name === 'quantity') {
      dispatch({ type: 'cutOptimizer/MODIFY_ELEMENT', payload: { item, name, value } })
    } else if (name === 'delete') {
      getDataFromElements(item, true)
      dispatch({ type: 'cutOptimizer/DELETE_ELEMENT', payload: { item } })
    }
  }, [])

  const normalStyles = useMemo(() => ({
    name: { backgroundColor: 'inherit' },
    length: { backgroundColor: 'inherit' },
    quantity: { backgroundColor: 'inherit' }
  }), [])

  const errorStyles = useMemo(() => ({
    name: { backgroundColor: 'red' },
    length: { backgroundColor: 'red' },
    quantity: { backgroundColor: 'red' }
  }), [])

  const styles = useMemo(() => ({
    name: nameError ? errorStyles.name : normalStyles.name,
    quantity: quantityError ? errorStyles.quantity : normalStyles.quantity,
    length: lengthError ? errorStyles.length : normalStyles.length
  }), [nameError, quantityError, lengthError])

  return (
    <ItemPage
      name={name}
      quantity={quantity}
      length={length}
      item={item}
      handleChange={handleChange}
      styles={styles}
    />
  )
}

export default memo(Item)
