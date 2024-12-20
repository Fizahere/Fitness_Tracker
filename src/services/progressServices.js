import axios from "axios";

const Progress_Url = {
    PROGRESS_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/progress'
};
const token = localStorage.getItem('token');

const getProgress = async (userId) => {
    try {
        const response = await axios.get(`${Progress_Url.PROGRESS_URL}/get-progress/${userId}`);
        return response;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};

const getProgressById = async (progressId) => {
    try {
        const response = await axios.get(`${Progress_Url.PROGRESS_URL}/get-progress-by-id/${progressId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};

const addProgress = async (payload) => {
    try {
        const response = await axios.post(
            `${Progress_Url.PROGRESS_URL}/create-progress`,
            payload,
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};

const editProgress = async (props) => {
    const [progressId, payload] = props;
    try {
        const response = await axios.put(`${Progress_Url.PROGRESS_URL}/update-progress/${progressId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};

const deleteProgress = async (progressId) => {
    try {
        const response = await axios.delete(`${Progress_Url.PROGRESS_URL}/delete-progress/${progressId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};

// const ProgressChart = async () => {
//     try {
//         const response = await axios.get(
//             `${Progress_Url.PROGRESS_URL}/get-progress`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         return response.data.results;
//     } catch (error) {
//         throw error.response?.data || { msg: "An unknown error occurred." };
//     }
// };

export const ProgressServices = {
    getProgress,
    getProgressById,
    addProgress,
    editProgress,
    deleteProgress,
    // ProgressChart,
};
