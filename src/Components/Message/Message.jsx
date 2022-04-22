import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      <h2>{children}</h2>
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}
// import React, { useEffect, useState } from 'react'

// const Message = ({ variant, children }) => {
//   // the alert is displayed by default
//   const [alert, setAlert] = useState(true)

//   useEffect(() => {
//     // when the component is mounted, the alert is displayed for 3 seconds
//     setTimeout(() => {
//       setAlert(false)
//     }, 3000)
//   }, [])

//   return (
//     <>{alert && <div className={`alert alert-${variant}`}>{children}</div>}</>
//   )
// }
export default Message
