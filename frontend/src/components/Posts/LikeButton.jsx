import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UidContext } from '../AppContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likePost, unlikePost } from '../../actions/post.actions'

function LikeButton({ post }) {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const nbLikes = post.usersLiked.length
  const dispatch = useDispatch()

  const users = useSelector((state) => state.usersReducer)

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
      {nbLikes > 0 ? (
        <Popup
          trigger={<div className="rate-button__nb">{nbLikes}</div>}
          position={['bottom center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
        >
          <ul>
            {users.map((u) => {
              if (post.usersLiked.includes(u._id)) {
                let key_unique = `${post._id}${u._id}`
                return (
                  <li key={key_unique}>
                    {u.firstName} {u.lastName}
                  </li>
                )
              }
              return null
            })}
          </ul>
        </Popup>
      ) : null}
      {liked ? (
        <i className="fa-solid fa-thumbs-up" onClick={unlike}></i>
      ) : (
        <i className="fa-regular fa-thumbs-up" onClick={like}></i>
      )}
    </div>
  )
}

export default LikeButton