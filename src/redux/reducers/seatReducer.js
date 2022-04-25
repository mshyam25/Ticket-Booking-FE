import { seatConstants } from '../constants/seatConstants'

export const confirmSeatReducer = (state = {}, action) => {
  switch (action.type) {
    case seatConstants.SEAT_CONFIRMATION_REQUEST:
      return { loading: true }
    case seatConstants.SEAT_CONFIRMATION_SUCCESS:
      return { loading: false, confirmation: action.payload }
    case seatConstants.SEAT_CONFIRMATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const clearReservedSeatsReducer = (state = {}, action) => {
  switch (action.type) {
    case seatConstants.SEAT_RESERVED_CLEARANCE_REQUEST:
      return { loading: true }
    case seatConstants.SEAT_RESERVED_CLEARANCE_SUCCESS:
      return { loading: false, clearance: action.payload }
    case seatConstants.SEAT_RESERVED_CLEARANCE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookSeatReducer = (state = {}, action) => {
  switch (action.type) {
    case seatConstants.SEAT_BOOKING_REQUEST:
      return { loading: true }
    case seatConstants.SEAT_BOOKING_SUCCESS:
      return { loading: false, success: true }
    case seatConstants.SEAT_BOOKING_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
