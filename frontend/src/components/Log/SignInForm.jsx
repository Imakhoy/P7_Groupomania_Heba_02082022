import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const errorEl = document.getElementById('error')

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res) {
          window.location = '/'
        }
      })
      .catch((err) => {
        if (err.response.data.error) {
          errorEl.innerHTML = err.response.data.error
        } else if (err.response.data) {
          errorEl.innerHTML = err.response.data
        }
        console.log(err)
      })
  }

  return (
    <form
      className="formulaire"
      action=""
      onSubmit={handleLogin}
      id="sign-in-form"
    >
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
      <input type="submit" aria-label="Se connecter" value="Se connecter" />
      <div id="error" className="error"></div>
    </form>
  )
}

export default SignInForm
