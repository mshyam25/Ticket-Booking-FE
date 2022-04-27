import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

//Styling Imports
import TextField from '@mui/material/TextField'
import { Card, Button } from 'react-bootstrap'

//Action Imports
import { userLogIn } from '../../redux/actions/userActions'

//Toaster,Loader,CSS
import Loader from '../../Components/Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {
  const errorToast = (msg) =>
    toast.error(msg, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  const successToast = (msg) =>
    toast.success(msg, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const infoToast = (msg) =>
    toast.info(msg, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const textFieldStyles = { style: { fontSize: '2rem' } }

  const userSignIn = useSelector((state) => state.userSignIn)
  const { loading, success, error, userInfo, registered } = userSignIn

  const formValidation = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
    password: yup.string().required('Password is required'),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: '', password: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        dispatch(userLogIn(values.email, values.password))
        values.email = ''
        values.password = ''
      },
    })

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate('/')
      }, 4000)
    }
    if (success) {
      successToast('User is Signed In')
    }
    if (registered)
      infoToast(
        'Account created. Verification Mail is sent.Please Verify your account.'
      )
    if (error) errorToast('Invalid Credentials')
  }, [userInfo])
  return (
    <>
      <ToastContainer />
      <div className='container flex-box-center'>
        {loading ? (
          <Loader />
        ) : (
          <Card className='form-section'>
            <span className='secondary-header'>Sign in</span>

            <form onSubmit={handleSubmit} className='form-container'>
              <TextField
                InputProps={textFieldStyles}
                InputLabelProps={textFieldStyles}
                id='email'
                name='email'
                value={values.email}
                label='Email'
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
              />
              <span className='text-field'>
                {errors.email && touched.email ? errors.email : ''}
              </span>
              <TextField
                InputProps={textFieldStyles}
                InputLabelProps={textFieldStyles}
                id='password'
                name='password'
                type='password'
                value={values.password}
                label='Password'
                variant='outlined'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
              />
              <span className='text-field'>
                {errors.password && touched.password ? errors.password : ''}
              </span>
              <Link to='/forgotpassword' className='links'>
                Forgot password ?
              </Link>
              <div className='btn-container'>
                <Button type='submit' variant='info' className='cta-btn'>
                  Sign in
                </Button>{' '}
              </div>

              <span className='text-field'>
                If you have recently registered, please confirm your email and
                try sign in.
              </span>

              <span className='text-field'>
                New Customer ?{' '}
                <Link to='/signup' className='links'>
                  Sign Up
                </Link>
              </span>
            </form>
          </Card>
        )}
      </div>
    </>
  )
}

export default SignIn
