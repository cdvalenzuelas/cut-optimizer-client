const INITIAL_STATE = {
  loading: false,
  error: ''
}

const global = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING':
      return Object.assign({}, state, payload)
    case 'SET_ERROR':
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default global
