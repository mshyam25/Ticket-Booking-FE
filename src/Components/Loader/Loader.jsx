import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
      <Button variant='secondary' disabled>
        <h3> Loading...</h3>
        <Spinner
          as='span'
          animation='grow'
          size='md'
          role='status'
          aria-hidden='true'
        />
        <Spinner
          as='span'
          animation='grow'
          size='md'
          role='status'
          aria-hidden='true'
        />
        <Spinner
          as='span'
          animation='grow'
          size='md'
          role='status'
          aria-hidden='true'
        />
      </Button>
    </>
  )
}

export default Loader
