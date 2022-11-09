import { React, useContext } from 'react'
import { UidContext } from '../AppContext'
import LogoImg from '../../assets/images/logo.png'
import Logout from '../Log/Logout'
import { useSelector } from 'react-redux'

function Header() {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)
  return (
    <div className="header">
      <img src={LogoImg} alt="Logo"></img>
      {uid ? (
        <>
          <p>
            Bienvenue {userData.firstName} {userData.lastName}
          </p>
          <Logout />
        </>
      ) : null}
    </div>
  )
}

export default Header
