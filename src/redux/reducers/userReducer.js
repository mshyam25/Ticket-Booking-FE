import { userConstants } from '../constants/userConstants'

export const userSignInReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case userConstants.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_LOGOUT:
      return {}
    case userConstants.USER_LOGIN_RESET:
      return { registered: true }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { loading: true }
    case userConstants.USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case userConstants.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userFindReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_BY_EMAIL_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_BY_EMAIL_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case userConstants.USER_BY_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_BY_EMAIL_RESET:
      return {}

    default:
      return state
  }
}

export const passwordResetLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_PASSWORD_RESET_LINK_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_PASSWORD_RESET_LINK_SUCCESS:
      return { loading: false, success: action.payload }
    case userConstants.USER_PASSWORD_RESET_LINK_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userUpdateReducer = (state = { updatedUser: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedUser: action.payload }
    case userConstants.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_LIST_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case userConstants.USER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


