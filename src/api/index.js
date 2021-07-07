//for the rest api
import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'});//axios instance, no need to write axios again and again, also no need to specify url in req
//const API = axios.create({baseURL:'https://picturesque-project.herokuapp.com'});
API.interceptors.request.use((req)=>{
//it will happen before all the req.
//this will help us to send our token back to backend so we can verify that the user is logged in 

    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


export const fetchPosts = ()=> API.get('/posts');
export const fetchTrendingPosts = ()=> API.get('/posts/trending');
export const createPost = (newPost)=> API.post('/posts',newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id)=>API.delete(`/posts/${id}`);
export const likePost = (id)=>API.patch(`/posts/${id}/likePost`);

export const signIn = (formData)=> API.post('/user/signin',formData);
export const signUp = (formData)=> API.post('/user/signup',formData);
