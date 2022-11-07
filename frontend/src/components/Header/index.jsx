import { React, useContext } from 'react'
import { UidContext } from '../AppContext'
import LogoImg from '../../assets/images/logo.png'
import Logout from '../Log/Logout'

function Header() {
  const uid = useContext(UidContext)

  return (
    <div className="header">
      <img src={LogoImg} alt="Logo"></img>
      {uid ? <Logout /> : null}
    </div>
  )
}

export default Header
