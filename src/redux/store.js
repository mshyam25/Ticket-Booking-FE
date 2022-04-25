import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  theatresListReducer,
  theatreByIdReducer,
} from './reducers/theatreReducer'
import {
  bookSeatReducer,
  clearReservedSeatsReducer,
  confirmSeatReducer,
} from './reducers/seatReducer'
import {
  passwordResetLinkReducer,
  passwordResetReducer,
  securityConfirmReducer,
  userFindReducer,
  userRegisterReducer,
  userSignInReducer,
  userUpdateReducer,
} from './reducers/userReducer'
import { verificationEmailReducer } from './reducers/verificationReducer'
import {
  bookingItemsReducer,
  newBookingReducer,
} from './reducers/bookingReducer'

const reducer = combineReducers({
  verificationEmail: verificationEmailReducer,
  theatresList: theatresListReducer,
  theatreById: theatreByIdReducer,
  confirmSeat: confirmSeatReducer,
  clearReservedSeats: clearReservedSeatsReducer,
  bookSeat: bookSeatReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userFind: userFindReducer,
  passwordResetLink: passwordResetLinkReducer,
  userUpdate: userUpdateReducer,
  bookingItems: bookingItemsReducer,
  newBooking: newBookingReducer,
})

const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null

const initialState = {
  userSignIn: {
    userInfo: userInfoFromStorage,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
