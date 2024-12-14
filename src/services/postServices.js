import axios from "axios";

const Post_Url = {
  POST_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/post'
}
const token = localStorage.getItem('token');

const getPosts = async () => {
  try {
    if (!token) {
      throw { msg: "No token found, please log in again." };
    }

    const response = await axios.get(`${Post_Url.POST_URL}/get-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, 'response');
    return response;
  } catch (error) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      localStorage.removeItem('token');
      throw { msg: "Session expired, please log in again." };
    }
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
  const [postId, payload]=props;
  try {
    const response = await axios.put(`${Post_Url.POST_URL}/edit-post/${postId}`, payload,
      {
        headers:{
          Authorization:`Bearer ${token}`
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
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const PostChart = async () => {
  const response = await axios.get(
    `${Post_Url.POST_URL}/get-posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.results;
};

export const PostServices = {
  getPosts,
  getPostById,
  addPost,
  editPosts,
  deletePost,
  PostChart,
}