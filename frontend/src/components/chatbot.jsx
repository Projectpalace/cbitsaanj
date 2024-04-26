import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const { listening, stopListening, resetTranscript } = useSpeechRecognition();

  const startListeningHandler = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();
  };

  const resetTranscriptHandler = () => {
    resetTranscript();
    setTranscript('');
  };

  const handleListen = (result) => {
    setTranscript(result);
    const response= axios.post("/en/chatbot", {missage: result})
    .then((response)=>{console.log(response)})
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Browser does not support speech recognition.</div>;
  }

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={startListeningHandler} disabled={listening}>
        Start
      </button>
      <button onClick={stopListeningHandler} disabled={!listening}>
        Stop
      </button>
      <button onClick={resetTranscriptHandler}>Reset</button>
      <p>{transcript}</p>
      {listening && <p>Listening...</p>}
      <SpeechRecognition onResult={handleListen} />
    </div>
  );
};

export default SpeechToText;
