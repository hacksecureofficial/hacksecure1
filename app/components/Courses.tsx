'use client';

import React, { useState } from 'react';

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

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('Defense');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Courses</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {coursesData.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category.category)}
            className={`px-4 py-2 rounded-md font-semibold ${
              activeCategory === category.category
                ? 'bg-blue-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
        {coursesData
          .find((cat) => cat.category === activeCategory)
          ?.courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{course.name}</h2>
              <p className="text-gray-400 text-sm mb-2">{course.description}</p>
              <p className="text-gray-500 italic">By {course.author}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
