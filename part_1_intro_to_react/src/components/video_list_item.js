import React from 'react';

//video 26 - switch props into video because video passed from video_list has identical name
const VideoListItem = ({video, onVideoSelect}) => {
    //const video = props.video;
    const imageUrl = video.snippet.thumbnails.default.url;
    return (
        <li onClick={()=> onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl}/>
                </div>

                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
};
export default VideoListItem;