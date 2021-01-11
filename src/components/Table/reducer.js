export const initialState = { data: [], errors: [], error: true }

export const reducer = (state, { type, payload }) => {
  const { data } = state

  switch (type) {
    case 'ADD_ROW':
      data.push(payload)
      return Object.assign({}, state, { data })
    case 'MODIFY_ROW':
      data[payload.row][payload.column] = payload.value
      return Object.assign({}, state, payload)
    case 'SET_INITIAL_STATE':
      return Object.assign({}, state, payload)
    case 'DELETE_ROW':
      data.splice(payload, 1)
      return Object.assign({}, state, { data })
    default:
      return state
  }
}
