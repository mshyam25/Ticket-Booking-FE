import { theatreConstants } from '../constants/theatreConstants'
import axios from 'axios'
import { API } from '../../utils'

export const getAllTheatres = () => async (dispatch) => {
  try {
    dispatch({ type: theatreConstants.THEATRES_LIST_REQUEST })
    const { data } = await axios.get(`${API}/theatres/list`)
    dispatch({ type: theatreConstants.THEATRES_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: theatreConstants.THEATRES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTheatreById = (id) => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo },
  } = getState()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  try {
    dispatch({ type: theatreConstants.THEATRE_BY_ID_REQUEST })
    const { data } = await axios.get(`${API}/theatres/${id}`, config)
    dispatch({ type: theatreConstants.THEATRE_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: theatreConstants.THEATRE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addTheatre = (newTheatre) => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo },
  } = getState()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  try {
    dispatch({ type: theatreConstants.ADD_THEATRE_REQUEST })
    const { data } = await axios.post(
      `${API}/theatres/addtheatre`,
      newTheatre,
      config
    )
    dispatch({ type: theatreConstants.ADD_THEATRE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: theatreConstants.ADD_THEATRE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateTheatre = (theatre, id) => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo },
  } = getState()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  try {
    dispatch({ type: theatreConstants.EDIT_THEATRE_REQUEST })
    const { data } = await axios.put(`${API}/theatres/${id}`, theatre, config)
    dispatch({ type: theatreConstants.EDIT_THEATRE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: theatreConstants.EDIT_THEATRE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
