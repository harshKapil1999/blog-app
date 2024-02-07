import { Router } from "express";
import { googleAuth, signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/google').post(googleAuth);
router.route('/signout').post(signOut);

export default router;