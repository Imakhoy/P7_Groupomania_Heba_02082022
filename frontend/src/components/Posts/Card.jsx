import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { timestampParser, isEmpty } from '../Utils'

import LikeButton from './LikeButton'
import DeleteCard from './DeleteCard'

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.userReducer)
  const users = useSelector((state) => state.usersReducer)


  useEffect(() => {
    !isEmpty(users[0]) && setIsLoading(false)
  }, [users])

  return (
    <div className="card-post">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div>
          <div className="card-postdescription">
            <p>
              {!isEmpty(users[0]) &&
                users
                  .map((user) => {
                    if (user._id === post.userId)
                      return `Publié par ${user.firstName} ${user.lastName}`
                    else return null
                  })
                  .join('')}
            </p>
            <div className="card-posttimes">
              <p>Créé le : {timestampParser(post.createdAt)}</p>
              <p>Modifié le : {timestampParser(post.updatedAt)}</p>
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <img src={post.imageUrl} alt="Représentation post"></img>

          </div>
          <div className="card-post__rates">
            <LikeButton post={post} />
          </div>
          {((user._id === post.userId) || user.admin) && (
            <div className="card-post__actions">
              < DeleteCard id={post._id} />
            </div>
          )}
          
        </div>
      )}
    </div>
  )
}

export default Card