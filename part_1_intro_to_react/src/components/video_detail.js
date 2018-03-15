import React from 'react';

const VideoDetails = ({video}) => {
    //video 28 - video prop is slow due to async task and we have problems with that to deal with default video is gonna be undefined
    if (!video) {
        return <div>Loading..</div>
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetails;