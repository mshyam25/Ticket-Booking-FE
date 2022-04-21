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

export const getTheatreById = (id) => async (dispatch) => {
  try {
    dispatch({ type: theatreConstants.THEATRE_BY_ID_REQUEST })
    const { data } = await axios.get(`${API}/theatres/${id}`)
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
