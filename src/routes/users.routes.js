import { Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "../controllers/users.controller.js";

const router = Router()

/* Ver todos los usuarios (administrador) */
router.get('/:idUser/read', readUsers)

/*Crear un usuario*/
router.post('/:idUser/create', createUser);

/*Actualiar datos del usuario*/
router.patch('/:idUser/update/:idOtro', updateUser);


/*Eliminar el perfil*/
router.delete('/:idUser/delete/:idOtro', deleteUser)


export default router


/**
 * @swagger
 * /:idUser/create:
 *   get:
 *     summary: Solo el administrador puede ver todos los usuarios *     
 *     parameters:
 *       description: Enviar en id de usuari que pide la solictud
 *       required: true
 *       
 *     responses:
 *       200:
 *          description: Envia un mensaje de bienvenida
 *       400:
 *          description: Indica que faltan datos
 *       511: 
 *          description: Requiere verificar los datos usuario y contraseña
 *       500:
 *          description: En caso de que ocurra un error ajeno a los anteriores  
 * */
