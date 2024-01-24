import { Router } from "express";

import { 
    createUser,
    getAllUsers,
    getUserInfoByID,
    handleSignIn,
 } from "../controllers/user.controller.js";

 const router = Router();

 router.route('/').get(getAllUsers);
 router.route('/').get(createUser);
 router.route('/:id').get(getUserInfoByID);
 router.route('/signin').post(handleSignIn);

 export default router;