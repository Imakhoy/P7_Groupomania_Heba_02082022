import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UidContext } from '../AppContext'
import { likePost, unlikePost } from '../../actions/post.actions'

function LikeButton({ post }) {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }

  useEffect(() => {
    if (post.usersLiked.includes(uid)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [uid, post.usersLiked])

  return (
    <div className="rate-button">
      
      {liked ? (
        <i className="fa-solid fa-thumbs-up" onClick={unlike}></i>
      ) : (
        <i className="fa-regular fa-thumbs-up" onClick={like}></i>
      )}
    </div>
  )
}

export default LikeButton