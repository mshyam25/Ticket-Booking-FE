import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import TheatrePage from './Pages/TheatrePage/TheatrePage'
import TheatresPage from './Pages/Theatres-Page/TheatresPage'
import SignIn from './Pages/Sign-In-Page/SignIn'
import ForgotPasswordPage from './Pages/Forgotpassword-Page/ForgotPasswordPage'
import SignUp from './Pages/Sign-Up-Page/SignUp'
import Verificationemail from './Pages/Verificationemail-Page/Verificationemail'
import PasswordResetPage from './Pages/PasswordReset-Page/PasswordResetPage'
import PaymentGatewayPage from './Pages/PaymentGateway-Page/PaymentGateway-Page'
import UsersListPage from './Pages/UsersListPage/UsersListPage'
import UserBookingsPage from './Pages/UserBookings-Page/UserBookingsPage'
import TheatreBookingsPage from './Pages/TheatreBookings-Page/TheatreBookingsPage'
import UserProfilePage from './Pages/UserProfile-Page/UserProfilePage'
import EditTheatrePage from './Pages/EditTheatre-Page/EditTheatrePage'
import AddNewTheatrePage from './Pages/AddNewTheatre-Page/AddNewTheatrePage'
import HomePage from './Pages/Home-Page/HomePage'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/paymentgateway' element={<PaymentGatewayPage />} />
        <Route path='/addtheatre' element={<AddNewTheatrePage />} />
        <Route path='/edittheatre/:id' element={<EditTheatrePage />} />
        <Route path='/theatres' element={<TheatresPage />} />
        <Route path='/theatres/:id' element={<TheatrePage />} />
        <Route path='/users' element={<UsersListPage />} />
        <Route path='/profile' element={<UserProfilePage />} />
        <Route path='/userbookings/:id' element={<UserBookingsPage />} />
        <Route path='/theatrebookings/:id' element={<TheatreBookingsPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
        <Route path='/passwordreset/:email' element={<PasswordResetPage />} />
        <Route
          path='/verificationemail/:email'
          element={<Verificationemail />}
        />
      </Routes>
    </>
  )
}

export default App
