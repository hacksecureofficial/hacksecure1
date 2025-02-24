'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js 13 with App Router 
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const coursesData = [
  {
    category: 'Defense',
    courses: [
      {
        name: 'Defensive Security Essentials',
        description: 'Learn to identify and mitigate potential threats in real-world scenarios.',
        author: 'John Doe',
        image: '/it-and-cyber.png',
      },
      {
        name: 'Incident Response Mastery',
        description: 'Master the skills to effectively respond to cybersecurity incidents.',
        author: 'Jane Smith',
        image: '/it-and-cyber.png',
      },
      {
        name: 'Cyber Threat Intelligence',
        description: 'Analyze threat intelligence data for better defense.',
        author: 'Alice Brown',
        image: '/it-and-cyber.png',
      },
    ],
  },
  {
    category: 'Offense',
    courses: [
      {
        name: 'Advanced Penetration Testing',
        description: 'Delve deep into offensive security techniques and tools.',
        author: 'Alice Johnson',
        image: '/images/penetration-testing.jpg',
      },
      {
        name: 'Red Team Operations',
        description: 'Learn how to simulate advanced attacks against secure systems.',
        author: 'Bob Brown',
        image: '/images/red-team.jpg',
      },
      {
        name: 'Social Engineering Tactics',
        description: 'Master the art of manipulating human behavior.',
        author: 'Chris White',
        image: '/images/social-engineering.jpg',
      },
    ],
  },
];

export default function CoursesListPage() {
  const [activeCategory, setActiveCategory] = useState('Defense');
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Ensure the code runs only on the client side
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user !== null && isMounted) {
      if (user.vip_subscription) {
        router.push('/vipcourses'); // Redirect to VIP courses
      } else {
        router.push('/courseslist'); // Stay on normal courses
      }
    }
  }, [user, isMounted, router]);

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Our Courses - Explore and Enroll</title>
        <meta
          name="description"
          content="Explore and enroll in our expert-led courses designed for aspiring professionals."
        />
      </Head>
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-20">
          <header className="bg-black text-white py-16">
            <div className="container mx-auto text-center">
              <h1 className="text-5xl font-bold mb-4">Our Courses</h1>
              <p className="text-xl">Explore and enroll in expert-led courses</p>
            </div>
          </header>
          <section className="container mx-auto py-16">
            {/* Category Selector */}
            <div className="flex justify-center space-x-4 mb-8">
              {coursesData.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-4 py-2 rounded-md font-semibold ${activeCategory === category.category ? 'bg-blue-600' : 'bg-black hover:bg-gray-600'}`}
                >
                  {category.category}
                </button>
              ))}
            </div>
            {/* Courses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {coursesData
                .find((cat) => cat.category === activeCategory)
                ?.courses.map((course, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-center">
                    <img
                      src={course.image || '/placeholder.svg'}
                      alt={course.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-2xl font-bold mb-2">{course.name}</h2>
                      <p className="mb-4">{course.description}</p>
                      <p className="text-gray-400 italic mb-4">By {course.author}</p>
                      <div className="flex justify-center space-x-4">
                        {/* Enroll Now Button */}
                        <button
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                          onClick={() => router.push('/courses/enroll')}
                        >
                          Enroll Now
                        </button>
                        {/* Blue Button to the right */}
                        <button
                          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                          onClick={() => router.push('/courses/details')}
                        >
                          More Info
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
