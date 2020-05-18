const DEFAULT_SHAPE = {
  shapeName: 'HEA-180',
  material: 'ASTM A36',
  defaultlengthBar: 6000,
  cutLength: 3,
  availableBars: [],
  list: [
    { name: 'P1', quantity: 1, length: 1000 }
  ]
}

const INITIAL_STATE = {
  mode: 'input',
  newElements: true,
  currentShape: 0,
  request2: '[]',
  request: [Object.assign({}, DEFAULT_SHAPE)],
  response: []
}

const cutOptimizer = (state = INITIAL_STATE, { type, payload }) => {
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
      return state
    case 'DELETE_SHAPE':
      state.request.splice(payload.currentShape, 1)
      state.currentShape = payload.currentShape - 1
      state.request2 = payload.request3
      return state
    case 'ADD_ELEMENT':
      state.request[payload].list.push({ name: 'pXXX', quantity: 5, length: 1000 })
      return state
    case 'DELETE_ELEMENT':
      state.request[payload.currentShape].list.splice(payload.element, 1)
      return state
    case 'MODIFY_SHAPE':
      state.request[payload.currentShape][payload.field] = payload.value
      state.request2 = payload.request3
      return state
    case 'MODIFY_ELEMENT':
      state.request[payload.currentShape].list[payload.element][payload.field] = payload.value
      state.request2 = payload.request3
      return state
    case 'OPTIMIZE':
      state.response = payload
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
      state.request[payload.currentShape].availableBars.push(payload.newAvailableBar)
      return state
    case 'DELETE_AVAILABLE_BAR':
      state.request[payload.curentShape].availableBars.splice(payload.availableBar, 1)
      return state
    case 'MODIFY_AVAILABLE_BAR':
      state.request[payload.currentShape].availableBars[payload.availableBar][payload.field] = payload.value
      return state
    default:
      return state
  }
}

export default cutOptimizer
