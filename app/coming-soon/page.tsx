'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CoursesListPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Our Courses - Coming Soon</title>
        <meta
          name="description"
          content="Our expert-led courses are coming soon. Stay tuned!"
        />
      </Head>
      <main className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* <Navbar /> */}
        
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          src="background.mp4" 
          autoPlay 
          loop 
          muted
        />
        
        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg z-0"></div>
        
        {/* Coming Soon Banner */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center bg-white bg-opacity-20 p-10 rounded-lg shadow-lg">
            <h1 className="text-5xl font-bold text-white mb-4">Coming Soon</h1>
            <p className="text-xl text-gray-300">Our courses will be available soon. Stay tuned!</p>
            <video 
              src="coming_soon.mp4" 
              autoPlay 
              loop 
              muted 
              className="w-64 mx-auto mt-6 rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* <Footer /> */}
      </main>
    </>
  );
}