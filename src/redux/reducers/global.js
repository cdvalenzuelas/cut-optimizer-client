const INITIAL_STATE = {
  loading: false
}

const global = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING':
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default global
