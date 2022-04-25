import { seatConstants } from '../constants/seatConstants'
import axios from 'axios'
import { API } from '../../utils'

//INITIAL SEAT CONFIRMATION

export const confirmMySeats = (booking) => async (dispatch) => {
  try {
    dispatch({ type: seatConstants.SEAT_CONFIRMATION_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${API}/seats/confirmation`,
      booking,
      config
    )
    dispatch({
      type: seatConstants.SEAT_CONFIRMATION_SUCCESS,
      payload: data,
    })
    console.log('HELLO')
    dispatch({ type: seatConstants.SEAT_RESERVED_CLEARANCE_REQUEST })

    const { data: clearanceData } = await axios.post(
      `${API}/seats/clearingreserved`,
      booking,
      config
    )
    dispatch({
      type: seatConstants.SEAT_RESERVED_CLEARANCE_SUCCESS,
      payload: clearanceData,
    })
    // clearSeats(booking)
  } catch (error) {
    dispatch({
      type: seatConstants.SEAT_CONFIRMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// TO CLEAR SEATS IF THE PAYMENT IS NOT MADE WITHIN 5 MINUTES

export const clearSeats = (booking) => async (dispatch) => {
  try {
    dispatch({ type: seatConstants.SEAT_RESERVED_CLEARANCE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data: clearanceData } = await axios.post(
      `${API}/seats/clearingreserved`,
      booking,
      config
    )
    dispatch({
      type: seatConstants.SEAT_RESERVED_CLEARANCE_SUCCESS,
      payload: clearanceData,
    })
  } catch (error) {
    dispatch({
      type: seatConstants.SEAT_RESERVED_CLEARANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//MARKING SEATS AS BOOKED AFTER PAYMENT

export const bookSeats = (booking) => async (dispatch) => {
  console.log('Book seats :', booking)
  try {
    dispatch({ type: seatConstants.SEAT_BOOKING_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(`${API}/seats/bookseats`, booking, config)
    dispatch({
      type: seatConstants.SEAT_BOOKING_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: seatConstants.SEAT_BOOKING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
