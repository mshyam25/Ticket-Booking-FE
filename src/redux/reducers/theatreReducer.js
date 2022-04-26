import { theatreConstants } from '../constants/theatreConstants'

export const theatresListReducer = (state = {}, action) => {
  switch (action.type) {
    case theatreConstants.THEATRES_LIST_REQUEST:
      return { ...state, loading: true }
    case theatreConstants.THEATRES_LIST_SUCCESS:
      return { loading: false, theatres: action.payload }
    case theatreConstants.THEATRES_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const theatreByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case theatreConstants.THEATRE_BY_ID_REQUEST:
      return { ...state, loading: true }
    case theatreConstants.THEATRE_BY_ID_SUCCESS:
      return { loading: false, theatre: action.payload }
    case theatreConstants.THEATRE_BY_ID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const newTheatreReducer = (state = {}, action) => {
  switch (action.type) {
    case theatreConstants.ADD_THEATRE_REQUEST:
      return { ...state, loading: true }
    case theatreConstants.ADD_THEATRE_SUCCESS:
      return { loading: false, success: true }
    case theatreConstants.ADD_THEATRE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
