import { Router } from 'express'
import { checkUser } from '../controllers/sesion.controller.js';

const router = Router()

router.get('/session', checkUser);

export default router

