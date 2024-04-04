import { Router } from "express";
import { createComment, deleteComment, getCommentsByPublication, updateComment } from "../controllers/comments.controller.js";


const router = Router();


/* Lista de Comentarios de una X publicacion */
router.get('/:idUser/:idPub/comments', getCommentsByPublication);


/* Crear un comentario */
router.post('/:idUser/:idPub/create',createComment);


/* Actualizar comentario */
router.patch('/:idUser/update/:idCom', updateComment);


/* Borrar comentario */
router.delete('/:idUser/delete/:idCom', deleteComment);

export default router