import { React, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UidContext } from '../../components/AppContext'

function Posts() {
  const uid = useContext(UidContext)

  return (
    <div>{uid ? <div>POSTS</div> : <Navigate to={{ pathname: '/' }} />}</div>
  )
}

export default Posts
