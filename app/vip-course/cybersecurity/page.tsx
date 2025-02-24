'use client';  // This marks the file as a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VideoNavbar from '../components/VideoNavbar';
import VideoPlayer from '../components/VideoPlayer';
import NotesSection from '../components/NotesSection';

type SubVideo = {
  id: number;
  title: string;
  duration: string;
  videoFile: string;
};

type Lecture = {
  id: number;
  title: string;
  subVideos: SubVideo[];
  notesFile: string;
};

const lecturesData: Lecture[] = [
  {
    id: 1,
    title: "Introduction to React",
    subVideos: [
      { id: 11, title: "What is React?", duration: "5:30", videoFile: "/test.mov" },
      { id: 12, title: "Setting up React", duration: "7:45", videoFile: "/roi.mp4" },
    ],
    notesFile: "/path/to/intro-to-react-notes.pdf"
  },
  {
    id: 2,
    title: "Advanced React Concepts",
    subVideos: [
      { id: 21, title: "Understanding State", duration: "8:20", videoFile: "/testarcane.mov" },
      { id: 22, title: "Props in React", duration: "6:30", videoFile: "/roi.mp4" },
    ],
    notesFile: "/path/to/advanced-react-notes.pdf"
  },
];

const Home = () => {
  const [selectedSubVideoId, setSelectedSubVideoId] = useState<number>(11);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const checkUserAccess = async () => {
      const res = await fetch('/api/user');
      const userData = await res.json();

      if (!userData) {
        router.push('/signin');
        return;
      }

      if (!userData.vip_subscription) {
        router.push('/courses/payment');
        return;
      }

      setLoading(false);
    };

    checkUserAccess();
  }, [router]);

  const handleSubVideoSelect = (subVideoId: number) => {
    setSelectedSubVideoId(subVideoId);
  };

  const selectedSubVideo = lecturesData
    .flatMap(lecture => lecture.subVideos)
    .find(video => video.id === selectedSubVideoId);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/4 border-r border-gray-700 flex flex-col">
          <VideoNavbar
            lectures={lecturesData}
            onSubVideoSelect={handleSubVideoSelect}
            selectedSubVideoId={selectedSubVideoId}
          />
          <NotesSection lectures={lecturesData} />
        </div>
        <div className="w-3/4 p-6 flex flex-col">
          <VideoPlayer subVideo={selectedSubVideo} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
