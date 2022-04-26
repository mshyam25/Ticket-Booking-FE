import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'

import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'
import './UserProfilePage.styles.css'
import { getUser, updateUser } from '../../redux/actions/userActions'
const UserProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [edit, setEdit] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success, updatedUser } = userUpdate

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
    password: yup.string(),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
    confirmpassword: yup.string(),
    // .matches(
    //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$',
    //   'Password should be minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // ),
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
      onSubmit: () => {},
    })

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(getUser(userInfo.email))
    }
  }, [userInfo])

  const handleUpdate = () => {
    if (values.password !== values.confirmpassword) {
      alert('Passwords do not match')
      values.password = ''
      values.confirmpassword = ''
    } else {
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
  }
  return (
    <div className='container grid grid--2--cols'>
      {loading && <Loader />}
      <div className='profile-box'>
        <Card className='movie-card'>
          <Card.Body>
            <Card.Title className='movie-name'>
              {userInfo.name} : {userInfo.email}
            </Card.Title>

            <Button
              variant='warning'
              onClick={() => navigate(`/userbookings/${userInfo._id}`)}>
              {' '}
              View Bookings
            </Button>
            {!edit ? (
              <Button variant='info' onClick={() => setEdit(!edit)}>
                {' '}
                Edit Profile
              </Button>
            ) : (
              ''
            )}
          </Card.Body>
        </Card>
      </div>
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

            <Button type='submit' onClick={() => handleUpdate()}>
              Update
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default UserProfilePage
