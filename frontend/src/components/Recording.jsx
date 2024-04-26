import React, { useState } from 'react';
import axios from 'axios';
import { ReactMic } from 'react-mic';

export default function Recording(){
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingId, setRecordingId] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onData = (recordedBlob) => {
        // This callback function is called with the recorded audio data
        setAudioBlob(recordedBlob.blob);
    };

    const playRecording = async () => {
        if (!recordingId) return;
        try {
            const response = await axios.get(`/en/recordings/${recordingId}`, {
                responseType: 'blob',
            });
            console.log(response.data)
            const audioUrl = URL.createObjectURL(response.data);
            console.log(audioUrl)
            setAudioUrl(audioUrl[6]);
            /*{const audio = new Audio(audioUrl);
      audio.play();}*/
        } catch (error) {
            console.error('Error playing recording:', error);
        }
    };

    const onStop = async (recordedBlob) => {
        // This callback function is called when recording stops

        try {
            const formData = new FormData();
            formData.append('voice', recordedBlob.blob); // Use recordedBlob.blob instead of audioBlob

            // Send recorded data to the backend
            const response = await axios.post('/record', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Extract recordingId from the response
            const { data } = response;
            setRecordingId(data.recordingId);
            setAudioUrl(null);
        } catch (error) {
            console.error('Error recording and sending data:', error);
        }
    };
    return (
        <div>
            <ReactMic
                record={isRecording}
                onStop={onStop}
                onData={onData}
                mimeType='audio/wav'
            />
            <button onClick={startRecording} disabled={isRecording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            <button onClick={playRecording} disabled={!recordingId}>
                Play Recording
            </button>
            {audioUrl && (
                <div>
                    <p>Recorded voice:</p>
                    <audio controls>
                        <source src={audioUrl} type='audio/wav' />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};
