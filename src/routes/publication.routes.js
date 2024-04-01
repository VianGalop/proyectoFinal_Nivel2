import Router from "express";
import { createPublication, deletePublication, getPublicationByTitle, getPublications, updatePublication } from "../controllers/publication.controller.js";

const router = Router();

/*
Lista de Publicaciones
GET role/idUser/publications
*/
router.get('/:role/:idUser/publications', getPublications);


/*
Buscar por Titulo publicacion
GET role/idUser/title
*/
router.get('/:role/:idUser/title/:nameTitle', getPublicationByTitle);

/*
Crear una publicacion
POST role/idUser/create
*/
router.post('/:role/:idUser/create', createPublication);

/*
Actualizar publicacion
PATCH role/idUser/update/:idPub
*/
router.patch('/:role/:idUser/update/:idPub', updatePublication);

/* 
Borrar publicacion
DELETE role/idUser/delete/:idPub
*/
router.delete('/:role/:idUser/delete/:idPub',deletePublication);

export default router