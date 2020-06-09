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

  const { mode, currentShape, newElements, shapeError, readyToSend, elementsNames, request2, request, response } = payload

  switch (type) {
    case 'SET_MODE':
      return Object.assign({}, state, { mode })
    case 'SET_CURRENT_SHAPE':
      return Object.assign({}, state, { currentShape })
    case 'CREATE_NEW_SHAPE':
      return Object.assign({}, state, { request, currentShape, newElements, elementsNames, request2, shapeError, readyToSend })
    case 'MODIFY_SHAPE':
      return Object.assign({}, state, { request, request2 })
    case 'DELETE_SHAPE':
      return Object.assign({}, state, { currentShape, request2, elementsNames, shapeError, readyToSend })
    case 'ADD_ELEMENT':
      return Object.assign({}, state, { request2, elementsNames, shapeError, readyToSend })
    case 'MODIFY_ELEMENT':
      return Object.assign({}, state, { request, request2, elementsNames, readyToSend })
    case 'DELETE_ELEMENT':
      return Object.assign({}, state, { request, elementsNames, shapeError, readyToSend })
    case 'OPTIMIZE':
      return Object.assign({}, state, { request2, response, mode })
    case 'CHANGE_NEW_ELEMENTS':
      return Object.assign({}, state, { newElements })
    case 'ADD_AVAILABLE_BARS':
      return Object.assign({}, state, { request })
    case 'MODIFY_AVAILABLE_BAR':
      return Object.assign({}, state, { request })
    case 'DELETE_AVAILABLE_BAR':
      return Object.assign({}, state, { request })
    default:
      return state
  }
}

export default cutOptimizer
