
import {CREATE,UPDATE,DELETE,FETCH_ALL,LIKEPOST,getNULL} from '../constants/actionType';
//defining reducers(logic) 
//here first param is state i.e posts
export default (posts=[],action)=>{
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts,action.payload];
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post)=>post._id !== action.payload);
        case LIKEPOST:
            return posts.map((post)=> post._id === action.payload._id ? action.payload : post )
        case getNULL:
            return [];
        default:
            return posts;
    }
}