import { React, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UidContext } from '../../components/AppContext'
import Thread from '../../components/Thread'
import NewPostForm from '../../components/Posts/NewPostForm'


function Posts() {
  const uid = useContext(UidContext)

  return (
    <div>
      {uid ? (
        <div>
          <h1>Les posts</h1>
          < NewPostForm />
          <Thread />
        </div>
      ) : (
        <Navigate to={{ pathname: '/' }} />
      )}
    </div>
  )
}

export default Posts
