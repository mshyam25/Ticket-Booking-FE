import { userConstants } from '../constants/userConstants'
import axios from 'axios'
import { API } from '../../utils'
// USER SIGN_IN

export const userLogIn = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${API}/users/signin`,
      { email, password },
      config
    )

    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data })
    // Setting user details into local storage
    localStorage.setItem('currentUser', JSON.stringify(data))

    setTimeout(() => {
      console.log('session destroyed')
      localStorage.removeItem('currentUser')
    }, 480000)
  } catch (error) {
    dispatch({
      type: userConstants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// USER LOG_OUT

export const logout = () => async (dispatch) => {
  dispatch({ type: userConstants.USER_LOGOUT })

  localStorage.removeItem('currentUser')
}

//USER REGISTRATION

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${API}/users`,
      { name, email, password },
      config
    )

    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: userConstants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//FIND USER BY EMAIL

export const findUser = (email) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_BY_EMAIL_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${API}/users/userbyemail`,
      { email },
      config
    )

    dispatch({ type: userConstants.USER_BY_EMAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: userConstants.USER_BY_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// SENDING PASSWORD RESET LINK

export const resetPasswordLink = (email) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_PASSWORD_RESET_LINK_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `${API}/users/resetpasswordlink/${email}`,

      config
    )

    dispatch({
      type: userConstants.USER_PASSWORD_RESET_LINK_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: userConstants.USER_PASSWORD_RESET_LINK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//RESET PASSWORD

export const resetPassword = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `${API}/users/passwordreset`,
      { email, password },
      config
    )

    dispatch({
      type: userConstants.USER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: userConstants.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//GET ALL USERS

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_LIST_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/users`, config)

    dispatch({ type: userConstants.USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: userConstants.USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//FIND USER BY EMAIL

export const getUser = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_BY_EMAIL_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`${API}/users/profile`, { email }, config)

    dispatch({ type: userConstants.USER_BY_EMAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: userConstants.USER_BY_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_REQUEST })

    const {
      userSignIn: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${API}/users/profile`, user, config)

    dispatch({ type: userConstants.USER_UPDATE_SUCCESS, payload: data })
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('currentUser', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: userConstants.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
