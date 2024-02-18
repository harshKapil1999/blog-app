import { Router } from "express";

import { 
    getAllComments,
    createNewComment,
    deleteComment
 } from "../controllers/comment.controller.js";


const router = Router();

router.route('/:id/comment/:bid').get(getAllComments);
router.route('/:id/comment').post(createNewComment);
router.route('/:id/comment/:cid').delete(deleteComment);

export default router;