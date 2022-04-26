import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

//Styling Imports
import TextField from '@mui/material/TextField'
import { Button } from 'react-bootstrap'

//Action Imports
import { registerUser } from '../../redux/actions/userActions'
import { userConstants } from '../../redux/constants/userConstants'

//Toaster,Loader,CSS
import Loader from '../../Components/Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './SignUp.styles.css'

const SignUp = () => {
  const errorToast = (msg) =>
    toast.error(msg, {
      position: 'top-center',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const textFieldStyles = { style: { fontSize: 18 } }

  const userSignIn = useSelector((state) => state.userSignIn)
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo: user,
  } = userSignIn

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, success, error: errorRegister, userInfo } = userRegister

  const formValidation = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(
        '^[a-zA-Z ]{2,16}$',
        'Name should be minimum 2 characters and only letters are allowed'
      ),
    email: yup
      .string()
      .required('Email is required')
      .matches('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Invalid Email Address'),
    password: yup.string().required('Password is required'),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
    confirmpassword: yup.string().required('Password is required'),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { name: '', email: '', password: '', confirmpassword: '' },
      validationSchema: formValidation,
      onSubmit: () => {
        if (values.password === values.confirmpassword) {
          dispatch(registerUser(values.name, values.email, values.password))
          values.name = ''
          values.email = ''
          values.password = ''
          values.confirmpassword = ''
        } else {
          errorToast('Passwords do not match')
        }
      },
    })

  useEffect(() => {
    if (userInfo) {
      dispatch({ type: userConstants.USER_LOGIN_RESET })

      navigate('/signin')
    }
    if (errorRegister) {
      errorToast(errorRegister)
    }
  }, [user, errorRegister, userInfo])
  return (
    <>
      <ToastContainer />
      {loading && <Loader />}

      <div className='container form-section'>
        <span className='signin-header'>SIGN UP PAGE</span>

        <form onSubmit={handleSubmit} className='form-container'>
          <TextField
            InputProps={textFieldStyles}
            InputLabelProps={textFieldStyles}
            id='name'
            name='name'
            value={values.name}
            label='Name'
            variant='outlined'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
          />
          <span className='text-field'>
            {errors.name && touched.name ? errors.name : ''}
          </span>
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
          <TextField
            InputProps={textFieldStyles}
            InputLabelProps={textFieldStyles}
            id='confirmpassword'
            name='confirmpassword'
            value={values.confirmpassword}
            label='Confirm Password'
            variant='outlined'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmpassword && touched.confirmpassword}
          />
          <span className='text-field'>
            {errors.confirmpassword && touched.confirmpassword
              ? errors.confirmpassword
              : ''}
          </span>

          <Button type='submit'>Sign in</Button>
        </form>
      </div>
    </>
  )
}

export default SignUp
