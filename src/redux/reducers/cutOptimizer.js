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

const defaultShape = {
  shapeName: 'HEA-180',
  material: 'ASTM A36',
  defaultlengthBar: 6000,
  cutLength: 3,
  availableBars: [],
  error: { settings: false, items: true, availableBars: false },
  list: []
}

let request3
let current
let comodin
const defaultElementName = 'PXXX'

const cutOptimizer = (state = INITIAL_STATE, { type, payload = {} }) => {
  const { currentShape, newElements, request2 = '[]', request = [], serverAvailableBars = [] } = state
  const { list = [], defaultlengthBar = 0, availableBars = [] } = request[currentShape] || []
  let { item, value, name } = payload

  switch (type) {
    case 'cutOptimizer/ADD_AVAILABLE_BARS':
      availableBars.push({ quantity: 1, length: 6000 })
      request3 = JSON.parse(request2)
      request3[currentShape].availableBars[availableBars.length - 1] = { quantity: 'A', length: 'A' }

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
      // comodin = serverAvailableBars.filter(item => item.availableBarsId === payload.id)
      // console.log(comodin)
      // serverAvailableBars
      serverAvailableBars.push(payload)

      return Object.assign({}, state, { serverAvailableBars })
    case 'cutOptimizer/CHANGE_NEW_ELEMENTS':
      return Object.assign({}, state, { newElements: !newElements })
    case 'cutOptimizer/CREATE_NEW_SHAPE':
      comodin = JSON.stringify(defaultShape)
      request.push(JSON.parse(comodin))

      request3 = JSON.parse(request2)
      request3[request3.length] = JSON.parse(comodin)

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
        response: []
      })
    case 'cutOptimizer/DELETE_AVAILABLEBAR':
      availableBars.splice(item, 1)

      return Object.assign({}, state, { request })
    case 'cutOptimizer/DELETE_ELEMENT':
      list.splice(item, 1)
      request3 = JSON.parse(request2)
      request3[currentShape].list.splice(item, 1)

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
    case 'cutOptimizer/GET_DATA_FROM_PROJECT':
      return payload
    case 'cutOptimizer/MODIFY_AVAILABLEBAR':
      availableBars[item][name] = Number(value)

      return Object.assign({}, state, { request })
    case 'cutOptimizer/MODIFY_ELEMENT':
      if (name === 'name') {
        value = value.toUpperCase()
        list[item][name] = value
        request3 = JSON.parse(request2)
        request3[currentShape].list[item][name] = value
      } else if (name === 'length' || name === 'quantity') {
        value = Number(value)
        list[item][name] = value
      }

      return Object.assign({}, state, {
        request,
        request2: name === 'name' ? JSON.stringify(request3) : request2
      })
    case 'cutOptimizer/MODIFY_SHAPE':
      if (name === 'shapeName' || name === 'material') {
        value = value.toUpperCase()
        request[currentShape][name] = value
        request3 = JSON.parse(request2)
        request3[currentShape][name] = value
      } else if (name === 'defaultlengthBar' || name === 'cutLength') {
        value = Number(value)
        request[currentShape][name] = value
      }

      return Object.assign({}, state, {
        request,
        request2: name === 'shapeName' || name === 'material' ? JSON.stringify(request3) : request2
      })
    case 'cutOptimizer/OPTIMIZE':
      return Object.assign({}, state, {
        response: value,
        request2: JSON.stringify(request),
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
    default:
      return state
  }
}

export default cutOptimizer
