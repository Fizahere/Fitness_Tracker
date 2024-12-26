import React, { useState } from 'react';
import ICONS from '../assets/constants/icons'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FeedbackServices } from '../services/feedbackServices'; 
import { useQuery, useMutation, useQueryClient } from 'react-query';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  const { data: feedbacks = [], isError, isLoading: feedbackLoading } = useQuery(
    'feedbacks',
    FeedbackServices.getFeedbacks,
    {
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to fetch feedbacks.');
      },
    }
  );
  // const feedbacks = feedbacksData.slice(0, 4)

  const { mutateAsync: feedbackRequest, isLoading: feedbackLoadingSend } = useMutation(
    FeedbackServices.sendFeedback,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('feedbacks');
        toast.success('Thankyou for the Feedback.');
        setEmail('');
        setFeedback('');
        setRating(0);
      },
      onError: (error) => {
        toast.error(`Submission failed: ${error.response?.data?.message || 'Unknown error'}`);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !feedback || rating === 0) {
      toast.error('Please fill out all fields and rate your experience.');
      return;
    }

    const payload = {
      email,
      feedback,
      rating,
    };

    await feedbackRequest(payload);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        We Value Your Feedback
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#262135]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Rate Your Experience
            </label>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                >
                  {rating >= value ? (
                    <ICONS.FILLEDSTAR className="text-orange-400 text-2xl" />
                  ) : (
                    <ICONS.STAR className="text-[#262135] text-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="feedback" className="block text-lg font-medium text-gray-700">
              Your Comment
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#262135]"
              rows="4"
              placeholder="Leave a comment..."
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#262135] text-white px-6 py-2 rounded-full hover:bg-[#262135da] focus:outline-none focus:ring-2 focus:ring-[#262135da]"
            >
              {feedbackLoadingSend ? <ICONS.LOADING className='animate-spin text-white' /> : 'Submit Feedback'}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 rounded-lg shadow-md overflow-y-auto h-[28rem]">
        <h3 className="text-xl text-gray-800 mb-4 sticky top-0 bg-gradient-to-l to-lime-300 from-gray-50 font-bold z-20 p-6">Recent Feedback</h3>
          <ul className="space-y-4 p-6">
            {feedbackLoading ? (
              <ICONS.LOADING className='text-black animate-spin' />
            ) : (isError ? (
              <p className="text-red-500">Failed to load feedbacks.</p>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <li key={fb._id} className="p-4 bg-white rounded-lg shadow">
                  <p className="font-medium text-gray-800">{fb.email}</p>
                  <p className="text-gray-600">{fb.feedback}</p>
                  <div className="flex items-center mt-2">
                    {Array(fb.rating || 0)
                      .fill()
                      .map((_, i) => (
                        <ICONS.FILLEDSTAR key={i} className="text-orange-400 text-lg" />
                      ))}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No feedback available yet.</p>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
