import React, { useState } from 'react'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

function Log() {
  const [signUpModal, setSignUpModal] = useState(true)
  const [signInModal, setSignInModal] = useState(false)

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false)
      setSignUpModal(true)
    } else if (e.target.id === 'login') {
      setSignUpModal(false)
      setSignInModal(true)
    }
  }

  return (
    <div className="log">
      <ul>
        <li
          id="register"
          onClick={handleModals}
          className={signUpModal ? 'btn btn--active' : 'btn'}
        >
          S'inscrire
        </li>
        <li
          id="login"
          onClick={handleModals}
          className={signInModal ? 'btn btn--active' : 'btn'}
        >
          Se connecter
        </li>
      </ul>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  )
}

export default Log
