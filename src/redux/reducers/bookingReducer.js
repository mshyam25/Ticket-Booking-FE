import { bookingConstants } from '../constants/bookingConstants'

export const bookingItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case bookingConstants.BOOKING_ITEMS_ADD:
      return { loading: true, bookingDetails: action.payload }

    default:
      return state
  }
}
export const newBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case bookingConstants.NEW_BOOKING_REQUEST:
      return { loading: true }
    case bookingConstants.NEW_BOOKING_SUCCESS:
      return { loading: false, success: true }
    case bookingConstants.NEW_BOOKING_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
