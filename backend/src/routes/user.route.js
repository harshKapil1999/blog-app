import { Router } from "express";

import { 
    getAllUsers,
    getUserInfoByID,
    updateUserInfo,
 } from "../controllers/user.controller.js";

 
 const router = Router();

 router.route('/').get(getAllUsers);
 router.route('/:id').get(getUserInfoByID);
 router.route('/:id').patch(updateUserInfo);

 export default router;