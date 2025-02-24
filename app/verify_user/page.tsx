import React from 'react';
import Link from 'next/link';

const GifBanner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-2xl p-4 text-center">
        <img
          src="/verify.gif"
          alt="Banner GIF"
          className="w-3/4 h-auto mx-auto rounded-2xl shadow-lg"
        />
        <Link href="/">
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GifBanner;