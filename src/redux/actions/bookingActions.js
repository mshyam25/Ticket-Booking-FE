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

// BOOKINGS OF THEATRE

export const bookingsOfTheatre = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: bookingConstants.THEATRE_BOOKINGS_REQUEST })
    const {
      userSignIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${API}/bookings/theatrebookings/${id}`,
      config
    )

    dispatch({ type: bookingConstants.THEATRE_BOOKINGS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: bookingConstants.THEATRE_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//BOOKINGS OF USER

export const bookingsOfUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: bookingConstants.USER_BOOKINGS_REQUEST })
    const {
      userSignIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${API}/bookings/userbookings/${id}`,

      config
    )

    dispatch({ type: bookingConstants.USER_BOOKINGS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: bookingConstants.USER_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
