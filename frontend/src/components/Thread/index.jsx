import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../Utils'
import { getPosts } from '../../actions/post.actions'

import Card from '../Posts/Card'

function Thread() {
  const [loadPost, setLoadPost] = useState(true)
  const [count, setCount] = useState(5)
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postReducer)

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true)
    }
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count))
      setLoadPost(false)
      setCount(count + 5)
    }

    window.addEventListener('scroll', loadMore)
    return () => window.removeEventListener('scroll', loadMore)
  }, [loadPost, dispatch, count])

  return (
    <div>
      <ul className="thread">
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return (
              <li key={post._id}>
                <Card post={post} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Thread
