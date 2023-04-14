import express  from "express";
import {getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPost, commentPost } from '../controllers/posts.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/commentPost',auth,commentPost)

export default router;