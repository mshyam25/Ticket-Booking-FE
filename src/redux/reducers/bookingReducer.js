import { bookingConstants } from '../constants/bookingConstants'

export const bookingItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case bookingConstants.BOOKING_ITEMS_ADD:
      return { loading: true, bookingDetails: action.payload }

    default:
      return state
  }
}
