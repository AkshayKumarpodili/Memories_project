
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from "../constants/actionTypes";
//defining all reducers  in a switch case

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            //returning as in actions/posts.js
            return {...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages};
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload};    
        
            // case CREATE:
        //     return [...state, action.payload];
        // case UPDATE:   
        //     //here we are comparing the updatdposts id(action.payload._id) with post._id and returning accordingly.
        //     return state.map((post) => post._id === action.payload._id ? action.payload : post);
        // case LIKE:   
        //     //here we are comparing the updatdposts id(action.payload._id) with post._id and returning accordingly.
        //     return state.map((post) => post._id === action.payload._id ? action.payload : post);
        // case DELETE:
        //     return state.filter((post) => post._id !== action.payload); 

        // default:
        //     return state;



        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;    
    }
}  