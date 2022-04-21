import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { Badge, Button, Card } from 'react-bootstrap'
import './TheatresPage.styles.css'
import { getAllTheatres } from '../../redux/actions/theatreActions'
const TheatresPage = () => {
  const dispatch = useDispatch()
  const theatresList = useSelector((state) => state.theatresList)
  const {
    loading: theatresLoading,
    error: theatresError,
    theatres,
  } = theatresList

  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/theatres/${id}`)
  }
  useEffect(() => {
    dispatch(getAllTheatres())
  }, [])
  return (
    <div className='container'>
      <h1> Select your movie</h1>
      {theatresLoading && <Loader />}
      {theatres ? (
        <section className='theatres-section'>
          {theatres.map((theatre, index) => {
            return (
              <Card className='movie-card' key={index}>
                <Card.Img
                  variant='top'
                  src={theatre.currentMovie.poster}
                  alt={theatre.currentMovie.movieName}
                  className='img-box'
                />
                <div className='movie-box margin-bottom-sm'>
                  <Card.Title className='movie-name'>
                    {theatre.currentMovie.movieName} (
                    {theatre.currentMovie.rating})
                  </Card.Title>
                  <Card.Text className='margin-bottom-sm'>
                    <span className='span-class casting'>Starring : </span>{' '}
                    <span className='cast'> {theatre.currentMovie.cast}</span>
                  </Card.Text>
                  <Card.Text className='margin-bottom-sm'>
                    <span className='span-class directing'>Director : </span>
                    <span className='cast'>
                      {theatre.currentMovie.director}{' '}
                    </span>
                  </Card.Text>
                  <Card.Title className='theatre-name margin-bottom-sm'>
                    {theatre.theatreName}
                  </Card.Title>
                  <div className='shows margin-bottom-sm'>
                    {theatre.showTimings.map((show) => (
                      <Badge bg='primary' className='show-time'>
                        {show}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant='success'
                    className='btn'
                    onClick={() => handleClick(theatre._id)}>
                    Book Tickets
                  </Button>
                </div>
              </Card>
            )
          })}
        </section>
      ) : (
        ''
      )}
    </div>
  )
}

export default TheatresPage
