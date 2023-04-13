import {configureStore} from '@reduxjs/toolkit';
import posts from './reducers/posts';
import auth from './reducers/auth';


export const store = configureStore({
    reducer:{
       posts : posts,
       auth : auth
    }
})