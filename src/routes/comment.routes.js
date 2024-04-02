import { Router } from "express";
import { createComment, deleteComment, getCommentsByPublication, updateComment } from "../controllers/comments.controller.js";

const router = Router();

/* Lista de Comentarios de una publicacion X */
router.get('/:idUser/:idPub/comments', getCommentsByPublication);

/*
Crear un comentario
POST role/idUser/create
*/
router.post('/:idUser/:idPub/create',createComment);

/*
Actualizar comentario
PATCH role/idUser/update/:idCom
*/
router.patch('/:idUser/update/:idCom', updateComment);

/* 
Borrar comentario
DELETE role/idUser/delete/:idCom
*/
router.delete('/:idUser/delete/:idCom', deleteComment);

export default router