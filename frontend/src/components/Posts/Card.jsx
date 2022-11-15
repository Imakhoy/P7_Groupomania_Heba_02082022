import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { updatePost } from '../../actions/post.actions'

import { timestampParser, isEmpty } from '../Utils'
import LikeButton from './LikeButton'
import DeleteCard from './DeleteCard'

function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.userReducer)
  const users = useSelector((state) => state.usersReducer)

  const [isUpdated, setIsUpdated] = useState(false)
  const [contentUpdate, setContentUpdate] = useState(post.content)
  const [titleUpdate, setTitleUpdate] = useState(post.title)
  const [postModified, setPostModified] = useState(false)
  const [dateUpdated, setDateUpdated] = useState(post.updatedAt)
  const dispatch = useDispatch()

  const updateItem = () => {
    let postOldContent = post.content
    let postOldTitle = post.title
    const errorForm = document.querySelector('.errorInUpdate')
    if (contentUpdate === '' || titleUpdate === '') {
      errorForm.innerHTML =
        'Le titre et le texte du post ne doivent pas être vides'
    } else {
      if (contentUpdate) {
        post.content = contentUpdate
      }
      if (titleUpdate) {
        post.title = titleUpdate
      }
      if (
        (titleUpdate || contentUpdate) &&
        (titleUpdate !== postOldTitle || contentUpdate !== postOldContent)
      ) {
        dispatch(updatePost(post._id, post))
        postOldContent = contentUpdate
        postOldTitle = titleUpdate
        setDateUpdated(Date.now())
        setPostModified(true)
      }
      setIsUpdated(false)
    }
  }

  const openUpdate = () => {
    setPostModified(false)
    setIsUpdated(true)
  }

  const handleUserTyping = (type, value) => {
    const errorForm = document.querySelector('.errorInUpdate')
    errorForm.innerHTML = ''
    if (type === 'title') {
      setTitleUpdate(value)
    }
    if (type === 'content') {
      setContentUpdate(value)
    }
  }

  useEffect(() => {
    !isEmpty(users[0]) && setIsLoading(false)
  }, [users])

  return (
    <div className="card-post">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div>
          <div className="card-post__description">
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
            <div className="card-post__times">
              {dateUpdated === post.createdAt && !postModified && (
                <span>Créé le : {timestampParser(post.createdAt)}</span>
              )}
              {dateUpdated !== post.createdAt && !postModified && (
                <span>Modifié le : {timestampParser(dateUpdated)}</span>
              )}
              {postModified && (
                <span>Modifié le : {timestampParser(dateUpdated)}</span>
              )}
            </div>
            {isUpdated === false && (
              <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            )}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  aria-label="Titre du post"
                  defaultValue={post.title}
                  onChange={(e) => handleUserTyping('title', e.target.value)}
                />
                <textarea
                  aria-label="Contenu du post"
                  defaultValue={post.content}
                  onChange={(e) => handleUserTyping('content', e.target.value)}
                />
                <div className="error errorInUpdate"></div>
                <div className="button-container">
                  <button
                    className="btn"
                    aria-label="Mettre à jour"
                    onClick={updateItem}
                  >
                    Mettre à jour
                  </button>
                </div>
              </div>
            )}
            <img src={post.imageUrl} alt="Représentation post"></img>
          </div>
          <div className="card-post__rates">
            <LikeButton post={post} />
          </div>

          {(user._id === post.userId || user.admin) && (
            <div className="card-post__actions">
              <div onClick={() => openUpdate()}>
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
              <DeleteCard id={post._id} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Card
