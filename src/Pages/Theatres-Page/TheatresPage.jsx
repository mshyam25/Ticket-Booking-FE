import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { Badge, Button, Card } from 'react-bootstrap'
import { getAllTheatres } from '../../redux/actions/theatreActions'

const TheatresPage = () => {
  const dispatch = useDispatch()

  const theatresList = useSelector((state) => state.theatresList)
  const {
    loading: theatresLoading,

    theatres,
  } = theatresList

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/theatres/${id}`)
  }
  useEffect(() => {
    dispatch(getAllTheatres())
  }, [dispatch])
  return (
    <div className='container'>
      {theatresLoading && <Loader />}
      {theatres ? (
        <>
          <section className='theatres-section'>
            {theatres.map((theatre, index) => {
              return (
                <Card className='movie-card' key={index}>
                  <Card.Img
                    variant='top'
                    src={theatre.currentMovie.poster}
                    alt={theatre.currentMovie.movieName}
                    className='movie-poster'
                  />
                  <div className='movie-details'>
                    <Card.Title>
                      <p className='movie-name'>
                        {theatre.currentMovie.movieName} (
                        {theatre.currentMovie.rating})
                      </p>
                    </Card.Title>
                    <Card.Text>
                      <span className='span-class'>Starring : </span>{' '}
                      <span className='span-class cast'>
                        {' '}
                        {theatre.currentMovie.cast}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      <span className='span-class'>Director : </span>
                      <span className='span-class cast'>
                        {theatre.currentMovie.director}{' '}
                      </span>
                    </Card.Text>
                    <Card.Title>
                      <p className='theatre-name'>{theatre.theatreName} </p>
                    </Card.Title>
                    <div className='shows'>
                      {theatre.showTimings.map((show) => (
                        <Badge bg='primary' className='show-time'>
                          {show}
                        </Badge>
                      ))}
                    </div>
                    {userInfo && userInfo.isAdmin ? (
                      <div className='buttons'>
                        <Button
                          variant='danger'
                          className='btn'
                          onClick={() => handleClick(theatre._id)}>
                          Book Tickets
                        </Button>
                        <Button
                          variant='info'
                          className='btn'
                          onClick={() =>
                            navigate(`/theatrebookings/${theatre._id}`)
                          }>
                          View Bookings
                        </Button>
                        <Button
                          variant='warning'
                          className='btn'
                          onClick={() =>
                            navigate(`/edittheatre/${theatre._id}`)
                          }>
                          Edit Theatre
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant='success'
                        className='btn'
                        onClick={() => handleClick(theatre._id)}>
                        Book Tickets
                      </Button>
                    )}
                  </div>
                </Card>
              )
            })}
          </section>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default TheatresPage
