import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getTheatreById } from '../../redux/actions/theatreActions'
import Loader from '../../Components/Loader/Loader'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import { Button, Card } from 'react-bootstrap'
import Moment from 'moment'

const EditTheatrePage = () => {
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const [lastDate, setLastDate] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const textFieldStyles = { style: { fontSize: 18 } }

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const theatreById = useSelector((state) => state.theatreById)
  const { loading: loadingTheatre, error: errorTheatre, theatre } = theatreById

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        theatreName: theatre.theatreName,
        movieName: theatre.currentMovie.movieName,
        cast: theatre.currentMovie.cast,
        poster: theatre.currentMovie.poster,
        director: theatre.currentMovie.director,
        language: theatre.currentMovie.language,
        runtime: theatre.currentMovie.runtime,
        rating: theatre.currentMovie.rating,
        theatreArea: theatre.theatreArea,
        releaseDate: '',
        lastDate: '',
        ticketPrice: theatre.ticketPrice,
        showTimings: theatre.showTimings,
      },

      onSubmit: () => {
        console.log(values)
      },
    })

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/signin')
    } else {
      dispatch(getTheatreById(params.id))
    }
  }, [dispatch, userInfo])
  return (
    <>
      {theatre ? (
        <>
          <form onSubmit={handleSubmit} className='form-container'>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='theatreName'
              name='theatreName'
              value={values.theatreName}
              label='Theatre Name'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.theatreName && touched.theatreName}
            />
            <span className='text-field'>
              {errors.theatreName && touched.theatreName
                ? errors.theatreName
                : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='movieName'
              name='movieName'
              value={values.movieName}
              label='Movie Name'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.movieName && touched.movieName}
            />
            <span className='text-field'>
              {errors.movieName && touched.movieName ? errors.movieName : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='cast'
              name='cast'
              type='cast'
              value={values.cast}
              label='Cast'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.cast && touched.cast}
            />
            <span className='text-field'>
              {errors.cast && touched.cast ? errors.cast : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='poster'
              name='poster'
              value={values.poster}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.poster && touched.poster}
            />
            <span className='text-field'>
              {errors.poster && touched.poster ? errors.poster : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='director'
              name='director'
              value={values.director}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.director && touched.director}
            />
            <span className='text-field'>
              {errors.director && touched.director ? errors.director : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='language'
              name='language'
              value={values.language}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.language && touched.language}
            />
            <span className='text-field'>
              {errors.language && touched.language ? errors.language : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='runtime'
              name='runtime'
              value={values.runtime}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.runtime && touched.runtime}
            />
            <span className='text-field'>
              {errors.runtime && touched.runtime ? errors.runtime : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='rating'
              name='rating'
              value={values.rating}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.rating && touched.rating}
            />
            <span className='text-field'>
              {errors.rating && touched.rating ? errors.rating : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='ticketPrice'
              name='ticketPrice'
              value={values.ticketPrice}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.ticketPrice && touched.ticketPrice}
            />
            <span className='text-field'>
              {errors.ticketPrice && touched.ticketPrice
                ? errors.ticketPrice
                : ''}
            </span>
            <TextField
              InputProps={textFieldStyles}
              InputLabelProps={textFieldStyles}
              id='theatreArea'
              name='theatreArea'
              value={values.theatreArea}
              label='Confirm Password'
              variant='outlined'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.theatreArea && touched.theatreArea}
            />
            <span className='text-field'>
              {errors.theatreArea && touched.theatreArea
                ? errors.theatreArea
                : ''}
            </span>

            <label for='releaseDate'>Release Date : </label>
            <input
              type='date'
              id='releaseDate'
              name='releaseDate'
              value={values.releaseDate}
              // min={Moment(theatre.releaseDate).format('YYYY-MM-DD')}
              min={Moment(new Date()).format('YYYY-MM-DD')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label for='lastDate'>Last Date : </label>
            <input
              type='date'
              id='lastDate'
              name='lastDate'
              value={values.lastDate}
              // min={Moment(theatre.releaseDate).format('YYYY-MM-DD')}
              min={Moment(new Date()).format('YYYY-MM-DD')}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button type='submit'>Update</Button>
          </form>
        </>
      ) : (
        <h3>Invalid Theatre Id</h3>
      )}
    </>
  )
}

export default EditTheatrePage
