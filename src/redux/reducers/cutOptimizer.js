const DEFAULT_SHAPE = {
  'shape':'HEA-180', 
  'material': 'ASTM A36', 
  'defaultlengthBar': 6000,
  'availableBars':[],
  'list': [
    {'name':'p1', 'quantity': 5, 'length': 1000}    
  ]
}

const INITIAL_STATE = {
  mode: 'input',
  response: {},
  request: [Object.assign({}, DEFAULT_SHAPE)],
  totalShapes: 1,
  display: [{display:'initial'}]
}

const cutOptimizer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_MODE':
      const NEW_STATE = state.mode === 'input'
        ? Object.assign(state, {mode: 'output'})
        : Object.assign(state, {mode: 'input'})
      return NEW_STATE      
    case 'SET_DISPLAY':
      return state      
    case 'CREATE_NEW_SHAPE':      
      const { request: request1 } = state
      request1.push(Object.assign({}, DEFAULT_SHAPE))
      return Object.assign(state, { 
        request: request1, 
        totalShapes: state.totalShapes + 1 
      })      
    case 'DELETE_SHAPE':    
      const { request: request2 } = state       
      request2.splice(payload, 1)      
      return Object.assign(state, { 
        request: request2  
      })      
    case 'ADD_ELEMENT':
      const { request: request3 } = state
      let shape = JSON.stringify(state.request[payload])      
      shape = JSON.parse(shape) 
      shape.list.push({'name':`p${shape.list.length + 1}`, 'quantity': 5, 'length': 1000})     
      request3[payload] = shape      
      return Object.assign(state, {
        request: request3
      })     
    case 'DELETE_ELEMENT':
      const { request: request4 } = state      
      request4[payload.shape].list.splice(payload.element, 1)      
      return Object.assign(state, {
        request: request4
      })
    case 'MODIFY_SHAPE':
      const { request: request5 } = state
      const value1 = payload.field === 'defaultlengthBar' ? Number(payload.value) : payload.value
      request5[payload.shape][payload.field] = value1
      return Object.assign(state, {
        request: request5
      })
    case 'MODIFY_ELEMENT':
      const { request: request6 } = state     
      const value2 = payload.field === 'name' ? payload.value : Number(payload.value)      
      request6[payload.shape].list[payload.element][payload.field] = value2
      return Object.assign(state, {
        request: request6
      })
    default:
      return state
  }
}

export default cutOptimizer

