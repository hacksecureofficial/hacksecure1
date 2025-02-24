import React from 'react';

interface SubVideo {
  id: number;
  title: string;
  duration: string;
  videoFile: string;
}

interface Lecture {
  id: number;
  title: string;
  subVideos: SubVideo[];
}

interface VideoNavbarProps {
  lectures: Lecture[];
  onSubVideoSelect: (subVideoId: number) => void;
  selectedSubVideoId: number; // This should represent the currently selected video
}

const VideoNavbar: React.FC<VideoNavbarProps> = ({
  lectures,
  onSubVideoSelect,
  selectedSubVideoId,
}) => {
  return (
    <div className="sidebar bg-black text-white w-80 p-4 h-[400px] overflow-y-auto custom-scrollbar">
      {lectures.map((lecture) => (
        <div key={lecture.id} className="lecture mb-6">
          <h2 className="text-xl font-bold mb-2">{lecture.title}</h2>

          {/* Show buttons for each sub-video under the selected lecture */}
          {lecture.subVideos.map((subVideo) => (
            <button
              key={subVideo.id}
              onClick={() => onSubVideoSelect(subVideo.id)}
              className={`sub-video-btn w-full p-2 mb-2 bg-gray-700 hover:bg-blue-600 text-left rounded-md ${
                selectedSubVideoId === subVideo.id ? 'bg-blue-600' : ''
              }`}
            >
              {subVideo.title} ({subVideo.duration})
            </button>
          ))}
        </div>
      ))}
      
      <style jsx>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;  /* Width of the scrollbar */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d2d2d;  /* Track color */
          border-radius: 10px;  /* Round track corners */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a90e2;  /* Thumb color */
          border-radius: 10px;  /* Round thumb corners */
          border: 2px solid #2d2d2d;  /* Border color of the thumb */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #0066cc;  /* Change color when hovered */
        }
      `}</style>
    </div>
  );
};

export default VideoNavbar;
