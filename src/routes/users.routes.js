import { Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "../controllers/users.controller.js";
import { uploadImagen } from '../config/multer.js'

const router = Router()

/* Ver todos los usuarios (administrador) */
router.get('/:idUser/read', readUsers)


/* Crear un perfil Usuario*/
router.post('/:idUser/create', uploadImagen.single('profile') ,createUser);

/*Actualiar datos del usuario*/
router.patch('/:idUser/update/',uploadImagen.single('profile'), updateUser);


/*Eliminar el perfil*/
router.delete('/:idUser/delete/', deleteUser)


export default router