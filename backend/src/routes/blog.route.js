import { Router } from "express";

import { 
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlogDetails,
    updateBlog,
    updateLikes,
    updateViews

 } from "../controllers/blog.controller.js";

 const router = Router();

 router.route('/').get(getAllBlogs);
 router.route('/:id').get(getBlogDetails);
 router.route('/').post(createBlog);
 router.route('/:id').patch(updateBlog);
 router.route('/:id').delete(deleteBlog);
 router.route('/views/:id').patch(updateViews);
 router.route('/likes/:id').patch(updateLikes);

 export default router;