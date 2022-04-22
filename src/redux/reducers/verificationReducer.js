import { verificationConstants } from '../constants/verificationConstants'

export const verificationEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case verificationConstants.VERIFICATION_EMAIL_REQUEST:
      return { loading: true }
    case verificationConstants.VERIFICATION_EMAIL_SUCCESS:
      return { loading: false, message: action.payload }
    case verificationConstants.VERIFICATION_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
