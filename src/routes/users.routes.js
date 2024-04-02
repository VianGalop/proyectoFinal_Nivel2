import { Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "../controllers/users.controller.js";
import { uploadImagen } from '../config/multer.js'

const router = Router()

/* Ver todos los usuarios (administrador) */
router.get('/:role/read', readUsers)


/* Crear un perfil Usuario*/
router.post('/:role/create', uploadImagen.single('profile') ,createUser);

/*Actualiar datos del usuario*/
router.patch('/:role/update/:id',uploadImagen.single('profile'), updateUser);


/*Eliminar el perfil*/
router.delete('/:role/delete/:id', deleteUser)


export default router