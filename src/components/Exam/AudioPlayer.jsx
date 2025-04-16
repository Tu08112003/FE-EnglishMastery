import React from 'react'

const AudioPlayer = ({ audioSrc, autoPlay }) => {
  return (
    <div className="w-full flex justify-center">
      <audio  controls autoPlay={autoPlay}>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
export default AudioPlayer