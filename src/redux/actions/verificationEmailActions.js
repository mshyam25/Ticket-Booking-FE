import { verificationConstants } from '../constants/verificationConstants'
import axios from 'axios'
import { API } from '../../utils'

export const verificationEmailTrigger = (email) => async (dispatch) => {
  try {
    dispatch({ type: verificationConstants.VERIFICATION_EMAIL_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `${API}/users/resendverificationmail/${email}`,
      config
    )
    dispatch({
      type: verificationConstants.VERIFICATION_EMAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: verificationConstants.VERIFICATION_EMAIL_FAIL,
      // payload:
      //   error.response && error.response.data.message
      //     ? error.response.data.message
      //     : error.message,
      payload: error.message,
    })
  }
}
