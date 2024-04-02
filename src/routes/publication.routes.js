import Router from "express";
import { createPublication, deletePublication, getPublicationByTitle, getPublications, getPublicationByCategory, updatePublication } from "../controllers/publication.controller.js";

const router = Router();


/* Lista de Publicaciones */
router.get('/:idUser/publications', getPublications);


/* Filtar Publicaciones por categoria */
router.get('/:idUser/category/:idC', getPublicationByCategory)


/* Buscar por Titulo publicacion */
router.get('/:idUser/title/:nameTitle', getPublicationByTitle);


/* Crear una publicacion */
router.post('/:idUser/create', createPublication);


/* Actualizar publicacion */
router.patch('/:idUser/update/:idPub', updatePublication);

/* 
Borrar publicacion
DELETE role/idUser/delete/:idPub
*/
router.delete('/:idUser/delete/:idPub', deletePublication);

export default router