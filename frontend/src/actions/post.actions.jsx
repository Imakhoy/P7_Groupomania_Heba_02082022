import axios from 'axios'

export const GET_POSTS = 'GET_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'
export const DELETE_POST = "DELETE_POST"


export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        withCredentials: true,
      })
      .then((res) => {
        const array = res.data.slice(0, num)
        dispatch({ type: GET_POSTS, payload: array })
        dispatch({ type: GET_ALL_POSTS, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
}


export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post/opinionPost/${postId}`,
      data: { userId: userId, like: 1 },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } })
      })
      .catch((err) => console.log(err))
  }
}

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post/opinionPost/${postId}`,
      data: { userId: userId, like: 0 },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } })
      })
      .catch((err) => console.log(err))
  }
}

export const deletePost = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
      withCredentials: true
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};