import axios from "axios";

const User_Url = {
  USER_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/auth'
}
const token = localStorage.getItem('token');

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${User_Url.USER_URL}/get-all-users`)
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
const getUser = async () => {
  try {
    if (!token) {
      throw { msg: "No token found, please log in again." };
    }

    const response = await axios.get(`${User_Url.USER_URL}/get-user`, {
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
const getUserById = async (userId) => {
  try {
    if (!token) {
      throw { msg: "No token found, please log in again." };
    }
    const response = await axios.get(`${User_Url.USER_URL}/get-user-by-id/${userId}`);
    return response;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
const editUser = async (props) => {
  const [userId, payload] = props;
  console.log(userId)
  try {
    const response = await axios.put(`${User_Url.USER_URL}/edit-user/${userId}`, payload,
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
const deleteUser = async (userId) => {
  try {
    if (!token) {
      return
    }
    const response = await axios.delete(`${User_Url.USER_URL}/delete-user/${userId}`,
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
const getNotifications = async () => {
  try {
    const response = await axios.get(`${User_Url.USER_URL}/get-notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
//it will be followers chart
// const PostChart = async () => {
//   const response = await axios.get(
//     `${User_Url.USER_URL}/get-posts`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data.results;
// };

export const UserServices = {
  getAllUsers,
  getUser,
  getUserById,
  editUser,
  deleteUser,
  getNotifications,
  //   PostChart,
}