
import axios from "axios";

const Feedback_Url = {
    FEEDBACK_URL: `${import.meta.env.VITE_API_URL}/feedback`,
};

const sendFeedback = async (data) => {
    try {
        const response = await axios.post(`${Feedback_Url.FEEDBACK_URL}/create-feedback`, data);
        return response.data;
    } catch (error) {
        throw error || { msg: "An unknown error occurred." };
    }
};

const getFeedbacks = async () => {
    try {
        const response = await axios.get(`${Feedback_Url.FEEDBACK_URL}/get-feedbacks`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "An unknown error occurred." };
    }
};

export const FeedbackServices = {
    sendFeedback,
    getFeedbacks,
};