//here we are just combining the reducer using this:
import {combineReducers} from 'redux'; //it combines all the reducers in one so that we can pass all into the store
import posts from './posts';//actual reducer defined in this file 
import auth from './auth'
export default combineReducers({
    posts,
    auth
})



