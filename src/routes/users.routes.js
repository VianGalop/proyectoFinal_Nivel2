import { Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "../controllers/users.controller.js";

const router = Router()

/* Ver todos los usuarios (administrador) */
router.get('/:idUser/read', readUsers)


/* Crear un perfil Usuario*/
router.post('/:idUser/create', createUser);

/*Actualiar datos del usuario*/
router.patch('/:idUser/update/:idOtro', updateUser);


/*Eliminar el perfil*/
router.delete('/:idUser/delete/:idOtro', deleteUser)


export default router