import React, { useEffect, useRef } from "react";

const AudioPlayer = ({ audioSrc, autoPlay }) => {
  const audioRef = useRef(null); 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); 
      audioRef.current.currentTime = 0; 
      audioRef.current.src = audioSrc; 
      if (autoPlay) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [audioSrc, autoPlay]);

  return (
    <div className="w-full flex justify-center">
      <audio ref={audioRef} controls autoPlay={autoPlay}>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;