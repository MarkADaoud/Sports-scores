const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
  //e.preventDefault()

  let errors = []

  if(firstname_input) {
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value)
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if (errors.length > 0) {
    e.preventDefault()
    error_message.innerHTML = errors.join('<br>')
  }
})

function getSignupFormErrors(firstname, email, password, repeat_password) {
  let errors = []

  if (firstname == '' || firstname == null) {
    errors.push('First name is required.')
    firstname_input.parentElement.classList.add('incorrect')
  }

  if (email == '' || email == null) {
    errors.push('Email is required.')
    email_input.parentElement.classList.add('incorrect')
  }

  if (password == '' || password == null) {
    errors.push('Password is required.')
    password_input.parentElement.classList.add('incorrect')
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.')
    password_input.parentElement.classList.add('incorrect')
  }

  if(password !== repeat_password) {
    errors.push('Passwords do not match.')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = []

  if (email == '' || email == null) {
    errors.push('Email is required.')
    email_input.parentElement.classList.add('incorrect')
  }

  if (password == '' || password == null) {
    errors.push('Password is required.')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;

}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerHTML = ''
    }
  })
})