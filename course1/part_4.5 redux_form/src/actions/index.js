import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST= 'CREATE_POST';
export const DELETE_POST= 'DELETE_POST';
const rootUrl ='http://reduxblog.herokuapp.com/api';
const API_KEY ='?key=fancy_tc';

export function fetchPosts(){
    const request = axios.get(`${rootUrl}/posts${API_KEY}`);
    return{
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(values){
    const request = axios.post(`${rootUrl}/posts${API_KEY}`,values)
    return{
        type:CREATE_POST,
        payload:request
    }
}

export function fetchPost(id){
    const request = axios.get(`${rootUrl}/posts/${id}${API_KEY}`);
    return {
        type:FETCH_POST,
        payload:request
    }
}

export function deletePost(id){
    const request = axios.delete(`${rootUrl}/posts/${id}${API_KEY}`);
    return{
        type:DELETE_POST,
        payload:request
    }
}