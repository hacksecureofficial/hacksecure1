import { useState, useRef, useEffect } from 'react';

type VideoPlayerProps = {
  subVideo: { videoFile: string };
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ subVideo }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setControlsVisible] = useState(true); // Controls visibility state
  const [isMouseVisible, setMouseVisible] = useState(true); // Mouse visibility state
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null); // Timer to track mouse inactivity

  // Disable right-click to prevent downloading or inspecting
  useEffect(() => {
    const preventShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) e.preventDefault();
      if (e.ctrlKey && (e.key === 'i' || e.key === 'I' || e.key === 'u' || e.key === 'U')) e.preventDefault();
    };

    window.addEventListener('keydown', preventShortcuts);
    return () => window.removeEventListener('keydown', preventShortcuts);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = newProgress;
    }
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (videoContainerRef.current) {
        const videoContainer = videoContainerRef.current as HTMLElement;
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) {
          videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
          videoContainer.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    // Prevent right-click actions (no downloading, inspecting, etc.)
    e.preventDefault();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', () => {
        setProgress(video.currentTime);
      });
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', () => {});
      }
    };
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
      setControlsVisible(true);
      setMouseVisible(true);
      setMouseTimer(setTimeout(() => {
        setControlsVisible(false); // Hide controls
        setMouseVisible(false); // Hide cursor
      }, 3000)); // 3 seconds inactivity
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseMove); // Also listen for mouse down

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseMove);
    };
  }, [mouseTimer]);

  return (
    <div
      onContextMenu={handleRightClick}
      style={{
        ...styles.container,
        cursor: isMouseVisible ? 'auto' : 'none', // Hide cursor when inactive
      }}
      ref={videoContainerRef}
    >
      <video ref={videoRef} src={subVideo.videoFile} controls={false} style={styles.video} />

      {/* Play/Pause Icon in the center */}
      {!isPlaying && isControlsVisible && (
        <div
          style={styles.playPauseIcon}
          onClick={handlePlayPause}
        >
          ▶️
        </div>
      )}

      {/* Pause Icon */}
      {isPlaying && isControlsVisible && (
        <div
          style={styles.pauseIcon}
          onClick={handlePlayPause}
        >
          ❚❚
        </div>
      )}

      {/* Mute, Volume Slider, and Fullscreen buttons above the timeline */}
      {isControlsVisible && (
        <div style={styles.controls}>
          <button
            onClick={handleMuteToggle}
            style={styles.muteButton}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={styles.volumeSlider}
          />
        </div>
      )}

      {/* Timeline */}
      {isControlsVisible && (
        <div style={styles.timelineContainer}>
          <input
            type="range"
            min="0"
            max={videoRef.current?.duration || 100}
            value={progress}
            onChange={handleProgressChange}
            style={styles.timeline}
          />
        </div>
      )}

      {/* Fullscreen and Mute Buttons */}
      {isControlsVisible && (
        <div style={styles.fullscreenButtonContainer}>
          <button
            onClick={handleFullscreenToggle}
            style={styles.fullscreenButton}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  video: {
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'black',
    width: '100%',
  },
  playPauseIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    color: 'white',
    fontSize: '40px',
    cursor: 'pointer',
  },
  pauseIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    color: 'white',
    fontSize: '40px',
    cursor: 'pointer',
  },
  controls: {
    position: 'absolute',
    bottom: '30px',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  muteButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  volumeSlider: {
    width: '80px',
  },
  timelineContainer: {
    position: 'absolute',
    bottom: '10px',
    left: '20px',
    right: '20px',
  },
  timeline: {
    width: '100%',
    height: '6px',
    background: '#ddd',
    borderRadius: '5px',
  },
  fullscreenButtonContainer: {
    position: 'absolute',
    bottom: '30px',
    right: '20px',
    display: 'flex',
    gap: '16px',
  },
  fullscreenButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default VideoPlayer;
