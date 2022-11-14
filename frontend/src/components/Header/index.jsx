import { React, useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../AppContext'
import LogoImg from '../../assets/images/logo.png'
import Logout from '../Log/Logout'

function Header() {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <div className="header">
      <img src={LogoImg} alt="Logo"></img>
      {uid ? (
        <div className="header__right">
          <p className="header__welcome">
            Bienvenue {userData.firstName} {userData.lastName}
          </p>
          <Logout />
        </div>
      ) : null}
    </div>
  )
}

export default Header
