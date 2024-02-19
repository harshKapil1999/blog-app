import { Router } from "express";

import { 
    getAllComments,
    createNewComment,
    deleteComment
 } from "../controllers/comment.controller.js";


const router = Router();

router.route('/:id').get(getAllComments);
router.route('/').post(createNewComment);
router.route('/:id').delete(deleteComment);

export default router;