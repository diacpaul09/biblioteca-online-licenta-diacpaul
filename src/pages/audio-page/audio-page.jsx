import React from "react";
import ReactAudioPlayer from 'react-audio-player';

const AudioPage = () => {

    return (
        <div>
            <ReactAudioPlayer
                src={'https://firebasestorage.googleapis.com/v0/b/biblioteca-online-licenta.appspot.com/o/audioContent%2Ftest.mp3?alt=media&token=a41ac22a-1765-42e8-9cb4-1d2f88be723f'}
                autoPlay
                controls
            />
        </div>
    )
}

export default AudioPage