import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  theatresListReducer,
  theatreByIdReducer,
} from './reducers/theatreReducer'
import {
  clearReservedSeatsReducer,
  confirmSeatReducer,
} from './reducers/seatReducer'
import {
  findUserReducer,
  passwordResetReducer,
  securityConfirmReducer,
  userSignInReducer,
} from './reducers/userReducer'

const reducer = combineReducers({
  theatresList: theatresListReducer,
  theatreById: theatreByIdReducer,
  confirmSeat: confirmSeatReducer,
  clearReservedSeats: clearReservedSeatsReducer,
  userSignIn: userSignInReducer,
  findUser: findUserReducer,
  securityConfirm: securityConfirmReducer,
  passwordReset: passwordResetReducer,
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
