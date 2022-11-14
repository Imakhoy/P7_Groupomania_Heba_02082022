import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import LogoutImg from '../../assets/images/logout.svg'

function Logout() {
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie('jwt')
      })
      .catch((err) => {
        console.log(err)
      })
    window.location = '/'
  }

  return <img src={LogoutImg} alt="Déconnexion" onClick={logout}></img>
}

export default Logout
