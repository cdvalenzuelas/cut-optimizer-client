const DEFAULT_SHAPE = {
  shape: 'HEA-180',
  material: 'ASTM A36',
  defaultlengthBar: 6000,
  availableBars: [],
  list: [
    { name: 'p1', quantity: 5, length: 1000 }
  ]
}

const INITIAL_STATE = {
  mode: 'input',
  response: [],
  request: [Object.assign({}, DEFAULT_SHAPE)],
  request2: '[]',
  currentShape: 0,
  totalShapes: 1
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
      return state
    case 'DELETE_SHAPE':
      state.request.splice(payload, 1)
      return state
    case 'ADD_ELEMENT':
      state.request[payload].list.push({ name: 'pXXX', quantity: 5, length: 1000 })
      return state
    case 'DELETE_ELEMENT':
      state.request[payload.shape].list.splice(payload.element, 1)
      return state
    case 'MODIFY_SHAPE':
      state.request[payload.shape][payload.field] = payload.value
      return state
    case 'MODIFY_ELEMENT':
      state.request[payload.shape].list[payload.element][payload.field] = payload.value
      return state
    case 'OPTIMIZE':
      state.response = payload
      state.request2 = JSON.stringify(state.request)
      state.mode = 'output'
      return state
    case 'SET_CURRENT_SHAPE':
      state.currentShape = payload
      return state
    default:
      return state
  }
}

export default cutOptimizer
