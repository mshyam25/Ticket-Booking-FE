export const API = 'http://localhost:9000'

//export const API = 'http://ticket-booking-appli.herokuapp.com'

export const validation = (name, email, password) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
  const namePattern = /^[a-zA-Z ]{2,16}$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

  if (name) {
    if (!namePattern.test(name)) {
      return 'Please enter a valid username. Username should have only letters and a minimum of 2 and maximum of 16 letters are allowed'
    }
  }
  if (email) {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email id'
    }
  }
  if (password) {
    if (!passwordPattern.test(password)) {
      return 'Password should contain Minimum six characters, at least one letter and one number'
    }
  }
  return 'Validations Passed'
}
