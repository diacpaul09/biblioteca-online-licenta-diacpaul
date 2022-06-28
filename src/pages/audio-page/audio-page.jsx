import React from "react";
import ReactAudioPlayer from 'react-audio-player';
import { useLocation } from "react-router-dom";
import './audio-page.scss'

const AudioPage = () => {

    const location = useLocation();

    const source = 'https://firebasestorage.googleapis.com/v0/b/biblioteca-online-licenta.appspot.com/o/audioContent%2Ftest.mp3?alt=media&token=a41ac22a-1765-42e8-9cb4-1d2f88be723f';

    return (
        <div className="audio-page">
            <div className="title">{location.state.title}</div>
            <div className="audio-player">

                <ReactAudioPlayer
                    src={source}
                    autoPlay={false}
                    controls
                />
            </div>
        </div>
    )
}

export default AudioPage