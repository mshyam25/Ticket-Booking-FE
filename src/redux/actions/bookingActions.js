import { bookingConstants } from '../constants/bookingConstants'
import axios from 'axios'
import { API } from '../../utils'

//NEW BOOKING

export const newMovieBooking =
  (bookingDetails) => async (dispatch, getState) => {
    try {
      dispatch({ type: bookingConstants.NEW_BOOKING_REQUEST })
      const {
        userSignIn: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        `${API}/bookings`,
        bookingDetails,
        config
      )

      dispatch({ type: bookingConstants.NEW_BOOKING_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: bookingConstants.NEW_BOOKING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
