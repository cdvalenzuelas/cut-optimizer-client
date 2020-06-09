// Dependenies
import { useDispatch, useSelector } from 'react-redux'

function useNewElements () {
  const { request, currentShape, request2, elementsNames, shapeError } = useSelector(state => state.cutOptimizer)
  const list = request[currentShape] ? request[currentShape].list : undefined
  const dispatch = useDispatch()

  const handleChange = e => {
    let { name, value } = e.target

    if (name === 'addElement') {
      if (request[currentShape].list.length === 0) {
        shapeError[currentShape] = 0
      }

      request[currentShape].list.push({ name: 'PXXX', quantity: 1, length: 1000 })
      const request3 = JSON.parse(request2)
      request3[currentShape].list.push({ name: 'PXXX', quantity: 0, length: 1000 })
      elementsNames[currentShape].push('PXXX')

      if (request[currentShape].list.length >= 2) {
        const cond1 = request[currentShape].list.some(element2 => {
          const internalLenght = elementsNames[currentShape].filter(name2 => name2 === element2.name).length
          return internalLenght > 1
        })

        if (cond1) {
          shapeError[currentShape] = 1
        }
      }

      dispatch({
        type: 'ADD_ELEMENT',
        payload: {
          elementsNames,
          request2: JSON.stringify(request3),
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name.startsWith('elementName') || name.startsWith('elementQuantity') || name.startsWith('elementLength')) {
      const regex = /element(Name|Quantity|Length)(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[2])
      const field = match[1].toLowerCase()
      let request3 = request2
      const { defaultlengthBar } = request[currentShape]

      if (field === 'quantity' || field === 'length') {
        const regex2 = /([0]?)([0-9]+)([.])?([0-9]+)?/
        const match2 = regex2.exec(value)

        if (!match2[4] || !match2[3]) {
          value = Number(`${match2[2]}`)
        } else {
          value = Number(`${match2[2]}${match2[3]}${match2[4]}`)
        }

        console.log(value)

        if (field === 'quantity') {
          value = Number(value) < 1 ? 1 : Number(value)
        } else {
          value = Number(value) > defaultlengthBar ? defaultlengthBar : Number(value)
          value = Number(value) < 1 ? 1 : Number(value)
        }
      } else {
        request3 = JSON.parse(request2)
        request3[currentShape].list[element][field] = value
        request3 = JSON.stringify(request3)
      }

      if (field === 'name') {
        elementsNames[currentShape][element] = value
      }

      request[currentShape].list[element][field] = value

      const cond1 = request[currentShape].list.some(element2 => element2.length > request[currentShape].defaultlengthBar)
      const cond2 = request[currentShape].list.some(element2 => {
        const internalLenght = elementsNames[currentShape].filter(name2 => name2 === element2.name).length
        return internalLenght > 1
      })

      if (cond1 || cond2) {
        shapeError[currentShape] = 1
      } else {
        shapeError[currentShape] = 0
      }

      dispatch({
        type: 'MODIFY_ELEMENT',
        payload: {
          request,
          request2: request3,
          elementsNames,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    } else if (name.startsWith('deleteElement')) {
      const regex = /deleteElement(\d{1,})/
      const match = regex.exec(name)
      const element = Number(match[1])
      request[currentShape].list.splice(element, 1)
      elementsNames[currentShape].splice(element, 1)

      if (request[currentShape].list.length === 0) {
        shapeError[currentShape] = 1
      }

      dispatch({
        type: 'DELETE_ELEMENT',
        payload: {
          request,
          elementsNames,
          shapeError,
          readyToSend: shapeError.reduce((a, b) => a + b, 0)
        }
      })
    }
  }

  return {
    handleChange,
    list,
    elementsNames: elementsNames[currentShape],
    defaultlengthBar: request.length !== 0 ? request[currentShape].defaultlengthBar : 0
  }
}

export default useNewElements
