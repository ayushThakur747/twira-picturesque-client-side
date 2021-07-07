import * as api from '../api';// it means import everything from api folder as api, we did in this way because in api we have many funtions 
import {CREATE,UPDATE,DELETE,FETCH_ALL,LIKEPOST,getNULL} from '../constants/actionType';
//action creaters
//here this action is a bit diffrent than a normal action,
//because here we have to some async work,in order to do async work in action we have somthing called redux-thunk,
//what reducx thunk does is it allow us to create a function inside a function ,so that we can use async
 export const getPosts = ()=>async(dispatch)=>{
    
    try {
        dispatch({type:getNULL,payload:null});
        const {data} = await api.fetchPosts();
        dispatch({type:FETCH_ALL,payload:data});//action
    } catch (error) {
        console.log(error);
    }
}
export const getTrendingPosts = ()=>async(dispatch)=>{
    try {
        dispatch({type:getNULL,payload:null})
        const {data} = await api.fetchTrendingPosts();
        dispatch({type:FETCH_ALL,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post)=> async (dispatch)=>{
    try {
        const {data} = await api.createPost(post);
        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error);
        
    }
}
export const updatePost = (id,post)=> async(dispatch)=>{
    try {
         const {data} = await api.updatePost(id,post);
         dispatch({type:UPDATE,payload:data});
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = (id)=> async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id)=> async(dispatch)=>{
    try {
        
       const {data} = await api.likePost(id);
       console.log(data);
       dispatch({type:LIKEPOST,payload:data}); 
    } catch (error) {
        console.log(error);
    }
}




