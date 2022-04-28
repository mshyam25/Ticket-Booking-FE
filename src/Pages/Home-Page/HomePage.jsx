import React from 'react'

const HomePage = () => {
  return (
    <div className='container'>
      <div className='grid grid--2--cols hero'>
        <div className='home-text'>
          <p className='primary-text'>
            One stop Place to book the latest movies.
          </p>
          <p className='secondary-text'>
            Its <span className='dec-txt'>Friyay</span> as new movie releases
            every Friday.
          </p>
        </div>
        <div className='home-img'>
          <img
            src='actors/theatre.jpeg'
            alt='theatre Image'
            className='home-img'></img>
        </div>
      </div>
      <div className='gallery'>
        <img src='actors/dhanush.jpeg' alt='Dhanush' className='home-img'></img>
        <img src='actors/suriya.jpeg' alt='Suriya' className='home-img'></img>
        <img src='actors/vijay.jpeg' alt='Vijay' className='home-img'></img>
        <img src='actors/ajith.jpeg' alt='Ajith' className='home-img'></img>
        <img src='actors/kamal.jpeg' alt='Kamal' className='home-img'></img>
        <img src='actors/rajni.jpeg' alt='Rajini' className='home-img'></img>
      </div>
    </div>
  )
}

export default HomePage
