import React from 'react'
import axios from 'axios'
import { useState } from 'react'

import SignInForm from './SignInForm'

function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    const errorEl = document.getElementById('error')

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      withCredentials: true,
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    })
      .then((res) => {
        setFormSubmit(true)
      })
      .catch((err) => {
        errorEl.innerHTML = err.response.data.error
      })
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Utilisateur crée, veuillez-vous connecter !{' '}
          </h4>
        </>
      ) : (
        <form
          className="formulaire"
          action=""
          onSubmit={handleRegister}
          id="sign-up-form"
        >
          <label htmlFor="firstName" aria-label="Prénom">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <label htmlFor="lastName" aria-label="Nom">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <label htmlFor="email" aria-label="Email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="password" aria-label="Mot de passe">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" aria-label="S'inscrire" value="S'inscrire" />
          <div id="error" className="error"></div>
        </form>
      )}
    </>
  )
}

export default SignUpForm
