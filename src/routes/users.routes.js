import { Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "../controllers/users.controller.js";
import uploadPicture from '../config/multer.js'

const router = Router()


/*
Crear un perfil Usuario
POST blog/role/create
*/
router.post('/:role/create', uploadPicture.single('profile') ,createUser);


/*
Ver todos los usuarios (administrador)
GET  blog/role/read
*/
router.get('/:role/read', readUsers);


/*
Actualiar datos del usuario
PATCH blog/role/update
*/
router.patch('/:role/update/:id',uploadPicture.single('profile'), updateUser);


/*
Elminar el perfil
DELETE blog/role/delete
*/
router.delete('/:role/delete/:id', deleteUser)


export default router