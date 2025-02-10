import express from 'express';
import { getPosts, getPostsById, createPost, updatePost, deletePost } from '../controller/post.controller.js';

const router = express.Router();

router.get('/', getPosts);               // GET semua post
router.get('/:id', getPostsById);        // GET post by ID
router.post('/', createPost);            // POST buat post baru
router.put('/:id', updatePost);          // PUT update post berdasarkan ID
router.delete('/:id', deletePost);       // DELETE post berdasarkan ID

export default router;
