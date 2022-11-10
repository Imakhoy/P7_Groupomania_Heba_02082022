import { useDispatch } from "react-redux"
import { Navigate } from 'react-router-dom'

const Thread = () => {
  const dispatch = useDispatch()


  return (
    <div>{dispatch ? <div>POSTS</div> : <Navigate to={{ pathname: '/' }} />}</div>
  )
}

export default Thread