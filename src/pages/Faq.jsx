// FAQPage.jsx (React example)
import React, { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {/* FAQ Item 1 */}
        <div className="bg-white shadow-md rounded-lg">
          <button
            className="w-full text-left p-4 flex justify-between items-center bg-gray-100 rounded-t-lg focus:outline-none"
            onClick={() => toggleAnswer(0)}
          >
            <span className="text-lg font-medium">What is a fitness tracker?</span>
            <svg
              className={`w-6 h-6 transform ${activeIndex === 0 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeIndex === 0 && (
            <div className="p-4 text-gray-700">
              A fitness tracker is a device that helps you monitor various physical activities, such as steps, calories burned, heart rate, and more.
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="bg-white shadow-md rounded-lg">
          <button
            className="w-full text-left p-4 flex justify-between items-center bg-gray-100 rounded-t-lg focus:outline-none"
            onClick={() => toggleAnswer(1)}
          >
            <span className="text-lg font-medium">How do I use the fitness tracker app?</span>
            <svg
              className={`w-6 h-6 transform ${activeIndex === 1 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeIndex === 1 && (
            <div className="p-4 text-gray-700">
              To use the fitness tracker app, simply download it from your app store, sign in or create an account, and start tracking your workouts, nutrition, and progress.
            </div>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="bg-white shadow-md rounded-lg">
          <button
            className="w-full text-left p-4 flex justify-between items-center bg-gray-100 rounded-t-lg focus:outline-none"
            onClick={() => toggleAnswer(2)}
          >
            <span className="text-lg font-medium">Is the app free to use?</span>
            <svg
              className={`w-6 h-6 transform ${activeIndex === 2 ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeIndex === 2 && (
            <div className="p-4 text-gray-700">
              Yes! The app is free to use with basic features. Premium features are available with a subscription.
            </div>
          )}
        </div>

        {/* Add more FAQ items as needed */}
      </div>
    </div>
  );
};

export default FAQPage;
