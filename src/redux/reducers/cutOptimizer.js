const INITIAL_STATE = {
  mode: 'input',
  currentShape: -1,
  newElements: true,
  readyToSend: 1,
  shapeError: [],
  elementsNames: [],
  request2: '[]',
  request: [],
  response: []
}

const cutOptimizer = (state = INITIAL_STATE, { type, payload }) => {
  if (!payload) {
    payload = {}
  }

  switch (type) {
    case 'SET_MODE':
      return Object.assign({}, state, payload)
    case 'SET_CURRENT_SHAPE':
      return Object.assign({}, state, payload)
    case 'CREATE_NEW_SHAPE':
      return Object.assign({}, state, payload)
    case 'MODIFY_SHAPE':
      return Object.assign({}, state, payload)
    case 'DELETE_SHAPE':
      return Object.assign({}, state, payload)
    case 'ADD_ELEMENT':
      return Object.assign({}, state, payload)
    case 'MODIFY_ELEMENT':
      return Object.assign({}, state, payload)
    case 'DELETE_ELEMENT':
      return Object.assign({}, state, payload)
    case 'OPTIMIZE':
      return Object.assign({}, state, payload)
    case 'CHANGE_NEW_ELEMENTS':
      return Object.assign({}, state, payload)
    case 'ADD_AVAILABLE_BARS':
      return Object.assign({}, state, payload)
    case 'MODIFY_AVAILABLEBAR':
      return Object.assign({}, state, payload)
    case 'DELETE_AVAILABLEBAR':
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default cutOptimizer
