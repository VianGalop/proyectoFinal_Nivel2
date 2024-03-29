import { Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "../controllers/users.controller.js";
import { uploadImagen } from '../config/multer.js'

const router = Router()

/* router.get('/all', getUsers)
router.post('/create', uploadImagen.single('picture'), createUser)
router.get('/:id', getUserById)
router.patch('/update/:id', uploadImagen.single('picture'), getUpdate)
router.delete('/delete/:id', deleteUser)
 */

/*
Ver todos los usuarios (administrador)
GET  blog/role/read
*/
router.get('/:role/read', readUsers)

/*
Crear un perfil Usuario
POST blog/role/create
*/
router.post('/:role/create', uploadImagen.single('profile') ,createUser);

/*
Actualiar datos del usuario
PATCH blog/role/update
*/
router.patch('/:role/update/:id',uploadImagen.single('profile'), updateUser);


/*
Elminar el perfil
DELETE blog/role/delete
*/
router.delete('/:role/delete/:id', deleteUser)


export default router