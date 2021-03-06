import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'

import { getUser, updateUser } from '../../redux/actions/userActions'

//Toaster,Loader,CSS
import Loader from '../../Components/Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [edit, setEdit] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success } = userUpdate

  const textFieldStyles = { style: { fontSize: 18 } }
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
    password: yup
      .string()
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
        'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmpassword: yup
      .string()
      .matches(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
        'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
  })

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmpassword: '',
      },
      validationSchema: formValidation,
      onSubmit: () => {
        if (values.password !== values.confirmpassword) {
          alert('Passwords do not match')
          values.password = ''
          values.confirmpassword = ''
        } else {
          console.log('form submitted')
          dispatch(
            updateUser({
              name: values.name,
              email: values.email,
              password: values.password,
            })
          )
          dispatch(getUser(userInfo.email))
          setEdit(!edit)
        }
      },
    })

  const handleCancelEdit = () => {
    setEdit(!edit)
  }
  const errorToast = (msg) =>
    toast.error(msg, {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  const successToast = (msg) =>
    toast.success(msg, {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(getUser(userInfo.email))
    }
    if (error) {
      errorToast(error)
    }

    if (success) {
      successToast('User Details Updated')
    }
  }, [userInfo, error, success, dispatch, navigate])
  console.log(success)
  return (
    <div className='container flex-box-center'>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Card className='form-section'>
          <Card.Body>
            <Card.Title className='movie-name margin-bottom-sm'>
              {userInfo.name} : {userInfo.email}
            </Card.Title>
            <div className='btn-container'>
              <Button
                variant='warning'
                className='btn'
                onClick={() => navigate(`/userbookings/${userInfo._id}`)}>
                {' '}
                View Bookings
              </Button>
              {!edit ? (
                <Button
                  variant='info'
                  className='btn'
                  onClick={() => setEdit(!edit)}>
                  {' '}
                  Edit Profile
                </Button>
              ) : (
                ''
              )}
            </div>
          </Card.Body>
          {edit && (
            <>
              <form onSubmit={handleSubmit} className='form-container'>
                <TextField
                  InputProps={textFieldStyles}
                  InputLabelProps={textFieldStyles}
                  id='name'
                  name='name'
                  value={values.name}
                  label='Name'
                  variant='filled'
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
                  variant='filled'
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
                  variant='filled'
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
                  type='password'
                  value={values.confirmpassword}
                  label='Confirm Password'
                  variant='filled'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmpassword && touched.confirmpassword}
                />
                <span className='text-field'>
                  {errors.confirmpassword && touched.confirmpassword
                    ? errors.confirmpassword
                    : ''}
                </span>

                <Button type='submit' variant='success'>
                  Update Details
                </Button>

                <Button variant='info' onClick={() => handleCancelEdit()}>
                  {' '}
                  Cancel Edit
                </Button>
              </form>
            </>
          )}
        </Card>
      )}
    </div>
  )
}

export default UserProfilePage
