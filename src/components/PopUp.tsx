import React from 'react';

interface PopupProps {
  message: string;
  image: string;
  action: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, image, action }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <button
          onClick={() => action()}
          className="absolute top-0 right-0 m-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <img src={image} alt="Popup" className="w-32 h-32 mb-4 rounded-full" />
          <p className="text-lg font-semibold mb-4">{message}</p>
          <button
            onClick={() => action()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
