import { React, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UidContext } from '../../components/AppContext'

import Log from '../../components/Log'

function Home() {
  const uid = useContext(UidContext)

  return <div>{uid ? <Navigate to={{ pathname: '/posts' }} /> : <Log />}</div>
}

export default Home
