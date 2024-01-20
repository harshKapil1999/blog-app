import { Router } from "express";

import { 
    CreateBlog,
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlogDetails,
    updateBlog

 } from "../controllers/blog.controller.js";

 const router = Router();

 router.route('/').get(getAllBlogs);
 router.route('/:id').get(getBlogDetails);
 router.route('/').post(createBlog);
 router.route('/:id').patch(updateBlog);
 router.route('/:id').delete(deleteBlog);
 router.route('/create').post(CreateBlog);

 export default router;