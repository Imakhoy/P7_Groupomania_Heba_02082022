import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { updatePost } from "../../actions/post.actions";

import { timestampParser, isEmpty } from '../Utils'
import LikeButton from './LikeButton'
import DeleteCard from './DeleteCard'


function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.userReducer)
  const users = useSelector((state) => state.usersReducer)

  const [isUpdated, setIsUpdated] = useState(false);
  const [contentUpdate, setContentUpdate] = useState(post.content);
  const dispatch = useDispatch()

  const updateItem = () => {
    if (contentUpdate) {
      dispatch(updatePost(post._id, contentUpdate));
    }
    setIsUpdated(false);
  };
  
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
              
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setContentUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
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