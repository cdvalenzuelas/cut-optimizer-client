const DEFAULT_SHAPE = {
  shapeName: 'HEA-180',
  material: 'ASTM A36',
  defaultlengthBar: 6000,
  cutLength: 3,
  availableBars: [],
  list: []
}

const INITIAL_STATE = {
  mode: 'input',
  newElements: true,
  currentShape: -1,
  readyToSend: false,
  shapesChanges: [],
  elementsNames: [],
  request2: '[]',
  request: [],
  response: []
}

const cutOptimizer = (state = INITIAL_STATE, { type, payload }) => {
  const { currentShape } = state
  state = JSON.stringify(state)
  state = JSON.parse(state)

  switch (type) {
    case 'SET_MODE':
      state.mode = state.mode === 'input' ? 'output' : 'input'
      return state
    case 'SET_DISPLAY':
      return state
    case 'CREATE_NEW_SHAPE':
      state.request.push(Object.assign({}, DEFAULT_SHAPE))
      state.currentShape++
      state.newElements = true
      state.shapesChanges.push(true)
      state.elementsNames.push([])
      return state
    case 'DELETE_SHAPE':
      state.request.splice(currentShape, 1)
      state.shapesChanges.splice(currentShape, 1)
      state.currentShape -= 1
      state.request2 = payload
      state.elementsNames.splice(currentShape, 1)
      return state
    case 'ADD_ELEMENT':
      state.request[payload].list.push({ name: 'PXXX', quantity: 1, length: 1000 })
      state.elementsNames[currentShape].push('PXXX')
      return state
    case 'DELETE_ELEMENT':
      state.request[currentShape].list.splice(payload, 1)
      state.elementsNames[currentShape].splice(payload, 1)
      return state
    case 'MODIFY_SHAPE':
      state.request[currentShape][payload.field] = payload.value
      state.request2 = payload.request3
      state.shapesChanges[currentShape] = payload.shapesChanges
      return state
    case 'MODIFY_ELEMENT':
      state.request[currentShape].list[payload.element][payload.field] = payload.value
      state.request2 = payload.request3
      state.shapesChanges[currentShape] = payload.shapesChanges
      if (payload.field === 'name') {
        state.elementsNames[currentShape][payload.element] = payload.value
      }
      return state
    case 'OPTIMIZE':
      state.response = payload.data
      state.shapesChanges = payload.shapesChanges
      state.request2 = JSON.stringify(state.request)
      state.mode = 'output'
      return state
    case 'SET_CURRENT_SHAPE':
      state.currentShape = payload
      return state
    case 'CHANGE_NEW_ELEMENTS':
      state.newElements = payload
      return state
    case 'ADD_AVAILABLE_BARS':
      state.request[currentShape].availableBars.push(payload.newAvailableBar)
      return state
    case 'DELETE_AVAILABLE_BAR':
      state.request[currentShape].availableBars.splice(payload.availableBar, 1)
      return state
    case 'MODIFY_AVAILABLE_BAR':
      state.request[currentShape].availableBars[payload.availableBar][payload.field] = payload.value
      return state
    default:
      return state
  }
}

export default cutOptimizer
