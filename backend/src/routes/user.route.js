import { Router } from "express";

import { 
    createUser,
    getAllUsers,
    getUserInfoByID,
 } from "../controllers/user.controller.js";

 const router = Router();

 router.route('/').get(getAllUsers);
 router.route('/').get(createUser);
 router.route('/:id').get(getUserInfoByID);

 export default router;