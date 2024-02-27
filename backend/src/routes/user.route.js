import { Router } from "express";

import { 
    deleteUser,
    getAllUsers,
    getUserInfoByID,
    updateUserInfo,
 } from "../controllers/user.controller.js";

 
 const router = Router();

 router.route('/').get(getAllUsers);
 router.route('/:id').get(getUserInfoByID);
 router.route('/:id').patch(updateUserInfo);
 router.route('/:id').delete(deleteUser);

 export default router;