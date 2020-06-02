const INITIAL_STATE = {
  mode: 'input',
  currentShape: -1,
  newElements: true,
  readyToSend: false,
  elementsNames: [],
  request2: '[]',
  request: [],
  response: []
}

const cutOptimizer = (state = INITIAL_STATE, { type, payload }) => {
  const { currentShape, request, mode } = state
  state = JSON.stringify(state)
  state = JSON.parse(state)

  switch (type) {
    case 'SET_MODE':
      state.mode = mode === 'input' ? 'output' : 'input'
      return state
    case 'SET_DISPLAY':
      return state
    case 'SET_CURRENT_SHAPE':
      state.currentShape = payload
      return state
    case 'CREATE_NEW_SHAPE':
      state.currentShape++
      state.newElements = true
      state.elementsNames.push([])
      state.request2 = payload
      return state
    case 'MODIFY_SHAPE':
      state.request[currentShape][payload.field] = payload.value
      state.request2 = payload.request3
      return state
    case 'DELETE_SHAPE':
      state.currentShape -= 1
      state.request2 = payload
      state.elementsNames.splice(currentShape, 1)
      return state
    case 'ADD_ELEMENT':
      state.elementsNames[currentShape].push('PXXX')
      state.request2 = payload
      return state
    case 'MODIFY_ELEMENT':
      state.request[currentShape].list[payload.element][payload.field] = payload.value
      state.request2 = payload.request3
      if (payload.field === 'name') {
        state.elementsNames[currentShape][payload.element] = payload.value
      }
      return state
    case 'DELETE_ELEMENT':
      state.elementsNames[currentShape].splice(payload, 1)
      state.request2 = payload
      return state
    case 'OPTIMIZE':
      state.response = payload
      state.request2 = JSON.stringify(request)
      state.mode = 'output'
      return state
    case 'CHANGE_NEW_ELEMENTS':
      state.newElements = payload
      return state
    case 'ADD_AVAILABLE_BARS':
      state.request[currentShape].availableBars.push(payload.newAvailableBar)
      return state
    case 'MODIFY_AVAILABLE_BAR':
      state.request[currentShape].availableBars[payload.availableBar][payload.field] = payload.value
      return state
    case 'DELETE_AVAILABLE_BAR':
      state.request[currentShape].availableBars.splice(payload.availableBar, 1)
      return state
    default:
      return state
  }
}

export default cutOptimizer
