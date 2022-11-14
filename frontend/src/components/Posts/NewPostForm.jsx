import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timestampParser } from '../Utils'
import { addPost, getPosts } from '../../actions/post.actions'

function NewPostForm() {
  const [titlePost, setTitlePost] = useState('')
  const [contentPost, setContentPost] = useState('')
  const [imagePost, setImagePost] = useState(null)
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const errorForm = document.querySelector('.errorInCreate')

  const handlePicture = (e) => {
    setImagePost(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const handlePost = async () => {
        if (!titlePost || !contentPost || !file) {
      errorForm.innerHTML =
        'Le titre et le texte du post<br> ne doivent pas être vides'
    } else {
        const data = new FormData()
        data.append('userId', userData._id)
        data.append('title', titlePost)
        data.append('content', contentPost)
        data.append('post_image', file)
        await dispatch(addPost(data))
        dispatch(getPosts())
        cancelPost()
    }
  }

  const handleUserTyping = (type, value) => {
    errorForm.innerHTML = ''
    if (type === 'title') {
      setTitlePost(value)
    }
    if (type === 'content') {
      setContentPost(value)
    }
  }

  const cancelPost = () => {
    setTitlePost('')
    setContentPost('')
    setImagePost('')
    setFile('')
    errorForm.innerHTML = ''
  }

  return (
    <div className="post-container">
      <>
        <div className="data">
          <span>
            {userData.firstName} {userData.lastName}
          </span>
        </div>
        <div className="post-form">
          <textarea
            name="title"
            id="title"
            placeholder="Titre du post"
            aria-label="Titre du post"
            aria-placeholder="Titre du post"
            onChange={(e) => handleUserTyping('title', e.target.value)}
            value={titlePost}
          />
          <textarea
            className="text-area"
            name="content"
            id="content"
            placeholder="Contenu du post"
            aria-label="Contenu du post"
            aria-multiline="true"
            onChange={(e) => handleUserTyping('content', e.target.value)}
            value={contentPost}
          />
          {titlePost || contentPost || imagePost ? (
            <li className="card-container">
              <div className="card-right">
                <div className="card-header">
                  <div className="pseudo">
                    <h3>
                      {userData.firstName} {userData.lastName}
                    </h3>
                  </div>
                  <span>{timestampParser(Date.now())}</span>
                </div>
                <div className="content">
                  <p className="card-title">{titlePost}</p>
                  <p>{contentPost}</p>
                  <img src={imagePost} alt="" />
                </div>
              </div>
            </li>
          ) : null}
          <div className="footer-form">
            <div className="icon">
              <>
                <img src="./img/icons/picture.svg" alt="Ajouter un fichier" />
                <input
                  aria-label="Ajouter une image"
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => handlePicture(e)}
                />
              </>
            </div>
            <div className="error errorInCreate"></div>
            <div className="btn-send">
              {titlePost || contentPost || imagePost ? (
                <button
                  className="cancel"
                  aria-label="Annuler"
                  onClick={cancelPost}
                >
                  Annuler
                </button>
              ) : null}
              <button className="send" aria-label="Poster" onClick={handlePost}>
                Poster
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default NewPostForm
