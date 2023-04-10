import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = (page) => axios.get(`${url}?page=${page}`);
export const createPost = (newPost) => axios.post(url,newPost);
export const updatePost = (id, updatedPost) => axios.put(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
