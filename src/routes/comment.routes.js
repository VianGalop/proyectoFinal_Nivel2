import { Router } from "express";
import { createComment, deleteComment, getCommentsByPublication, updateComment } from "../controllers/comments.controller";

const router = Router();
/*
Lista de Comentarios
GET role/idUser/comments
*/
router.get('/role/:idUser/:idPub/comments', getCommentsByPublication);

/*
Crear un comentario
POST role/idUser/create
*/
router.post('/role/:idUser/:idPub/comments_create',createComment);

/*
Actualizar comentario
PATCH role/idUser/update/:idCom
*/
router.patch('/role/:idUser/:idPub/comments_update/:idCom', updateComment);

/* 
Borrar comentario
DELETE role/idUser/delete/:idCom
*/
router.delete('/role/:idUser/:idPub/comments_delete/:idCom',deleteComment);
