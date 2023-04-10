import express  from "express";
import {getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch} from '../controllers/posts.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);

export default router;