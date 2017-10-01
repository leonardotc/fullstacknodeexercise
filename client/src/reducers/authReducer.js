import { FETCH_USER } from '../actions/types'

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_USER:
      return Object.keys(action.payload).length > 0? action.payload : false
    default:
      return state
  }
}