import React from 'react';
import VideoListItem from './video_list_item';
//video 23 - from index.js VideoList videos= this.state.videos, it passes as a param
const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return <VideoListItem key={video.etag} video={video}/>
    });

    return (
        // video 23-  use className= for css instead of class=
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
};

export default VideoList;