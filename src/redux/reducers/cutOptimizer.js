const INITIAL_STATE = {
  projectId: '',
  mode: 'input',
  currentShape: -1,
  newElements: true,
  readyToSend: false,
  request2: '[]',
  request: [],
  response: [],
  serverAvailableBars: []
}

let request3
let current
let comodin
const defaultElementName = 'PXXX'

const cutOptimizer = (state = INITIAL_STATE, { type, payload = {} }) => {
  const { currentShape, newElements, request2 = '[]', request = [], serverAvailableBars = [], response = [] } = state
  const { list = [], defaultlengthBar = 0 } = request[currentShape] || []
  let { item, value, name } = payload

  switch (type) {
    case 'cutOptimizer/ADD_AVAILABLE_BARS':
      request3 = JSON.parse(request2)
      comodin = serverAvailableBars.filter(item => item.name === payload.shapeName && item.material === payload.material)
      comodin = comodin.length === 0 ? [] : comodin[0].data
      request[currentShape].availableBars = comodin
      request3[currentShape].availableBars = true

      return Object.assign({}, state, { request, request2: JSON.stringify(request3) })
    case 'cutOptimizer/ADD_ELEMENT':
      list.push({ name: defaultElementName, quantity: 1, length: Math.round(defaultlengthBar * 0.5) })
      request3 = JSON.parse(request2)
      request3[currentShape].list[list.length - 1] = { name: defaultElementName, quantity: 'A', length: 'A' }

      return Object.assign({}, state, {
        request,
        request2: JSON.stringify(request3)
      })
    case 'cutOptimizer/ADD_SERVER_AVAILABLE_BAR':
      serverAvailableBars.push(payload)

      return Object.assign({}, state, { serverAvailableBars })
    case 'cutOptimizer/CHANGE_NEW_ELEMENTS':
      return Object.assign({}, state, { newElements: !newElements })
    case 'cutOptimizer/CREATE_SHAPE':
      comodin = {
        ...payload,
        list: [],
        availableBars: [],
        error: { settings: false, items: true }
      }

      request3 = JSON.parse(request2)
      request.push(comodin)
      request3.push(comodin)

      return Object.assign({}, state, {
        request,
        request2: JSON.stringify(request3),
        currentShape: currentShape + 1,
        newElements: true
      })
    case 'cutOptimizer/CREATE_NEW_PROJECT':
      return Object.assign({}, state, {
        projectId: value,
        mode: 'input',
        currentShape: -1,
        newElements: true,
        readyToSend: false,
        request2: '[]',
        request: [],
        response: [],
        serverAvailableBars: []
      })
    case 'cutOptimizer/DELETE_AVAILABLE_BARS':
      request[currentShape].availableBars = []
      request3 = JSON.parse(request2)
      request3[currentShape].availableBars = false

      return Object.assign({}, state, { request, request2: JSON.stringify(request3), newElements: true })
    case 'cutOptimizer/DELETE_ELEMENT':
      list.splice(item, 1)
      request3 = JSON.parse(request2)
      request3[currentShape].list.splice(item, 1)

      if (JSON.stringify(request) === JSON.stringify(request3)) {
        request3[currentShape].list.forEach(item => { item.length = '' })
      }

      return Object.assign({}, state, {
        request,
        request2: JSON.stringify(request3)
      })
    case 'cutOptimizer/DELETE_SHAPE':
      request.splice(currentShape, 1)

      if (currentShape === 0) {
        current = request.length === 0 ? -1 : 0
      } else {
        current = currentShape - 1
      }

      request3 = JSON.parse(request2)
      request3.splice(currentShape, 1)

      return Object.assign({}, state, {
        request2: JSON.stringify(request3),
        currentShape: current
      })
    case 'cutOptimizer/EDIT_SHAPE':
      request3 = JSON.parse(request2)
      request[currentShape] = Object.assign({}, request[currentShape], payload)
      comodin = { shapeName: payload.shapeName, material: payload.material }
      request3[currentShape] = Object.assign({}, request[currentShape], comodin)

      return Object.assign({}, state, {
        request,
        request2: JSON.stringify(request3)
      })
    case 'cutOptimizer/GET_DATA_FROM_PROJECT':
      return payload
    case 'cutOptimizer/MODIFY_ELEMENT':
      if (name === 'name') {
        const name2 = list[item][name]
        value = value.toUpperCase()

        if (response.length > 0 && currentShape < response.length) {
          response[currentShape].bars.forEach(({ elements }, index) => {
            elements.forEach((item2, index2) => {
              if (item2.name === name2) {
                response[currentShape].bars[index].elements[index2].name = value
              }
            })
          })
        }

        list[item][name] = value
        request3 = JSON.parse(request2)
        request3[currentShape].list[item][name] = value
      } else if (name === 'length' || name === 'quantity') {
        value = Number(value)
        list[item][name] = value
      }

      return Object.assign({}, state, {
        request,
        request2: name === 'name' ? JSON.stringify(request3) : request2,
        response
      })
    case 'cutOptimizer/OPTIMIZE':
      return Object.assign({}, state, {
        response: value,
        request2: JSON.stringify(request),
        newElements: true,
        mode: 'output'
      })
    case 'cutOptimizer/SET_CURRENT_SHAPE':
      return currentShape !== Number(value)
        ? Object.assign({}, state, { currentShape: value })
        : state
    case 'cutOptimizer/SET_MODE':
      return Object.assign({}, state, { mode: value })
    case 'cutOptimizer/SET_READY_TO_SEND':
      return Object.assign({}, state, { readyToSend: value })
    case 'cutOptimizer/SET_REQUEST2':
      return Object.assign({}, state, { request2: JSON.stringify(request) })
    case 'cutOptimizer/SET_SERVER_AVAILABLEBARS':
      return Object.assign({}, state, payload)
    case 'cutOptimizer/SET_SHAPE_ERROR':
      comodin = request[currentShape] || {}
      if (comodin.error) {
        request[currentShape].error[name] = value
        request3 = JSON.parse(request2)
        request3[currentShape].error[name] = value

        return Object.assign({}, state, {
          request,
          request2: JSON.stringify(request3)
        })
      } else {
        return state
      }
    case 'cutOptimizer/UPDATE_SERVER_AVAILABLEBARS':
      console.log(payload)
      payload.forEach(({ name, material, data }) => {
        const index = serverAvailableBars.findIndex(item => name === item.name && material === item.material)

        if (index !== -1) {
          serverAvailableBars[index].data = data
        } else {
          serverAvailableBars.push({ name, material, data })
        }
      })

      return Object.assign({}, state, { serverAvailableBars })
    default:
      return state
  }
}

export default cutOptimizer
