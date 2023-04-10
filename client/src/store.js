import {configureStore} from '@reduxjs/toolkit';
import posts from './reducers/posts';


export const store = configureStore({
    reducer:{
       posts : posts
    }
})