// FeedbackForm.jsx (React example)
import React, { useState } from 'react';
import ICONS from '../assets/constants/icons'

const FeedbackForm = () => {
  const [rating, setRating] = useState(0); // State for rating
  const [comment, setComment] = useState(''); // State for comment

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Rating: ${rating}\nComment: ${comment}`);
    // Submit logic here
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        We Value Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Rating */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Rate Your Experience</label>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`w-8 h-8 rounded-full ${rating >= value ? 'bg-yellow-400' : 'bg-gray-300'}`}
                onClick={() => handleRatingChange(value)}
              >
                <ICONS.STAR/>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-lg font-medium text-gray-700">
            Your Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="4"
            placeholder="Leave a comment..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
