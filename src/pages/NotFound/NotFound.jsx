import React from 'react';
import { Link, useRouteError } from 'react-router-dom'; // Import the error hook

const NotFound = () => {
  const error = useRouteError(); // get error details from router

  // Safely extract info if available
  const status = error?.status || 404;
  const statusText = error?.statusText || "Not Found";
  const message = error?.data || error?.message || "The requested page could not be found.";

  return (
    <div className="text-center text-blue-900 p-10">
      {/* Error Code */}
      <h2 className="text-8xl font-bold">{status}</h2>

      {/* Main error text */}
      <p className="text-5xl font-medium">{statusText}</p>

      {/* More descriptive message */}
      <p className="font-medium text-lg mt-4 text-gray-700">
        {typeof message === "string" ? message : JSON.stringify(message)}
      </p>

      {/* Back to Home */}
      <div className="mt-8">
        <Link to="/">
          <button className="bg-blue-50 border-2 border-blue-200 text-blue-900 font-normal px-6 py-3 rounded-md hover:bg-blue-100 transition">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;