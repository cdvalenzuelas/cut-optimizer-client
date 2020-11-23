const INITIAL_STATE = {
  loading: false,
  error: '',
  user: null,
  lastUpdated: ''
}

const global = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'global/SET_LOADING':
      return Object.assign({}, state, payload)
    case 'global/SET_ERROR':
      return Object.assign({}, state, payload)
    case 'global/SET_USER':
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default global
