import axios from "axios";

const Post_Url = {
  POST_URL: `${import.meta.env.VITE_API_URL}/post`
}
const token = localStorage.getItem('token');

const getAllPosts = async () => {
  try {
    const response = await axios.get(`${Post_Url.POST_URL}/get-all-posts`)
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
const getPosts = async (userId) => {
  try {
    const response = await axios.get(`${Post_Url.POST_URL}/get-posts/${userId}`);
    return response;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${Post_Url.POST_URL}/get-post/${postId}`)
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
const addPost = async (payload) => {
  payload.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const response = await axios.post(
      // 'http://localhost:2000/post/create-post',
      `${Post_Url.POST_URL}/create-post`,
      payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
};
const editPosts = async (props) => {
  const [postId, payload] = props;
  try {
    const response = await axios.put(`${Post_Url.POST_URL}/edit-post/${postId}`, payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${Post_Url.POST_URL}/delete-post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const LikePost = async (postId) => {
  try {
    const response = await axios.post(`${Post_Url.POST_URL}/like-post`,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const DisLikePost = async (postId) => {
  try {
    const response = await axios.post(`${Post_Url.POST_URL}/dislike-post`,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const AddComment = async (postId, payload) => {
  try {
    const response = await axios.post(`${Post_Url.POST_URL}/comment/${postId}`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const DeleteComment = async (commentId, postId) => {
  try {
    const response = await axios.delete(`${Post_Url.POST_URL}/delete-comment/${commentId}`,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const searchPost = async (searchQuery) => {
  try {
    const response = await axios.get(`${Post_Url.POST_URL}/search-post/${searchQuery}`)
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const searchUserPost = async (searchQuery) => {
  try {
    console.log(searchQuery)
    const response = await axios.get(`${Post_Url.POST_URL}/search-user-post/${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return response.data;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
// const PostChart = async () => {
//   const response = await axios.get(
//     `${Post_Url.POST_URL}/get-posts`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data.results;
// };
export const PostServices = {
  getAllPosts,
  getPosts,
  getPostById,
  addPost,
  editPosts,
  deletePost,
  LikePost,
  DisLikePost,
  AddComment,
  DeleteComment,
  searchPost,
  searchUserPost,
  // PostChart,
}