import { Router } from "express";

import { 
    getAllUsers,
    getUserInfoByID,
 } from "../controllers/user.controller.js";

 
 const router = Router();

 router.route('/').get(getAllUsers);
 router.route('/:id').get(getUserInfoByID);
 

 export default router;